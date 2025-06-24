import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, `*Пожалуйста, введите поисковый запрос*`, m);

    await m.react('⏳');
    try {
        let searchResults = await search(args.join(" "));

        if (!searchResults || searchResults.length === 0) {
            throw new Error('Видео не найдено.');
        }

        let video = searchResults.find(v => v.seconds < 3600) || searchResults[0];

        let messageText = `🌟 *YouTube Reproductor* 🌟\n\n`;
        messageText += `🎬 *Título:* ${video.title}\n`;
        messageText += `⏰ *Duración:* ${formatDuration(video.seconds)}\n`;
        messageText += `👤 *Autor:* ${video.author.name || 'Desconocido'}\n`;
        messageText += `📅 *Publicado:* ${convertTimeToSpanish(video.ago)}\n`;
        messageText += `👀 *Vistas:* ${video.views.toLocaleString()}\n`;
        messageText += `🔗 *Enlace directo:* ${video.url}\n`;

        let image = video.image || 'default-image-url';

        await conn.sendButton2(
            m.chat,
            messageText,
            'Bot WhatsApp',
            image,
            [
                ['🎶 MP3', `.ytmp3 ${video.url}`],
                ['📺 MP4', `.ytmp4 ${video.url}`],
                ['🎶 MP3DOC', `.ytmp3doc ${video.url}`],
                ['📺 MP4DOC', `.ytmp4doc ${video.url}`]
            ],
            '',
            [],
            m,
            {}
        );

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        conn.reply(m.chat, '*`Произошла ошибка при поиске видео.`*', m);
    }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];

export default handler;

async function search(query, options = {}) {
    let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return search.videos;
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${secondsLeft}s`;
}

function convertTimeToSpanish(timeText) {
    if (!timeText || typeof timeText !== 'string') {
        return 'Fecha desconocida';
    }
    return timeText
        .replace(/year/g, 'año').replace(/years/g, 'años')
        .replace(/month/g, 'mes').replace(/months/g, 'meses')
        .replace(/day/g, 'día').replace(/days/g, 'días')
        .replace(/hour/g, 'hora').replace(/hours/g, 'horas')
        .replace(/minute/g, 'minuto').replace(/minutes/g, 'minutos');
}
