let handler = async (m, { conn, args, usedPrefix, command }) => {
    let chat = global.db.data.chats[m.chat] || {};
    if (args[0] === 'on') {
        if (chat.antiBot) return conn.reply(m.chat, 'Антибот уже активирован.', m, rcanal)
        chat.antiBot = true
        await conn.reply(m.chat, '🚩 Активирован антибот для этой группы.', m, rcanal)
    } else if (args[0] === 'off') {
        if (!chat.antiBot) return conn.reply(m.chat, 'Антибот уже отключен.', m, rcanal)
        chat.antiBot = false
        await conn.reply(m.chat, '🚩 Антибот отключен для этой группы.', m, rcanal)
    } else {
        await conn.reply(m.chat, `*Настройка антибота*. Введите "вкл", чтобы включить, и "выкл", чтобы выключить.`, m, rcanal)
    }
}
handler.help = ['antibot *<on/off>*']
handler.tags = ['group']
handler.command = ['antibot']
handler.use = ['on/off']
handler.group = true
handler.admin = true

export default handler
