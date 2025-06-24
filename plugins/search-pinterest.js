import pkg from '@whiskeysockets/baileys';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = pkg;

import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, "🤍 *¿Qué quieres buscar en Pinterest?*", m);
  }

  const query = args.join(" ");
  await m.react('🕓');

  async function generateImageMessage(imageUrl) {
    const { imageMessage } = await generateWAMessageContent({
      image: { url: imageUrl }
    }, {
      upload: conn.waUploadToServer
    });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  try {
    let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22scope%22%3A%22pins%22%7D%7D`);
    let imageUrls = data.resource_response.data.results.map(item => item.images.orig.url);

    if (imageUrls.length === 0) {
      return conn.reply(m.chat, `⚠️ No se encontraron resultados para "${query}" en Pinterest.`, m);
    }

    shuffleArray(imageUrls);

    let cards = [];
    for (let i = 0; i < Math.min(5, imageUrls.length); i++) {
      const imageUrl = imageUrls[i];
      const imageMessage = await generateImageMessage(imageUrl);

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `Imagen ${i + 1}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: `🔎 Resultados de Pinterest`
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Ver más 📍",
              Url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`
            })
          }]
        })
      });
    }

    const message = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🤍 Resultados para: ${query}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: `🔎 Pinterest - Busquedas`
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, "❌ Ocurrió un error al realizar la búsqueda en Pinterest.", m);
  }
};

handler.help = ['pinterest *<text>*'];
handler.tags = ['search'];
handler.command = ['pinterest'];
handler.Monedas = 3;

export default handler;
