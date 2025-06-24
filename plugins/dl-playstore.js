import gplay from 'google-play-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
    m.react('🔥');

    if (!args[0]) {
        return conn.reply(m.chat, `[ ᰔᩚ ] Введите действительный URL-адрес *PlayStore*.`, m, rcanal);
    }

    const url = args[0];

    let packageName;
    try {
        packageName = new URL(url).searchParams.get("id");
        if (!packageName) throw new Error();
    } catch {
        return conn.reply(m.chat, `*❌ Указанный URL-адрес недействителен или не содержит идентификатора приложения.*`, m);
    }

    console.log(`ID de paquete: ${packageName}`);

    let info;
    try {
        info = await gplay.app({ appId: packageName });
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, `*❌ Не удалось найти приложение. Убедитесь, что ссылка указана правильно.*`, m);
    }

    const h = info.title;
    console.log(`Название приложения: ${h}\nИдентификатор приложения: ${info.appId}`);

    let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });
    
    m.react('🤗');
}

handler.command = /^(dlplaystore)$/i;
handler.tags = ['dl'];
export default handler;
