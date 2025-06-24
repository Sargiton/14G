import axios from 'axios';

const handler = async (m, { conn }) => {
    try {
        const response = await axios.get('https://random-d.uk/api/randomimg');
        const imageUrl = response.data.url;

        await m.react('🕓');
        
        await conn.sendMessage(
            m.chat, 
            { 
                image: { url: imageUrl }, 
                caption: "🦆 *P A T O* 🦆\nAquí tienes una imagen aleatoria de un pato. ¡Espero que te guste!",
                buttons: [
                    { 
                        buttonId: '.pato', 
                        buttonText: { displayText: 'Siguiente 🦆' },
                        type: 1  
                    }
                ],
                viewOnce: true, 
                headerType: 4  
            },
            { quoted: m }
        );

        await m.react('✅');
    } catch (error) {
        await m.react('✖️');
        console.error('Error al obtener la imagen del pato:', error);
        await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al intentar obtener la imagen del pato. Inténtalo nuevamente.' }, { quoted: m });
    }
};

handler.help = ['pato'];
handler.tags = ['img'];
;
handler.command = /^(pato|duck|patorandom)$/i;

export default handler;
