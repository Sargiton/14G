let handler = async (m, { conn, usedPrefix, command }) => {
	
if (!m.quoted) return conn.reply(m.chat, `🚩 Ответьте на сообщение, которое вы хотите удалить.`, m, rcanal)
try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
 } catch {
return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
}
}
handler.help = ['delete']
handler.tags = ['group']
handler.command = /^удалить)?$/i
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler