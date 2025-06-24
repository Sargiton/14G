/* 
- Inactivos etiqueta y Kick By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
let handler = async (m, { conn, text, args, groupMetadata }) => {
    await conn.sendPresenceUpdate('composing', m.chat)

    const lama = 86400000 * 7
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    const milliseconds = new Date(now).getTime()

    let member = groupMetadata.participants.map(v => v.id)
    let total = 0
    const sider = []

    for (let i = 0; i < member.length; i++) {
        let users = groupMetadata.participants.find(u => u.id === member[i])
        if ((typeof global.db.data.users[member[i]] === 'undefined' || milliseconds - global.db.data.users[member[i]].lastseen > lama) && !users.isAdmin && !users.isSuperAdmin) {
            if (typeof global.db.data.users[member[i]] !== 'undefined') {
                if (global.db.data.users[member[i]].banned === true) {
                    total++
                    sider.push(member[i])
                }
            } else {
                total++
                sider.push(member[i])
            }
        }
    }

        if (!args[0]) {
        return conn.reply(m.chat, `🤍 Используйте команду с параметрами:\n1. \`.неактивные list\` чтобы пометить участников как выключенных\n2. \`.неактивный удар\` чтобы исключить участников из списка`, m)
    }

    if (args[0] === 'лист') {
        if (total === 0) return conn.reply(m.chat, `🤍 *В этой группе нет неактивных.*`, m)
        
        const groupName = await conn.getName(m.chat)
        const message = `*${total}/${member.length}* группа *${groupName}* Список неактивных\n${sider.map(v => '  ○ @' + v.replace(/@.+/, '')).join('\n')}`

        return conn.reply(m.chat, message, m, {
            contextInfo: {
                mentionedJid: sider
            }
        })
    }

    if (args[0] === 'снести') {
        if (total === 0) return conn.reply(m.chat, `🤍 *В этой группе нет сторон, по которым можно было бы ударить.*`, m)

        for (const user of sider) {
            try {
                await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
            } catch (e) {
                throw e 
            }
        }

        return conn.reply(m.chat, `🤍 Успешно удален *${total}* неактивные участники группы.`, m)
    }

    return conn.reply(m.chat, `🤍Недопустимый вариант. Использует \`list\` чтобы просмотреть неактивных участников или \`удалить\` чтобы удалить их.`, m)
}

handler.help = ['inactivos']
handler.tags = ['group']
handler.command = /^(неактивные|gcinactivos)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler