import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`Команде требуется описание, чтобы начать рисовать.\n\n *✧ Ejemplo:*\n${usedPrefix + command} Деревянный дом на снежной горе`);
    await m.reply("")

    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '👌' } }, { messageId: m.key.id })
    try {
        let url = `https://widipe.com/dalle?text=${text}`

        await conn.sendFile(m.chat, await (await fetch(url)).buffer(), 'dalle.jpg',m,rcanal)
        m.react("👌")

    } catch (e) {
        console.log(e)
        conn.reply("x")
    }
}

handler.help = ['dalle <txt>']
handler.tags = ['ai']
handler.command = /^(dalle)$/i

handler.premium = false


export default handler
