let handler = async (m, { conn, usedPrefix, command}) => {
await conn.reply(m.chat,` мы прощаем нашим.`, estilo)
}
handler.command = /^(Fototeta|fototeta)$/i
export default handler
