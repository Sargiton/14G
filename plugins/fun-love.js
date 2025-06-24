let handler = async (m, { conn, command, text }) => {
let love = `*❤️❤️ ИЗМЕРИТЕЛЬ ЛЮБВИ ❤️❤️*
*Любовь к ${text} для тебя это из* *${Math.floor(Math.random() * 100)}%* *из одного100%*
*Ты должен был попросить ее стать твоей девушкой ?*
`.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })}
handler.help = ['love *@user*']
handler.tags = ['fun']
handler.command = /^(любовь)$/i
export default handler
