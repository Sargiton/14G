// [ ❀ INSTAGRAM DL (IMAGEN/VIDEO) ]
import axios from 'axios';

let handler = async (m, { text, args, command, conn, usedPrefix }) => {  
  if (!text) return conn.reply(m.chat, '[ ᰔᩚ ] Введите действительный URL-адрес *Instagram*.', m, rcanal);

  await m.react('🕓');

  try {
    let mediaInfo = await instagramdl(args[0]);

    if (mediaInfo.videoUrl) {
      let vid = await axios.get(mediaInfo.videoUrl, { responseType: 'arraybuffer' });
      await conn.sendMessage(m.chat, { video: Buffer.from(vid.data), caption: '✅ Video descargado correctamente.' }, { quoted: m });
    } else if (mediaInfo.imageUrl) {
      let img = await axios.get(mediaInfo.imageUrl, { responseType: 'arraybuffer' });
      await conn.sendMessage(m.chat, { image: Buffer.from(img.data), caption: '✅ Imagen descargada correctamente.' }, { quoted: m });
    } else {
      return m.reply('❀ Результатов не найдено.');
    }

    await m.react('✅');
  } catch (error) {
    await m.react('❌');
  }
};

handler.command = ['ig', 'igdl', 'instagram'];
handler.tags = ['dl'];
handler.help = ['ig *<link>*'];
 
export default handler;

let instagramdl = async (url) => {
  let mediaInfo = await getMediaInfoFromAPI(url, 'https://api.vreden.web.id/api/igdownload?url=');

  if (!mediaInfo.videoUrl && !mediaInfo.imageUrl) {
    mediaInfo = await getMediaInfoFromAPI(url, 'https://api.siputzx.my.id/api/d/igdl?url=');
  }

  return mediaInfo;
};

let getMediaInfoFromAPI = async (url, apiUrl) => {
  let config = {
    method: 'GET',
    url: `${apiUrl}${encodeURIComponent(url)}`,
  };

  let res = await axios.request(config);
  let data = res.data.data ? res.data.data[0] : null;
  let mediaInfo = {};

  if (data) {
    if (data.url) {
      mediaInfo.videoUrl = data.url;
    }
    if (data.thumbnail) {
      mediaInfo.imageUrl = data.thumbnail;
    }
  }

  return mediaInfo;
};
