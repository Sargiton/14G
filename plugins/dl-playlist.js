import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) {
    return conn.reply(m.chat, '[ ᰔᩚ ] Введите имя автора * Youtube*.', m, rcanal);
  }

  try {
    let result = await yts(text);
    let ytres = result.videos;

    if (!ytres || ytres.length === 0) {
      return conn.reply(m.chat, 'Результаты вашего поиска не найдены.', m, rcanal);
    }

    let txt = `Результаты поиска для: *${text}*\n\n`;

    ytres.forEach((v, i) => {
      txt += `*${i + 1}.*\n`;
      txt += `• Título: ${v.title}\n`;
      txt += `• Duración: ${v.timestamp}\n`;
      txt += `• Subido por: ${v.author.name}\n`;
      txt += `• Enlace: ${v.url}\n\n`;
    });

    await conn.reply(m.chat, txt.trim(), m);
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, 'Произошла ошибка при выполнении поиска. Попробуйте еще раз позже.', m);
  }
}

handler.help = ['playlist <nombre>']
handler.tags = ['dl']
handler.command = ['playlist', 'Playlist']
export default handler;
