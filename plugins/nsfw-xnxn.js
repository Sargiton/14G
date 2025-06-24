import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m);
  }

  await m.react('🕓');
  
  if (!text) throw 'Proporcióname un enlace de video para descargar.';

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/xnxn?key=api&url=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

      if (data.success && data.result.estado === 200) {
        const { titulo, descripcion, duracion, urlVideo, vistas } = data.result.datos;

        const durationMatch = /PT(\d+)H(\d+)M(\d+)S/.exec(duracion);
        const durationFormatted = durationMatch 
          ? `${durationMatch[1]}h ${durationMatch[2]}m ${durationMatch[3]}s`
          : 'Desconocida';

        const videoSizeLimit = 64000000; // 64MB límite de WhatsApp
        const videoResponse = await fetch(urlVideo);
        const videoBuffer = await videoResponse.arrayBuffer();

        if (videoBuffer.byteLength > videoSizeLimit) {
          await conn.sendMessage(m.chat, {
            document: Buffer.from(videoBuffer),
            mimetype: 'video/mp4',
            fileName: `${titulo}.mp4`,
          }, { quoted: m });
        } else {
          await conn.sendMessage(m.chat, {
            video: { url: urlVideo },
            caption: `🎥 *Título:* ${titulo}\n📝 *Descripción:* ${descripcion}\n⏱️ *Duración:* ${durationFormatted}\n👀 *Vistas:* ${vistas}`,
            mimetype: 'video/mp4',
            fileName: `${titulo}.mp4`,
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

handler.help = ['xnxx', 'xn'];
handler.command = ['xnxx', 'xn'];

export default handler;
