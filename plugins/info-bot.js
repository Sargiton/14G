import fs from 'fs';
const handler = (m) => m;

handler.all = async function(m) {
  const vn = './media/audios/bot.mp3'; // Ruta de audio
  const chat = global.db.data.chats[m.chat];

  if (/^бот$/i.test(m.text) && !chat.isBanned) {
    conn.sendPresenceUpdate('recording', m.chat);
    conn.reply(m.chat,`🤍 Привет! Я ИИ, чем я могу вам помочь сегодня?\n\n✰ Используйте */меню* для просмотра моих команд.`,m, rcanal);
  }
  return !0;
};

export default handler;
