const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const OWNER_IDS = [1424509648, 393422971, 2134847831]; // Массив разрешённых Telegram user ID
const TELEGRAM_TOKEN = '7882415806:AAGKIWslOZtVsK-EIHyHdIrM0jNS73BAnkM';
const WHATSAPP_PM2_NAME = 'whatsapp-bot';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

function onlyOwner(msg) {
  if (!OWNER_IDS.includes(msg.from.id)) {
    bot.sendMessage(msg.chat.id, 'Нет доступа.');
    return false;
  }
  return true;
}

// Получить QR-код
bot.onText(/\/get_qr/, (msg) => {
  if (!onlyOwner(msg)) return;
  const qrPath = path.join(__dirname, 'qr.png');
  if (fs.existsSync(qrPath)) {
    bot.sendPhoto(msg.chat.id, fs.createReadStream(qrPath));
  } else {
    bot.sendMessage(msg.chat.id, 'Файл qr.png не найден.');
  }
});

// Сбросить сессию
bot.onText(/\/reset_session/, (msg) => {
  if (!onlyOwner(msg)) return;
  const sessionPath = path.join(__dirname, 'LynxSession');
  if (fs.existsSync(sessionPath)) {
    fs.rmSync(sessionPath, { recursive: true, force: true });
    bot.sendMessage(msg.chat.id, 'Папка LynxSession удалена. Перезапусти WhatsApp-бота для генерации нового QR-кода.');
  } else {
    bot.sendMessage(msg.chat.id, 'Папка LynxSession не найдена.');
  }
});

// Перезапустить WhatsApp-бота
bot.onText(/\/restart_whatsapp/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 restart ${WHATSAPP_PM2_NAME}`, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при перезапуске: ' + stderr);
    bot.sendMessage(msg.chat.id, 'WhatsApp-бот перезапущен.');
  });
});

// Запустить WhatsApp-бота
bot.onText(/\/start_whatsapp/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 start ${WHATSAPP_PM2_NAME}`, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при запуске: ' + stderr);
    bot.sendMessage(msg.chat.id, 'WhatsApp-бот запущен.');
  });
});

// Остановить WhatsApp-бота
bot.onText(/\/stop_whatsapp/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 stop ${WHATSAPP_PM2_NAME}`, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при остановке: ' + stderr);
    bot.sendMessage(msg.chat.id, 'WhatsApp-бот остановлен.');
  });
});

// Статус WhatsApp-бота
bot.onText(/\/status/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 show ${WHATSAPP_PM2_NAME}`, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при получении статуса: ' + stderr);
    bot.sendMessage(msg.chat.id, 'Статус WhatsApp-бота:\n' + stdout);
  });
});

// Логи WhatsApp-бота
bot.onText(/\/logs/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 logs ${WHATSAPP_PM2_NAME} --lines 30 --nostream`, { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при получении логов: ' + stderr);
    bot.sendMessage(msg.chat.id, 'Последние логи WhatsApp-бота:\n' + stdout.slice(-4000));
  });
});

// Обновить код (git pull)
bot.onText(/\/update_code/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec('git pull', (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка git pull: ' + stderr);
    bot.sendMessage(msg.chat.id, 'Результат git pull:\n' + stdout);
  });
});

// Установить зависимости (npm install)
bot.onText(/\/npm_install/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec('npm install', (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка npm install: ' + stderr);
    bot.sendMessage(msg.chat.id, 'Результат npm install:\n' + stdout);
  });
});

// Полный сброс: удалить сессию, перезапустить WhatsApp-бота, прислать QR
bot.onText(/\/full_reset/, async (msg) => {
  if (!onlyOwner(msg)) return;
  const sessionPath = path.join(__dirname, 'LynxSession');
  if (fs.existsSync(sessionPath)) {
    fs.rmSync(sessionPath, { recursive: true, force: true });
    bot.sendMessage(msg.chat.id, 'Папка LynxSession удалена. Перезапускаю WhatsApp-бота...');
  } else {
    bot.sendMessage(msg.chat.id, 'Папка LynxSession не найдена. Перезапускаю WhatsApp-бота...');
  }
  exec(`pm2 restart ${WHATSAPP_PM2_NAME}`, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при перезапуске WhatsApp-бота: ' + stderr);
    setTimeout(() => {
      const qrPath = path.join(__dirname, 'qr.png');
      if (fs.existsSync(qrPath)) {
        bot.sendPhoto(msg.chat.id, fs.createReadStream(qrPath));
      } else {
        bot.sendMessage(msg.chat.id, 'Файл qr.png не найден. Сначала сгенерируйте QR-код.');
      }
    }, 5000);
  });
});

// Справка
bot.onText(/\/(start|help)/, (msg) => {
  if (!onlyOwner(msg)) return;
  bot.sendMessage(msg.chat.id, `Привет! Я бот для управления WhatsApp-ботом.\n\nДоступные команды:\n/get_qr — получить QR-код\n/reset_session — сбросить сессию (удалить LynxSession)\n/restart_whatsapp — перезапустить WhatsApp-бота\n/start_whatsapp — запустить WhatsApp-бота\n/stop_whatsapp — остановить WhatsApp-бота\n/status — статус WhatsApp-бота\n/logs — последние логи WhatsApp-бота\n/update_code — git pull\n/npm_install — npm install\n/full_reset — полный сброс и получение QR-кода\n/help — список команд`);
}); 