import { areJidsSameUser } from '@whiskeysockets/baileys'

export async function before(m, { participants, conn }) {
    if (m.isGroup) {
        let chat = global.db.data.chats[m.chat]

        if (!chat.antiBot) {
            return
        }

        let botJid = global.conn.user.jid

        if (areJidsSameUser(botJid, conn.user.jid)) {
            return
        } else {
            let isBotPresent = participants.some(p => areJidsSameUser(botJid, p.id))

            if (isBotPresent) {
                setTimeout(async () => {
                    await conn.groupLeave(m.chat)
                }, 5000)
            }
        }
    }
}
