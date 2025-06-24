import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m, rcanal);
}
  const apiUrl = 'https://api.vreden.web.id/api/hentaivid';
  
  try {
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (json.status === 200 && json.result && json.result.length > 0) {
      const randomVideo = json.result[Math.floor(Math.random() * json.result.length)];

      if (randomVideo.type === 'video/mp4') {
        await conn.sendFile(m.chat, randomVideo.video_1, 'video.mp4', '¡Aquí tienes un video aleatorio!', null);
      } else {
        await m.reply('El contenido seleccionado no es un video válido.');
      }
    } else {
      await m.reply('No se encontraron resultados en la API.');
    }
  } catch (e) {
    console.error(e);
    await m.reply('Hubo un error al intentar obtener un video.');
  }
};

handler.command = ['hotvideo'];

export default handler;
