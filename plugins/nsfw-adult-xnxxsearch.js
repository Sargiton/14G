import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { text, usedPrefix, command, conn, rcanal }) => {
  if (!global.db.data) global.db.data = {};
  if (!global.db.data.chats) global.db.data.chats = {};
  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = { nsfw: false };

  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m, rcanal);
  }

  if (!text) {
    throw `*[❗INFO❗] Ejemplo de uso del comando: ${usedPrefix + command} <texto>*`;
  }

  try {
    const vids_ = { from: m.sender, urls: [] };

    if (!global.videoListXXX) global.videoListXXX = [];

    if (global.videoListXXX[0]?.from === m.sender) global.videoListXXX.splice(0);

    const res = await xnxxsearch(text);
    const json = res.result;

    let cap = `*🔍 RESULTADOS DE LA BÚSQUEDA: ${text.toUpperCase()}*\n\n`;
    let count = 1;

    for (const v of json) {
      vids_.urls.push(v.link);
      cap += `*[${count}]*\n• 🎬 *Título:* ${v.title}\n• 🔗 *Link:* ${v.link}\n• ❗ *Info:* ${v.info}\n\n`;
      cap += '••••••••••••••••••••••••••••••••\n\n';
      count++;
    }

    m.reply(cap);
    global.videoListXXX.push(vids_);
  } catch (e) {
    console.error('[ERROR]', e);
    throw '*[❗] Error al buscar resultados. Intenta nuevamente.*';
  }
};

handler.command = ['xnxxsearch', 'xnxxs'];

export default handler;

async function xnxxsearch(query) {
  return new Promise((resolve, reject) => {
    const baseurl = 'https://www.xnxx.com';
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`)
      .then(res => res.text())
      .then(res => {
        const $ = cheerio.load(res);
        const results = [];

        $('div.mozaique').each((a, b) => {
          $(b).find('div.thumb').each((c, d) => {
            const url = baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/');
            const title = $(d).find('img').attr('alt') || 'Sin título';
            const info = $(d).find('p.metadata').text() || 'Sin información';

            results.push({ title, info, link: url });
          });
        });

        resolve({ code: 200, status: true, result: results });
      })
      .catch(err => reject({ code: 503, status: false, result: err }));
  });
}
