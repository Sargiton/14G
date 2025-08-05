#!/bin/bash

# Скрипт для запуска WhatsApp бота с оптимизацией памяти

echo "🚀 Запуск WhatsApp бота с оптимизацией памяти..."

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установите Node.js и попробуйте снова."
    exit 1
fi

# Проверяем версию Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Требуется Node.js версии 16 или выше. Текущая версия: $(node -v)"
    exit 1
fi

# Устанавливаем переменные окружения для оптимизации
export NODE_OPTIONS="--max-old-space-size=1024 --expose-gc"
export UV_THREADPOOL_SIZE=4

# Проверяем свободную память
FREE_MEM=$(free -m | awk 'NR==2{printf "%.0f", $4}')
echo "💾 Свободная память: ${FREE_MEM}MB"

if [ "$FREE_MEM" -lt 512 ]; then
    echo "⚠️ Внимание: Мало свободной памяти (${FREE_MEM}MB). Рекомендуется минимум 512MB."
fi

# Очищаем временные файлы
echo "🧹 Очистка временных файлов..."
find /tmp -name "*.tmp" -mtime +1 -delete 2>/dev/null || true
find . -name "*.log" -size +10M -delete 2>/dev/null || true

# Проверяем зависимости
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install
fi

# Запускаем бота с мониторингом памяти
echo "✅ Запуск бота..."
echo "📊 Мониторинг памяти включен"
echo "🔧 Оптимизации:"
echo "   - Ограничение heap: 1GB"
echo "   - Принудительная сборка мусора"
echo "   - Мониторинг использования памяти"
echo "   - Автоматическая очистка кэша"
echo ""

# Запускаем с PM2 если доступен
if command -v pm2 &> /dev/null; then
    echo "🔄 Перезапуск через PM2..."
    pm2 restart whatsapp-bot --update-env
else
    echo "🔄 Запуск напрямую..."
    node index.js
fi

echo ""
echo "✅ Бот запущен с оптимизацией памяти!"
echo "📊 Для мониторинга используйте: pm2 monit"
echo "📋 Для логов: pm2 logs whatsapp-bot" 