import { createHash } from 'crypto'  
import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
import axios from 'axios'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i 
let msg, user, userNationality, tag, aa, pp, ppch, codigo, nombre, edad, finalizar, codigosIdiomas, nombresIdiomas
let handler = async function (m, { conn, text, usedPrefix, command }) {
codigosIdiomas = ['es', 'en', 'pt', 'id', 'ar', 'de', 'it']
nombresIdiomas = {
'es': 'Español',
'en': 'English',
'pt': 'Português',
'id': 'Bahasa Indonesia',
'ar': 'Arab (عرب)',
'de': 'Deutsch',
'it': 'Italiano'
}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let userNationality = null; 
try {
let api = await axios.get(`${apis}/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
let userNationalityData = api.data.result;
userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : null;
} catch (err) {
userNationality = null; 
}

pp = await conn.profilePictureUrl(who, 'image').catch(_ => gataImg.getRandom())
ppch = await conn.profilePictureUrl(who, 'image').catch(_ => gataMenu.getRandom())
  
tag = `${m.sender.split("@")[0]}`
aa = tag + '@s.whatsapp.net'
user = global.db.data.users[m.sender]

if (/^(verify|verificar|reg(ister)?)$/i.test(command)) {
if (user.registered === true) return m.reply(lenguajeGB.smsVerify0(usedPrefix) + '*')
if (!Reg.test(text)) return m.reply(lenguajeGB.smsVerify1(usedPrefix, command))
let [_, name, splitter, age] = text.match(Reg)  
if (!name) return m.reply(lenguajeGB.smsVerify2())
if (!age) return m.reply(lenguajeGB.smsVerify3())
age = parseInt(age)

if (age > 50) return m.reply(lenguajeGB.smsVerify4()) 
if (age < 10) return m.reply(lenguajeGB.smsVerify5())
if (name.length >= 30) return m.reply(lenguajeGB.smsVerify6())  
edad = age
nombre = name
  
let listaIdiomasTexto = ''
listaIdiomasTexto += '*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄୭̥⋆*｡*\n' 
listaIdiomasTexto += '*┆ 🌐 IDIOMA DINÁMICO 🌐*\n' 
listaIdiomasTexto += '*┆ 🌐 DYNAMIC LANGUAGE 🌐*\n' 
listaIdiomasTexto += '*┆┄┄┄┄┄┄┄┄┄┄┄┄┄┄୭̥⋆*｡*\n' 
codigosIdiomas.forEach((codigo, index) => {
listaIdiomasTexto += `*┆* \`\`\`[ ${index + 1} ] » ${nombresIdiomas[codigo]}\`\`\`\n`
})
listaIdiomasTexto += '*╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄୭̥⋆*｡*\n'    
let genText = `
${listaIdiomasTexto}
🌟 *MULTI LENGUAJE DINÁMICO* 🌟\n
👉 *Verificación pausada. Responda a este mensaje con el número del idioma.*\n
> _El idioma elegido será el que_ ${packname} _usará. Si no está disponible su idioma, selecciona otro o solicita agregarlo en:_ ${ig}
\n⋯⋯⋯⋯⋯⋯⋯⋯⋯\n
🌟 *DYNAMIC MULTI LANGUAGE* 🌟\n
👉 *Verification paused. Reply to this message with the language number.*\n
> _The language chosen will be the one that_ ${packname} _will use. If your language is not available, select another one or request to add it at:_ ${ig}`
msg = await conn.sendMessage(m.chat, { text: genText.trim() }, { quoted: m })	
finalizar = true
}
handler.before = async function (m, { conn }) {
if (user?.registered === true || user?.registered === undefined) return
if (!finalizar) return
if (m.quoted && m.quoted.id == msg.key.id) {
if (!/^\d+$/.test(m.text)) return conn.reply(m.chat, `*Solo se permiten números del \`1\` al \`${codigosIdiomas.length}\` de acuerdo con el orden de idiomas disponibles*\n\n*Only numbers from \`1\` to \`${codigosIdiomas.length}\` are allowed according to the order of available languages*`, m)
}
const numero = parseInt(m.text, 10)
let isVerified = m.quoted ? (m.quoted.id == msg.key.id && !isNaN(numero) && numero >= 1 && numero <= codigosIdiomas.length) : false
if (isVerified) {
user.GBLanguage = codigosIdiomas[numero - 1]
nombresIdiomas = nombresIdiomas[user.GBLanguage]
user.name = nombre + 'ͧͧͧͦꙶͣͤ✓ᚲᴰᴷ'.trim()
user.age = edad
user.regTime = + new Date
user.registered = true
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)	
let caption = `${lenguajeGB.smsVerify7()}
*⎔ IDIOMA* 
• ${nombresIdiomas}
*⎔ ${lenguajeGB.smsPerfil1()}* 
• @${tag}
*⎔ ${lenguajeGB.smsPerfil2()}* 
• ${user.name}
*⎔ ${lenguajeGB.smsPerfil3()}*
• ${user.age}
*⎔ PAÍS:*
• ${userNationality}
*⎔ ${lenguajeGB.smsVerify9()}*
• 'ͧͧͧͦꙶͣͤ✓ᚲᴰᴷ'
*⎔ ${lenguajeGB.smsPerfil5()}*
• \`\`\`${sn}\`\`\`

> *Mira tú registro en este canal*
${canal5}`.trim()
await m.reply(`${lenguajeGB['smsAvisoIIG']()}*EN CASO QUE QUIERA CAMBIAR O ELIMINAR EL IDIOMA DEBE DE ELIMINAR SU REGISTRO PRIMERO*`)
await conn.sendFile(m.chat, pp, 'Lynx.jpg', caption, m, false, { mentions: [aa] }) 
await m.reply(lenguajeGB['smsVerify8'](usedPrefix)) 
let chtxt = `🌐 *Idioma:* ${nombresIdiomas} ${userNationality ? `\n🌎 *País:* ${userNationality}` : ''}\n👤 *Usuario:* ${m.pushName || 'Anónimo'}\n✅ *Verificación:* ${user.name}\n🔢 *Edad:* ${user.age} años\n🐈 *Bot:* ${packname}`.trim()
await conn.sendMessage(ch.ch1, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 Notificación General 🔔 】",
body: '🥳 ¡Nuevo usuario registrado!',
thumbnailUrl: ppch,
sourceUrl: accountsgb,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
finalizar = '' 
return
}}}
handler.command = /^(verify|verificar|reg(ister)?)$/i
export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));}
