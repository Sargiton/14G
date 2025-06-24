let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})(?: ([0-9]{1,3}))?/i;

let handler = async (m, { conn, text, isOwner }) => {
    try {
        if (!text) return m.reply('🚩 Ingresa el enlace del Grupo y la duración opcional en días.');
        
        let match = text.match(linkRegex);
        if (!match) return m.reply('🚩 Enlace inválido. Asegúrate de que sea un enlace de invitación válido.');

        let [, code, expiredInput] = match;
        let expired = Math.floor(
            Math.min(999, Math.max(1, isOwner && isNumber(expiredInput) ? parseInt(expiredInput) : 3))
        );

        let res = await conn.groupAcceptInvite(code);
        m.reply(`✅ Me uní correctamente al Grupo *${res}${expired ? `* durante *${expired}* días.` : ''}`);

        // Configuración de expiración
        let chats = global.db.data.chats[res] || (global.db.data.chats[res] = {});
        if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24;

        // Enviar mensaje al grupo
        let pp = 'https://telegra.ph/file/4fa3f65b6698517cd8dcf.mp4';
        await conn.sendMessage(
            res,
            {
                video: { url: pp },
                gifPlayback: true,
                caption: 'Ya llegó el mejor Bot de todo WhatsApp.',
                mentions: [m.sender],
            }
        );
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al intentar unirme al grupo. Por favor, verifica los detalles e inténtalo de nuevo.');
    }
};

handler.help = ['join *<link> <días>*'];
handler.tags = ['owner'];
handler.command = ['join', 'entrar'];
handler.owner = true;

export default handler;

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x));
