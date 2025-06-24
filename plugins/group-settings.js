let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = {
        'открыть': 'not_announcement',
        'закрыть': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined)
        return conn.reply(`🚩 Выберите вариант.\n\n*${usedPrefix + command}* открыть\n${usedPrefix + command}* закрыть`, m, rcanal)
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group *abrir/cerrar*']
handler.tags = ['group']
handler.command = ['группу', 'grupo'] 
handler.admin = true
handler.botAdmin = true

export default handler