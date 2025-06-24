 // *[ ❀ FACEBOOK DL ]*
import { igdl } from 'ruhend-scraper';
import axios from 'axios';

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat,`[ ᰔᩚ ] Ingresa una URL válida de *Facebook*.`,m,rcanal);
  }

  let res;
  let video;
  try {
    await m.react('🚀');
    res = await igdl(args[0]);
    let result = res.data;
    video = result.find((i) => i.resolution === '720p (HD)') || result.find((i) => i.resolution === '360p (SD)');
  } catch (e) {
    await m.react('❌');
    console.log(e);
  }

  if (!video) {
    try {
      const apiRes = await axios.get(`https://restapi.apibotwa.biz.id/api/fbdl?url=${args[0]}`);
      const apiData = apiRes.data;

      if (apiData.status === 200 && apiData.data.result.length > 0) {
        video = apiData.data.result.find(i => i.quality === '720p (HD)') || apiData.data.result.find(i => i.quality === '360p (SD)');
      } else {
        await m.react('❌');
        return conn.reply(m.chat, `❗ No se encontraron videos en el enlace proporcionado.`, m);
      }
    } catch (e) {
      await m.react('❌');
      return conn.reply(m.chat, `❗ Ocurrió un error al procesar el enlace.`, m);
    }
  }

  if (video) {
    try {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: video.url },
          caption: `🚀 Tu video de Facebook.\n> ⏤͟͟͞͞𝐋𝐲𝐧𝐱-𝐀𝐈ꗄ➺`,
          fileName: 'facebook_video.mp4',
          mimetype: 'video/mp4',
        },
        { quoted: m }
      );
      await m.react('✅');
    } catch (e) {
      await m.react('❌');
      return conn.reply(m.chat, `❗ Ocurrió un error al enviar el video.`, m);
    }
  } else {
    await m.react('❌');
    return conn.reply(m.chat, `❗ No se pudo procesar el video.`, m);
  }
};

handler.help = ['facebook'];
handler.tags = ['dl'];
handler.command = ['facebook', 'fb'];
handler.Monedas = 5;
export default handler;
