import fetch from 'node-fetch';

const handler = async (m, { text, command, args, usedPrefix }) => {
  if (!text) {
    return m.reply(`*• Введите текст*\n\n*Пример:*\n*${usedPrefix + command}* Привет, бот`);
  }
  
  await m.react('📩');

  try {
    const apiBingia = await fetch(`https://delirius-apiofc.vercel.app/ia/bingia?query=${encodeURIComponent(text)}`);
    const resBingia = await apiBingia.json();

    if (resBingia.status) {
      return m.reply(resBingia.data); 
    } else {
      const apiChatGPT = await fetch(`https://delirius-apiofc.vercel.app/ia/chatgpt?q=${encodeURIComponent(text)}`);
      const resChatGPT = await apiChatGPT.json();

      if (resChatGPT.status) {
        return m.reply(resChatGPT.data); 
      } else {
        console.log("Сбой обоих API");
      }
    }
  } catch (error) {
    await m.react('❌');
  }
};

handler.help = ['simi'];
handler.tags = ['ai'];
handler.command = /^((sim)?simi|alexa|cortana|bot)$/i;

export default handler;
