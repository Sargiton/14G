module.exports = {
  apps: [
    {
      name: 'whatsapp-bot',
      script: 'index.js',
      interpreter: 'node',
      env: {
        NODE_OPTIONS: '--max-old-space-size=768',
        UV_THREADPOOL_SIZE: '4',
      },
      max_memory_restart: '900M',
      watch: false,
      autorestart: true,
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      time: true,
    },
    {
      name: 'telegram-admin',
      script: 'telegram-bot.cjs',
      interpreter: 'node',
      env: {
        NODE_OPTIONS: '--max-old-space-size=256',
      },
      max_memory_restart: '300M',
      watch: false,
      autorestart: true,
      out_file: './logs/tg-out.log',
      error_file: './logs/tg-error.log',
      time: true,
    },
  ],
}
