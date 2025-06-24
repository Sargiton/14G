import axios from 'axios';
import cheerio from 'cheerio';

async function apkdirect(query) {
    try {
        const response = await axios.get(`https://www.apkdirect.io/?s=${encodeURIComponent(query)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            }
        });

        const $ = cheerio.load(response.data);

        const results = [];
        $('.flex-container .flex-item').each((i, el) => {
            const title = $(el).find('.card-title').text().trim();
            const imageUrl = $(el).find('.card-img img').attr('src');
            const link = $(el).find('a').attr('href');
            const fullLink = link ? `${link}download` : null;
            const description = $(el).find('.post-content span').text().trim();

            if (title && imageUrl && fullLink) {
                results.push({ title, imageUrl, link: fullLink, description });
            }
        });

        return results;
    } catch (error) {
        console.error('Ошибка в apkdirect:', error);
        throw new Error('Ошибка при получении данных из APK');
    }
}

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return await m.reply('⚠️ Вы должны указать название приложения для поиска.');
    }

    const query = args.join(' ');

    try {
        const apkResults = await apkdirect(query);

        if (apkResults.length === 0) {
            return await m.reply('❌ Результаты вашего поиска не найдены.');
        }

        let message = '📦 *Результаты поиска:*\n\n';
        for (let i = 0; i < Math.min(apkResults.length, 5); i++) {
            message += `📌 *${apkResults[i].title}*\n🔗(${apkResults[i].link})\n\n`;
        }

        await conn.sendMessage(m.chat, { image: { url: apkResults[0].imageUrl }, caption: message }, { quoted: m });
    } catch (error) {
        await m.reply(`❌ Ошибка: ${error.message}`);
    }
};

handler.command = ['apksearch'];
handler.help = ['apksearch <nombre>'];
handler.tags = ['search'];

export default handler;
