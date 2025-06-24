let handler = async (m, { text, conn }) => {
    let user = global.db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    await conn.reply(m.chat, `🚩 Теперь вы отсутствуете до тех пор, пока не отправите новое сообщение повторно, когда вас попытаются пометить, пользователь будет уведомлен о вашем отсутствии с указанием причины.\n\n*${conn.getName(m.sender)}* Esta AFK, Motivo *${text ? ': ' + text : ''}*`, m, rcanal)
}
handler.help = ['afk *<razón>*']
handler.tags = ['fun']
handler.command = ['afk']
handler.group = true

export default handler