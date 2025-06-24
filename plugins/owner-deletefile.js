import { tmpdir } from 'os'
import path from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {
    if (!text) return conn.reply(m.chat, `🚩 Введите путь и имя файла, который вы хотите удалить.`, m, rcanal)
    
    const file = text.trim()
    if (!existsSync(file)) return conn.reply(m.chat, `🚩 Archivo no encontrado.`, m, rcanal)
    
    unlinkSync(file)
    conn.reply(m.chat, `🚩 El archivo *${file}* ha sido eliminado con éxito.`, m, rcanal)
}
handler.tags = ['owner']
handler.help = ['deletefile']
handler.command = /^(deletefile|df)$/i
handler.rowner = true

export default handler