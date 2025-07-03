const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const OWNER_IDS = [1424509648, 393422971]; // Массив разрешённых Telegram user ID
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