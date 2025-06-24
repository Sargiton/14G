import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return await conn.reply(
      m.chat,
      `❌ *Por favor, proporciona el nombre de usuario de TikTok que deseas buscar.*\n\n*✧ Ejemplo:*\n${usedPrefix + command} twice_tiktok_official`,
      m,rcanal
    );
  }

  try {
    let response = await fetch(`https://delirius-apiofc.vercel.app/tools/tiktokstalk?q=${encodeURIComponent(text)}`);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    let json = await response.json();
    if (json.status && json.result) {
      const user = json.result.users;
      const stats = json.result.stats;

      let replyText = `👤 *Perfil de TikTok*\n\n`;
      replyText += `💼 *Usuario*: ${user.username}\n`;
      replyText += `📛 *Nombre*: ${user.nickname}\n`;
      replyText += `🔗 *Enlace*: ${user.url}\n`;
      replyText += `✅ *Verificado*: ${user.verified ? "Sí" : "No"}\n`;
      replyText += `🌍 *Región*: ${user.region}\n\n`;
      replyText += `📊 *Estadísticas*\n`;
      replyText += `👥 *Seguidores*: ${stats.followerCount.toLocaleString()}\n`;
      replyText += `📑 *Videos*: ${stats.videoCount.toLocaleString()}\n`;
      replyText += `❤️ *Me gusta totales*: ${stats.heartCount.toLocaleString()}\n`;

      await conn.sendMessage(
        m.chat,
        { 
          text: replyText,
          mentions: [m.sender],
          contextInfo: { externalAdReply: { 
            title: user.nickname, 
            body: "Haz clic aquí para ver el perfil completo",
            thumbnailUrl: user.avatarMedium,
            sourceUrl: user.url
          }},
        },
        { quoted: m }
      );
    } else {
      await conn.reply(m.chat, "⚠️ No se pudo encontrar el perfil especificado.", m);
    }
  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, "❌ Ocurrió un error al procesar tu solicitud.", m);
  }
};

handler.help = ['tiktokstalk <usuario>'];
handler.tags = ['tools'];
handler.command = /^(tiktokstalk|ttstalk|tiktokinfo)$/i;

export default handler;
