import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('☁️');

    // VCARD
    let list = [{
        displayName: "Darkcore ☁️",
        vcard: `привет`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: `привет`,
                body: 'Это официальный контакт моего создателя',
                thumbnailUrl: 'https://i.ibb.co/Y7mhFdf/file.jpg',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m 
    });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(внобваролбанродбароглд)$/i;

export default handler;
