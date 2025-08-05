import { performance } from 'perf_hooks';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class MemoryOptimizer {
  constructor() {
    this.memoryThreshold = 500 * 1024 * 1024; // 500MB
    this.gcInterval = 5 * 60 * 1000; // 5 минут
    this.monitoringInterval = 30 * 1000; // 30 секунд
    this.lastGC = Date.now();
    this.memoryUsage = [];
    this.maxMemoryHistory = 100;
    
    this.startMonitoring();
  }

  // Получить использование памяти процесса
  getProcessMemoryUsage() {
    const usage = process.memoryUsage();
    return {
      rss: usage.rss, // Resident Set Size
      heapTotal: usage.heapTotal,
      heapUsed: usage.heapUsed,
      external: usage.external,
      arrayBuffers: usage.arrayBuffers
    };
  }

  // Получить общую память системы
  async getSystemMemoryInfo() {
    try {
      if (process.platform === 'linux') {
        const { stdout } = await execAsync('free -m');
        const lines = stdout.split('\n');
        const memLine = lines[1].split(/\s+/);
        return {
          total: parseInt(memLine[1]) * 1024 * 1024,
          used: parseInt(memLine[2]) * 1024 * 1024,
          free: parseInt(memLine[3]) * 1024 * 1024
        };
      }
      return null;
    } catch (error) {
      console.error('Ошибка получения информации о памяти системы:', error);
      return null;
    }
  }

  // Принудительная сборка мусора
  forceGarbageCollection() {
    if (global.gc) {
      global.gc();
      console.log('🧹 Принудительная сборка мусора выполнена');
      this.lastGC = Date.now();
    } else {
      console.log('⚠️ Сборка мусора недоступна. Запустите с флагом --expose-gc');
    }
  }

  // Очистка кэша
  clearCaches() {
    // Очистка NodeCache
    if (global.msgRetryCounterCache) {
      global.msgRetryCounterCache.flushAll();
      console.log('🗑️ Кэш сообщений очищен');
    }

    // Очистка других кэшей
    if (global.plugins) {
      Object.keys(global.plugins).forEach(key => {
        const plugin = global.plugins[key];
        if (plugin && plugin.cache) {
          plugin.cache.flushAll();
        }
      });
    }
  }

  // Очистка временных файлов
  async clearTempFiles() {
    try {
      const { stdout } = await execAsync('find /tmp -name "*.tmp" -mtime +1 -delete 2>/dev/null || true');
      console.log('🗂️ Временные файлы очищены');
    } catch (error) {
      console.log('⚠️ Ошибка очистки временных файлов:', error.message);
    }
  }

  // Мониторинг памяти
  async monitorMemory() {
    const processMemory = this.getProcessMemoryUsage();
    const systemMemory = await this.getSystemMemoryInfo();
    
    // Сохраняем историю
    this.memoryUsage.push({
      timestamp: Date.now(),
      process: processMemory,
      system: systemMemory
    });

    // Ограничиваем историю
    if (this.memoryUsage.length > this.maxMemoryHistory) {
      this.memoryUsage.shift();
    }

    // Проверяем пороги
    const rssMB = processMemory.rss / 1024 / 1024;
    const heapUsedMB = processMemory.heapUsed / 1024 / 1024;
    
    console.log(`📊 Память процесса: RSS=${rssMB.toFixed(1)}MB, Heap=${heapUsedMB.toFixed(1)}MB`);
    
    if (systemMemory) {
      const systemUsedMB = systemMemory.used / 1024 / 1024;
      const systemTotalMB = systemMemory.total / 1024 / 1024;
      console.log(`💻 Системная память: ${systemUsedMB.toFixed(0)}MB/${systemTotalMB.toFixed(0)}MB`);
    }

    // Автоматическая очистка при превышении порогов
    if (processMemory.rss > this.memoryThreshold) {
      console.log('⚠️ Превышен порог памяти! Выполняю очистку...');
      this.performCleanup();
    }

    // Периодическая сборка мусора
    if (Date.now() - this.lastGC > this.gcInterval) {
      this.forceGarbageCollection();
    }
  }

  // Выполнение полной очистки
  async performCleanup() {
    console.log('🧹 Начинаю полную очистку памяти...');
    
    // Очистка кэшей
    this.clearCaches();
    
    // Принудительная сборка мусора
    this.forceGarbageCollection();
    
    // Очистка временных файлов
    await this.clearTempFiles();
    
    console.log('✅ Очистка памяти завершена');
  }

  // Запуск мониторинга
  startMonitoring() {
    console.log('🔍 Запуск мониторинга памяти...');
    
    setInterval(() => {
      this.monitorMemory();
    }, this.monitoringInterval);
  }

  // Получить статистику памяти
  getMemoryStats() {
    const current = this.getProcessMemoryUsage();
    const history = this.memoryUsage;
    
    if (history.length === 0) {
      return { current, history: [] };
    }

    const avgRSS = history.reduce((sum, entry) => sum + entry.process.rss, 0) / history.length;
    const maxRSS = Math.max(...history.map(entry => entry.process.rss));
    const minRSS = Math.min(...history.map(entry => entry.process.rss));

    return {
      current,
      history: history.slice(-10), // Последние 10 записей
      stats: {
        avgRSS: avgRSS / 1024 / 1024,
        maxRSS: maxRSS / 1024 / 1024,
        minRSS: minRSS / 1024 / 1024,
        samples: history.length
      }
    };
  }
}

// Экспорт оптимизатора
export default MemoryOptimizer;

// Создание глобального экземпляра
if (!global.memoryOptimizer) {
  global.memoryOptimizer = new MemoryOptimizer();
}

export { MemoryOptimizer }; 