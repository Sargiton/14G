# Скрипт для применения всех оптимизаций памяти

Write-Host "Применение оптимизаций памяти..." -ForegroundColor Green

# 1. Остановка текущих процессов
Write-Host "1. Остановка текущих процессов..." -ForegroundColor Yellow
try {
    pm2 stop all
    Write-Host "Процессы остановлены" -ForegroundColor Green
} catch {
    Write-Host "PM2 не найден или процессы уже остановлены" -ForegroundColor Yellow
}

# 2. Очистка кэшей и временных файлов
Write-Host "2. Очистка кэшей и временных файлов..." -ForegroundColor Yellow
if (Test-Path "tmp") {
    Remove-Item "tmp\*" -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path "*.log") {
    Get-ChildItem "*.log" | Remove-Item -Force -ErrorAction SilentlyContinue
}
if (Test-Path "LynxSession") {
    Get-ChildItem "LynxSession" -Filter "pre-key-*" | Remove-Item -Force -ErrorAction SilentlyContinue
}

# 3. Проверка и установка зависимостей
Write-Host "3. Проверка зависимостей..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Установка зависимостей..." -ForegroundColor Cyan
    npm install
} else {
    Write-Host "Зависимости уже установлены" -ForegroundColor Green
}

# 4. Создание папки для логов
Write-Host "4. Создание папки для логов..." -ForegroundColor Yellow
if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Name "logs" -Force
    Write-Host "Папка logs создана" -ForegroundColor Green
}

# 5. Запуск с новой конфигурацией
Write-Host "5. Запуск с оптимизированной конфигурацией..." -ForegroundColor Yellow
try {
    pm2 start ecosystem.config.js
    Write-Host "Боты запущены с оптимизацией" -ForegroundColor Green
} catch {
    Write-Host "Ошибка запуска через PM2, запускаю напрямую..." -ForegroundColor Yellow
    $env:NODE_OPTIONS = "--max-old-space-size=1024 --expose-gc"
    $env:UV_THREADPOOL_SIZE = "4"
    Start-Process -FilePath "node" -ArgumentList "index.js" -NoNewWindow
}

# 6. Проверка статуса
Write-Host "6. Проверка статуса..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
try {
    pm2 list
} catch {
    Write-Host "PM2 недоступен для проверки статуса" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Оптимизации применены!" -ForegroundColor Green
Write-Host ""
Write-Host "Команды для мониторинга:" -ForegroundColor Cyan
Write-Host "   pm2 monit          - Мониторинг в реальном времени" -ForegroundColor White
Write-Host "   pm2 logs           - Просмотр логов" -ForegroundColor White
Write-Host "   pm2 restart all    - Перезапуск всех ботов" -ForegroundColor White
Write-Host ""
Write-Host "Команды Telegram бота:" -ForegroundColor Cyan
Write-Host "   /memory            - Использование памяти" -ForegroundColor White
Write-Host "   /clean_memory      - Очистка памяти" -ForegroundColor White
Write-Host "   /system_stats      - Статистика системы" -ForegroundColor White
Write-Host "   /status            - Статус ботов" -ForegroundColor White
Write-Host ""
Write-Host "Подробная документация: MEMORY_OPTIMIZATION.md" -ForegroundColor Yellow 