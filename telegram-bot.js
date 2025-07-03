// Telegram-бот для управления WhatsApp-ботом
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Вставь сюда свой Telegram user ID (узнать можно у @userinfobot)
const OWNER_ID = 1424509648; // ЗАМЕНИ на свой Telegram user ID!
const TELEGRAM_TOKEN = '7882415806:AAGKIWslOZtVsK-EIHyHdIrM0jNS73BAnkM';
const WHATSAPP_PM2_NAME = 'whatsapp-bot'; // Имя процесса pm2 для WhatsApp-бота

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

function onlyOwner(msg, cb) {
  if (msg.from.id !== OWNER_ID) {
    bot.sendMessage(msg.chat.id, 'Нет доступа.');
    return false;
  }
  return true;
}

bot.onText(/\/get_qr/, (msg) => {
  if (!onlyOwner(msg)) return;
  const qrPath = path.join(__dirname, 'qr.png');
  if (fs.existsSync(qrPath)) {
    bot.sendPhoto(msg.chat.id, fs.createReadStream(qrPath));
  } else {
    bot.sendMessage(msg.chat.id, 'Файл qr.png не найден. Сначала сгенерируйте QR-код.');
  }
});

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

bot.onText(/\/restart_whatsapp/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 restart ${WHATSAPP_PM2_NAME}`, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при перезапуске: ' + stderr);
    bot.sendMessage(msg.chat.id, 'WhatsApp-бот перезапущен.');
  });
});

bot.onText(/\/start_whatsapp/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 start ${WHATSAPP_PM2_NAME}`, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при запуске: ' + stderr);
    bot.sendMessage(msg.chat.id, 'WhatsApp-бот запущен.');
  });
});

bot.onText(/\/stop_whatsapp/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 stop ${WHATSAPP_PM2_NAME}`, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при остановке: ' + stderr);
    bot.sendMessage(msg.chat.id, 'WhatsApp-бот остановлен.');
  });
});

bot.onText(/\/status/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 show ${WHATSAPP_PM2_NAME}`, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при получении статуса: ' + stderr);
    bot.sendMessage(msg.chat.id, 'Статус WhatsApp-бота:\n' + stdout);
  });
});

bot.onText(/\/logs/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec(`pm2 logs ${WHATSAPP_PM2_NAME} --lines 30 --nostream`, { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при получении логов: ' + stderr);
    bot.sendMessage(msg.chat.id, 'Последние логи WhatsApp-бота:\n' + stdout.slice(-4000));
  });
});

bot.onText(/\/update_code/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec('git pull', (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка git pull: ' + stderr);
    bot.sendMessage(msg.chat.id, 'Результат git pull:\n' + stdout);
  });
});

bot.onText(/\/npm_install/, (msg) => {
  if (!onlyOwner(msg)) return;
  exec('npm install', (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка npm install: ' + stderr);
    bot.sendMessage(msg.chat.id, 'Результат npm install:\n' + stdout);
  });
});

bot.onText(/\/(start|help)/, (msg) => {
  if (!onlyOwner(msg)) return;
  bot.sendMessage(msg.chat.id, `Привет! Я бот для управления WhatsApp-ботом.\n\nДоступные команды:\n/get_qr — получить QR-код\n/reset_session — сбросить сессию (удалить LynxSession)\n/restart_whatsapp — перезапустить WhatsApp-бота\n/start_whatsapp — запустить WhatsApp-бота\n/stop_whatsapp — остановить WhatsApp-бота\n/status — статус WhatsApp-бота\n/logs — последние логи WhatsApp-бота\n/update_code — git pull\n/npm_install — npm install\n/help — список команд`);
}); 