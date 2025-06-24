import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  await m.react('🕓'); 

  try {
    const response = await fetch('https://dark-core-api.vercel.app/api/random/tiktok?key=user1');

    if (response.ok) {
      const videoBuffer = await response.buffer(); 

      await conn.sendMessage(m.chat, {
        video: videoBuffer, 
        caption: 'Video de TikTok aleatorio'
      }, { quoted: m });

      await m.react('✅'); 
    } else {
      throw new Error('No se pudo obtener el video');
    }
  } catch (error) {
    await m.react('❌');  // Reacción de error
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['tiktokrandom'];
handler.tags = ['dl', 'fun'];
handler.command = ['tiktokrandom', 'tiktokrand'];
export default handler;
