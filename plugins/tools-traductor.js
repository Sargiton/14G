import fetch from "node-fetch";

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let lang, text;
    if (args.length >= 1) {
        lang = args[0];
        text = args.slice(1).join(" ");
    } else if (m.quoted && m.quoted.text) {
        lang = "es";
        text = m.quoted.text;
    } else {
        return conn.reply(m.chat, `*🚩 Ejemplo: ${usedPrefix + command} es Hello World*`, m);
    }

    try {
        const prompt = encodeURIComponent(text);

        let detectRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${prompt}`);
        let detectJson = await detectRes.json();
        let detectedLang = detectJson[2]; // Idioma detectado

        if (detectedLang === lang) {
            return conn.reply(m.chat, `🚩 El texto ya está en el idioma solicitado (${lang})`, m);
        }

        let translateRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${detectedLang}&tl=${lang}&dt=t&q=${prompt}`);
        let translateJson = await translateRes.json();

        let translatedText = translateJson[0][0][0]; 
        let caption = `*» Texto Original (${detectedLang})* : ${text}\n*» Traducción (${lang})* : ${translatedText}`;

        await conn.reply(m.chat, caption, m);
        await m.react('✅');
    } catch (e) {
        await m.react('✖️');
        console.error(e);
    }
};

handler.help = ['trad *<leng> <texto>*'];
handler.tags = ['tools'];
handler.command = /^(translate|traducir|trad)$/i;
handler.star = 1;
export default handler;
