import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    try {
        await m.react('🕓');
        let response = await fetch('https://nekos.life/api/v2/img/neko');
        let data = await response.json();
        let imageUrl = data.url;

        await conn.sendMessage(
            m.chat,
            {
                image: { url: imageUrl },
                caption: "✨ Aquí tienes una imagen de *Neko*. ¿Quieres otra? ✨",
                buttons: [
                    {
                        buttonId: '.neko2', // Botón que llama al mismo comando
                        buttonText: { displayText: 'Siguiente 🔄' },
                        type: 1,
                    },
                ],
                viewOnce: true, // Imagen en modo "ver una vez"
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

handler.command = ['neko2'];
handler.tags = ['img'];
handler.help = ['neko2'];
handler.Monedas = 1
export default handler;
