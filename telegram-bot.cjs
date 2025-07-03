bot.onText(/\/full_reset/, async (msg) => {
  if (!onlyOwner(msg)) return;
  const sessionPath = path.join(__dirname, 'LynxSession');
  if (fs.existsSync(sessionPath)) {
    fs.rmSync(sessionPath, { recursive: true, force: true });
    bot.sendMessage(msg.chat.id, 'Папка LynxSession удалена. Перезапускаю WhatsApp-бота...');
  } else {
    bot.sendMessage(msg.chat.id, 'Папка LynxSession не найдена. Перезапускаю WhatsApp-бота...');
  }
  exec('pm2 restart whatsapp-bot', (err, stdout, stderr) => {
    if (err) return bot.sendMessage(msg.chat.id, 'Ошибка при перезапуске WhatsApp-бота: ' + stderr);
    setTimeout(() => {
      const qrPath = path.join(__dirname, 'qr.png');
      if (fs.existsSync(qrPath)) {
        bot.sendPhoto(msg.chat.id, fs.createReadStream(qrPath));
      } else {
        bot.sendMessage(msg.chat.id, 'Файл qr.png не найден. Сначала сгенерируйте QR-код.');
      }
    }, 3000);
  });
}); 