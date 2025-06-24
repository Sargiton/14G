const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🤍';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const pesan = args.join` `;
  const oi = `*» ИНФОРМАЦИЯ :* ${pesan}`;
  let teks = `*!  ОБЩЕЕ УПОМИНАНИЕ  !*\n  *PARA ${participants.length} УЧАСНИКИ* 🗣️\n\n ${oi}\n\n╭  ┄ 𝅄  ۪꒰ \`ТЕМНОЕ ЯДРО - КОМАНДА\` ꒱  ۟  𝅄 ┄\n`;
  for (const mem of participants) {
    teks += `┊${customEmoji} @${mem.id.split('@')[0]}\n`;
  }
  teks += `╰⸼ ┄ ┄ ┄ ─  ꒰  ׅ୭ *${vs}* ୧ ׅ ꒱  ┄  ─ ┄ ⸼`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(внимание|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;
