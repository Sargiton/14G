
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0] || isNaN(args[0])) return m.reply(`🚩 Введите число, представляющее количество дней.\n\n*пример:*\n*${usedPrefix + command}* 30`)

    let who
    if (m.isGroup) who = args[1] ? args[1] : m.chat
    else who = args[1]

    var nDays = 86400000 * args[0]
    var now = new Date() * 1
    if (now < global.db.data.chats[who].expired) global.db.data.chats[who].expired += nDays
    else global.db.data.chats[who].expired = now + nDays
    let teks = `🚩 Были установлены дни истечения срока действия для \n*${await conn.getName(who)}* \n\n*На:* ${args[0]} День\n\n*Обратный отсчет :* ${msToDate(global.db.data.chats[who].expired - now)}`
    m.reply(teks)
}
handler.help = ['expired *<días>*']
handler.tags = ['owner']
handler.command = /^(аренда|addexpired)$/i
handler.rowner = true
export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *День*\n ', h, ' *Часы*\n ', m, ' *Минуты*\n ', s, ' *Секунд* '].map(v => v.toString().padStart(2, 0)).join('')
}