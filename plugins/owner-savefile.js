import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) return m.reply(`🚩 Введите путь и имя файла рядом с командой.`)
try {
if (!m.quoted.text) return m.reply(`🚩 Ответить на сообщение.`)
let path = `${text}`
await fs.writeFileSync(path, m.quoted.text)
m.reply(`🚩 Guardado en *${path}*.`)
} catch {
await m.reply(`🚩 Ответить на сообщение.`)
}}
handler.command = ["savefile", "savejs", "savecmd"]
handler.tags = ['owner']
handler.help = ['savefile']
handler.rowner = true
export default handler