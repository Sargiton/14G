import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, 'Введите текст того, что вы хотите найти в Spotify 🤍', m);

  await m.react('🕓');

  try {
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
      return imageMessage;
    }

    let push = [];
    let api = await fetch(`https://dark-core-api.vercel.app/api/search/spotify?key=user1&query=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (json && json.length > 0) {
      for (let track of json) {
        let image = await createImage(track.album_cover);

        push.push({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: `◦ *Título:* ${track.title} \n◦ *Artistas:* ${track.artist} \n◦ *Álbum:* ${track.album} \n◦ *Duración:* ${msToTime(track.duration_ms)} \n◦ *Popularidad:* ${track.popularity} \n◦ *Fecha:* ${track.release_date}`,
          }),
          footer: proto.Message.InteractiveMessage.Footer.fromObject({
            text: '🎶 Powered by Dark-Core API 🎶',
          }),
          header: proto.Message.InteractiveMessage.Header.fromObject({
            title: track.album, // Título del álbum
            hasMediaAttachment: true,
            imageMessage: image, // Imagen del álbum
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            buttons: [
              {
                "name": "cta_copy",
                "buttonParamsJson": `{"display_text":"🎧 ¡Escuchar ahora! 🎧","id":"123456789","copy_code":".spotify ${track.link}"}`
              },
            ]
          }),
        });
      }

      const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({ text: `*Resultados para: ${text}*` }),
              footer: proto.Message.InteractiveMessage.Footer.create({ text: '_Powered by Dark-Core API_' }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] }),
            }),
          },
        },
      }, { 'quoted': m });

      await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
      await m.react('✅');
    } else {
      console.log('No se encontraron resultados o la respuesta de la API es incorrecta:', json);
      return conn.reply(m.chat, 'No se encontraron resultados para la búsqueda', m);
    }
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, 'Hubo un error al realizar la búsqueda', m);
  }
};

function msToTime(ms) {
  let date = new Date(ms);
  return `${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
}

handler.help = ["spotifysearch *<text>*"];
handler.tags = ["search"];
handler.command = /^(spotifysearch)$/i;
handler.Monedas = 5;

export default handler;
