import fetch from 'node-fetch';
import axios from 'axios';

const handler = async (m, { conn, text }) => {

  if (!text) throw `❌ Proporcióname el enlace de YouTube para que pueda ayudarte.`;

  await m.react('🕓');

  try {
    const response1 = await fetch(`https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(text)}`);
    const result1 = await response1.json();

    if (result1.status === 200 && result1.success && result1.result && result1.result.download_url) {
      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: result1.result.download_url }, 
          mimetype: 'audio/mpeg', 
          ptt: false 
        },
        { quoted: m }
      );
      await m.react('✅');
      return;
    }

    const response2 = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp3?url=${encodeURIComponent(text)}&type=audio&format=mp3&key=api`);
    const result2 = await response2.json();

    if (result2.success && result2.downloadLink) {
      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: result2.downloadLink }, 
          mimetype: 'audio/mpeg', 
          ptt: false 
        },
        { quoted: m }
      );
      await m.react('✅');
      return;
    }

    const response3 = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(text)}`);
    const data3 = response3.data;

    if (data3.status === true && data3.data.dl) {
      const downloadUrl = data3.data.dl;
      const title = data3.data.title || "Desconocido";

      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: downloadUrl }, 
          mimetype: 'audio/mpeg', 
          ptt: false 
        },
        { quoted: m }
      );
      await m.react('✅');
      return;
    }

    const response4 = await axios.get(`https://mahiru-shiina.vercel.app/download/ytmp3?url=${encodeURIComponent(text)}`);
    const data4 = response4.data;

    if (data4.status === true) {
      const downloadUrl = data4.data.download;
      const title = data4.data.title || "Desconocido";

      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: downloadUrl }, 
          mimetype: 'audio/mpeg', 
          ptt: false 
        },
        { quoted: m }
      );
      await m.react('✅');
      return;
    }

    throw new Error('No se pudo obtener el enlace de descarga de ninguna API');

  } catch (error) {
    await m.react('❌');
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];

export default handler;
