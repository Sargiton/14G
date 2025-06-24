import fs, { promises } from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
try {
let d = new Date(new Date + 3600000)
let locale = 'es'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850)   
let taguser = conn.getName(m.sender)
let user = global.db.data.users[m.sender]
let text = '*<texto>*'
let url = '*<url>*'
let tag = '*<tag>*'
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let menu = `*☆═━┈◈ ╰ ${vs} ╯ ◈┈━═☆*
*│* *˚₊·˚₊· ͟͟͞͞➳❥*⇢ *${global.conn.user.jid.split`@`[0]}*
*│* *˚₊·˚₊· ͟͟͞͞➳❥ *◈ 
*│* *˚₊·˚₊· ͟͟͞͞➳❥
*│* *˚₊·˚₊· ͟͟͞͞➳❥
*│* *˚₊·˚₊· ͟͟͞͞➳❥
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal1()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ verificar DarkCore.18
*│* ┊▸ ✦ menu18
*│* ┊▸ ✦ perfil 
*│* ┊▸ ✦ 
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*│ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal2()}_ ◂◂*
*╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│* ┊*│* ┊▸ ✦,
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
 `.trim()
    
const vi = [
'https://i.ibb.co/Y7mhFdf/file.jpg',
'https://i.ibb.co/Y7mhFdf/file.jpg',
'https://i.ibb.co/Y7mhFdf/file.jpg'
]
try {
await conn.sendMessage(m.chat, { video: { url: vi.getRandom() }, gifPlayback: true, caption: menu, contextInfo: fakeChannel2 })
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: { url: gataMenu.getRandom() }, gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: gataImg.getRandom(), gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try{
await conn.sendFile(m.chat, imagen5, 'menu.jpg', menu, m, { mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }, { contextInfo: fakeChannel2} )
} catch (error) {
return 
}}}} 
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /^(впрольвпнольспрнольспрнь|\?)$/i
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
