let handler = async (m, { conn, text, participants}) => {
	
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    if (!m.quoted) return m.reply(`🚩 Ответить на сообщение.`)
    conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users } )
}

handler.help = ['otag']
handler.tags = ['group']
handler.command = /^(вызов2|tag2)$/i

handler.rowner = true
handler.group = true

export default handler