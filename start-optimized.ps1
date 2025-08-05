# PowerShell скрипт для запуска WhatsApp бота с оптимизацией памяти

Write-Host "🚀 Запуск WhatsApp бота с оптимизацией памяти..." -ForegroundColor Green

# Проверяем наличие Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js найден: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js не найден. Установите Node.js и попробуйте снова." -ForegroundColor Red
    exit 1
}

# Проверяем версию Node.js
$majorVersion = (node --version).Split('.')[0].Substring(1)
if ([int]$majorVersion -lt 16) {
    Write-Host "❌ Требуется Node.js версии 16 или выше. Текущая версия: $(node --version)" -ForegroundColor Red
    exit 1
}

# Устанавливаем переменные окружения для оптимизации
$env:NODE_OPTIONS = "--max-old-space-size=1024 --expose-gc"
$env:UV_THREADPOOL_SIZE = "4"

Write-Host "🔧 Оптимизации:" -ForegroundColor Yellow
Write-Host "   - Ограничение heap: 1GB" -ForegroundColor Cyan
Write-Host "   - Принудительная сборка мусора" -ForegroundColor Cyan
Write-Host "   - Мониторинг использования памяти" -ForegroundColor Cyan
Write-Host "   - Автоматическая очистка кэша" -ForegroundColor Cyan

# Проверяем зависимости
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Установка зависимостей..." -ForegroundColor Yellow
    npm install
}

# Очищаем временные файлы
Write-Host "🧹 Очистка временных файлов..." -ForegroundColor Yellow
if (Test-Path "tmp") {
    Get-ChildItem "tmp" -Filter "*.tmp" | Remove-Item -Force
}
if (Test-Path "*.log") {
    Get-ChildItem "*.log" | Where-Object { $_.Length -gt 10MB } | Remove-Item -Force
}

# Проверяем наличие PM2
try {
    $pm2Version = pm2 --version
    Write-Host "✅ PM2 найден: $pm2Version" -ForegroundColor Green
    
    Write-Host "🔄 Перезапуск через PM2..." -ForegroundColor Yellow
    pm2 restart whatsapp-bot --update-env
    
    Write-Host ""
    Write-Host "✅ Бот запущен с оптимизацией памяти!" -ForegroundColor Green
    Write-Host "📊 Для мониторинга используйте: pm2 monit" -ForegroundColor Cyan
    Write-Host "📋 Для логов: pm2 logs whatsapp-bot" -ForegroundColor Cyan
    
} catch {
    Write-Host "⚠️ PM2 не найден, запускаю напрямую..." -ForegroundColor Yellow
    Write-Host "🔄 Запуск напрямую..." -ForegroundColor Yellow
    node index.js
}

Write-Host ""
Write-Host "📖 Документация: MEMORY_OPTIMIZATION.md" -ForegroundColor Cyan
Write-Host "🔧 Команды Telegram: /memory, /clean_memory, /system_stats" -ForegroundColor Cyan 