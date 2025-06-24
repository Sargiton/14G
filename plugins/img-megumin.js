import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    await m.react('🕓');
    try {
        let res = await fetch('https://api.waifu.pics/sfw/megumin');
        if (!res.ok) return;

        let json = await res.json();
        if (!json.url) return;

        await conn.sendMessage(
            m.chat, 
            { 
                image: { url: json.url },
                caption: "✨ Aquí tienes una imagen de *Megumin*. ¡Espero que te guste! ✨",
                buttons: [
                    { 
                        buttonId: '.megumin', 
                        buttonText: { displayText: 'Siguiente 🔄' },
                        type: 1
                    }
                ],
                viewOnce: true, 
                headerType: 4
            },
            { quoted: m }
        );

        await m.react('✅');
    } catch {
        await m.react('✖️');
        await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al intentar obtener la imagen de Megumin. Inténtalo nuevamente.' }, { quoted: m });
    }
};

handler.help = ['megumin'];
handler.tags = ['img'];
handler.command = ['megumin'];
handler.Monedas = 1
export default handler;
