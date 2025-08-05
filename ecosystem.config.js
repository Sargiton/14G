module.exports = {
  apps: [
    {
      name: 'whatsapp-bot',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max-old-space-size=1024 --expose-gc',
        UV_THREADPOOL_SIZE: 4
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      // Оптимизации для памяти
      node_args: '--max-old-space-size=1024 --expose-gc',
      // Автоматический перезапуск при превышении памяти
      max_restarts: 10,
      min_uptime: '10s',
      // Мониторинг памяти
      pmx: true,
      // Логирование
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Ограничения
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    },
    {
      name: 'telegram-bot',
      script: 'telegram-bot.cjs',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max-old-space-size=512'
      },
      error_file: './logs/telegram-err.log',
      out_file: './logs/telegram-out.log',
      log_file: './logs/telegram-combined.log',
      time: true,
      node_args: '--max-old-space-size=512',
      max_restarts: 5,
      min_uptime: '10s',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    }
  ]
}; 