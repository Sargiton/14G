/* 
- Setemoji By Angel-OFC 
- edita el tagall con tu emoji favorito 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
let handler = async (m, { conn, text, isRowner }) => {

  if (!text) {
    return m.reply('🤍 Вы должны указать действительный смайлик после команды. Пример:`. setemoji ☃️`');
  }

  const emoji = text.trim();

  if (!isEmoji(emoji)) {
    return m.reply('🤍 Предоставленный текст не является допустимым смайликом. Убедитесь, что это настоящий смайлик.');
  }

  try {
    global.db.data.chats[m.chat].customEmoji = emoji;

    m.reply(`🤍 Смайлики группы были успешно обновлены до: ${emoji}`);
  } catch (error) {
    console.error(error);
    m.reply('🤍 Произошла ошибка при попытке изменить смайлик.');
  }
};

const isEmoji = (text) => {
  const emojiRegex =
    /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})/gu;
  return emojiRegex.test(text) && text.length <= 2;
};

handler.help = ['setemoji *<emoji>*'];
handler.tags = ['group'];
handler.command = ['setemoji', 'setemo'];
handler.admin = true;
handler.group = true;

export default handler;