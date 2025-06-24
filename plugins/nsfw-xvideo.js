import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m);
  }

  await m.react('🕓');
  
  if (!text) throw 'Proporcióname un enlace de video para descargar.';

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/xvideo?key=user1&url=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

      if (data.success && data.results) {
        const videoData = data.results;
        const videoUrl = videoData.VideoUrlHigh;
        const videoTitle = 'Desconocido';
        const videoImage = videoData.ThumbUrl || '';

        const videoSizeLimit = 64000000; 
        const videoResponse = await fetch(videoUrl);
        const videoBuffer = await videoResponse.arrayBuffer();

        if (videoBuffer.byteLength > videoSizeLimit) {
          await conn.sendMessage(m.chat, {
            document: Buffer.from(videoBuffer),
            mimetype: 'video/mp4',
            fileName: `${videoTitle}.mp4`,
          }, { quoted: m });
        } else {
          await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: `🎥 *Título:* ${videoTitle}\n⏱️ *Duración:* Desconocida`,
            mimetype: 'video/mp4',
            fileName: `${videoTitle}.mp4`,
            thumbnail: { url: videoImage },
          }, { quoted: m });
        }

        await m.react('✅');
      } else {
        throw new Error('No se encontraron resultados.');
      }
    } else {
      throw new Error('Error al realizar la solicitud.');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['xvideo'];
handler.command = ['xvideo', 'xvideodownload'];

export default handler;
