import { createHash } from 'crypto'

let handler = async function (m, { conn, args, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)

  if (!user.registered) {
    return m.reply('🤍 No estás registrado.')
  }

  if (!args[0]) {
    user.registered = false
    return m.reply('🤍 Tu registro ha sido eliminado.')
  }

  if (args[0] !== sn) {
    return m.reply('🤍 Número de serie incorrecto')
  }

  user.registered = false
  m.reply('🤍 Tu registro ha sido eliminado.')
}

handler.help = ['unreg']
handler.tags = ['start']
handler.command = ['unreg']


export default handler
