let handler = async (m, { text, usedPrefix, command }) => {
global.db.data.sticker = global.db.data.sticker || {}
if (!m.quoted) return conn.reply(m.chat, `🚩 Ответить на сообщение.`, m, rcanal)
if (!m.quoted.fileSha256) return conn.reply(m.chat, `🚩 Ответить на сообщение.`, m, rcanal)
if (!text) return conn.reply(m.chat, `🚩 Введите имя команды.`, m, rcanal)
try {
let sticker = global.db.data.sticker
let hash = m.quoted.fileSha256.toString('base64')
if (sticker[hash] && sticker[hash].locked) return conn.reply(m.chat, `🚩 У вас нет разрешения на изменение этой команды стикера.`, m, rcanal)
sticker[hash] = {
text,
mentionedJid: m.mentionedJid,
creator: m.sender,
at: + new Date,
locked: false,
}
await conn.reply(m.chat, `🚩 Команда успешно сохранена.`, m, rcanal)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['cmd'].map(v => 'set' + v + ' *<texto>*')
handler.tags = ['cmd']
handler.command = ['setcmd']
handler.owner = true

export default handler