var handler = async (m, { conn, args, text, usedPrefix, command }) => {

let who 
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let name = await conn.getName(m.sender)        
let user = global.db.data.users[who]
let nom = conn.getName(m.sender)
if (!text) await m.reply(`Ingrese el número de la persona que quieres añadir a este grupo.\n\n🚩 Ejemplo:\n*${usedPrefix + command}* 66666666666`)
if (text.includes('+')) await m.reply(`Ingrese el número todo junto sin el *(+)*`)
let group = m.chat
let link = 'https' + await conn.groupInviteCode(group)

await conn.reply(text+'@s.whatsapp.net', `*Hola! soy Lynx, Una persona te a invitado a su grupo.*\n\n*Link*\n${link}`, m, {mentions: [m.sender]})
await m.reply(`*Enviando la invitación al privado de ${nom}*\n\n*📅 ${fecha}*\n⏰ *${tiempo}*`) 

}
handler.help = ['add *<número>*']
handler.tags = ['group']
handler.command = ['шгорзшгпшзрппждлгпзшнкагпхэщзшрнщгн']
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
