import axios from 'axios';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = pkg;

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, `🚩 Ingrese un título de película para buscar\n\nEjemplo:\n> *${usedPrefix + command}* diablo`, m);

    await m.react('🕓');
    try {
        // Hacer una solicitud a la API de búsqueda de películas
        const response = await axios.get(`https://api.dorratz.com/v2/pelis-search?q=${encodeURIComponent(args.join(' '))}`);
        
        // Verificar si la solicitud fue exitosa
        if (!response.data.status) {
            return conn.reply(m.chat, 'No se encontraron resultados para su búsqueda.', m);
        }
        
        let peliculas = response.data.peliculas;
        let cards = [];

        for (let i = 0; i < peliculas.length; i++) {
            const pelicula = peliculas[i];
            const { titulo, rating, link, imagen } = pelicula;
            
            // Crear mensaje de imagen para cada película
            const { imageMessage } = await generateWAMessageContent({
                image: { url: imagen }
            }, { upload: conn.waUploadToServer });

            cards.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `🎬 Título: ${titulo}\n⭐ Rating: ${rating}\n🔗 Enlace: ${link}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: '🔎 Resultados de Películas'
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
                            Url: link
                        })
                    }]
                })
            });
        }

        // Enviar mensaje en formato carrusel
        const message = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `🎬 Resultados de búsqueda para: ${args.join(' ')}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `🔎 Buscando películas...`
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
        await m.react('✖');
        return conn.reply(m.chat, 'Hubo un error al buscar las películas. Intente nuevamente más tarde.', m);
    }
};

handler.help = ['pelisplus <título>'];
handler.tags = ['search'];
handler.command = ['pelisplussearch', 'pelisplus'];
handler.Monedas = 3;

export default handler;
