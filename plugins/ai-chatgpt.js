import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return await conn.reply(
      m.chat, 
      `❌ *Команде требуется описание для генерации ответа.*\n\n*✧ Ejemplo:*\n${usedPrefix + command} привет, бот`, 
      m
    );
  }
  try {
    let response = await fetch(`https://delirius-apiofc.vercel.app/ia/chatgpt?q=${encodeURIComponent(text)}`);
    if (!response.ok) {
      throw new Error(`Ошибка в запросе: ${response.statusText}`);
    }
    
    let json = await response.json();
    if (json && json.status && json.data) {
      await conn.reply(m.chat, json.data, m);
    } else {
      await conn.reply(m.chat, "⚠️ Не удалось получить действительный ответ от API.", m);
    }
  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, "❌ Произошла ошибка при обработке вашего запроса.", m);
  }
};

handler.help = ['chatgpt *<texto>*'];
handler.tags = ['ai'];
handler.command = /^(chatgpt|Chatgpt|CHATGPT)$/i;

export default handler;
