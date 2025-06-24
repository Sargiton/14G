import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    await m.react('🕓');
    try {
        let res = await fetch('https://api.waifu.pics/sfw/neko');
        if (!res.ok) return;
        let json = await res.json();
        if (!json.url) return;

        await conn.sendMessage(
            m.chat,
            {
                image: { url: json.url },
                caption: "✨ Aquí tienes una imagen de *Neko*. ¿Quieres otra? ✨",
                buttons: [
                    {
                        buttonId: '.neko',
                        buttonText: { displayText: 'Siguiente 🔄' },
                        type: 1,
                    },
                ],
                viewOnce: true, 
                headerType: 4,
            },
            { quoted: m }
        );

        await m.react('✅');
    } catch {
        await m.react('✖️');
        await conn.sendMessage(m.chat, { text: '❌ Hubo un error al obtener la imagen. Por favor, inténtalo nuevamente.' }, { quoted: m });
    }
};

handler.help = ['neko'];
handler.tags = ['img'];
handler.command = ['neko'];
 
handler.Monedas = 1
export default handler;
