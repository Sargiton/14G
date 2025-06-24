let WAMessageStubType = (await import(global.baileys)).default

export async function before(m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
let chat = global.db.data.chats[m.chat]
let usuario = `@${m.sender.split`@`[0]}`
let inf = lenguajeGB['smsAvisoIIG']()
//let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg'  
let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => gataMenu)

let nombre, foto, edit, newlink, status, admingp, noadmingp
nombre = lenguajeGB.smsAutodetec1(inf, usuario, m)
foto = lenguajeGB.smsAutodetec2(inf, usuario, groupMetadata)
edit = lenguajeGB.smsAutodetec3(inf, usuario, m, groupMetadata)
newlink = lenguajeGB.smsAutodetec4(inf, groupMetadata, usuario)
status = lenguajeGB.smsAutodetec5(inf, groupMetadata, m, usuario)
admingp = lenguajeGB.smsAutodetec6(inf, m, groupMetadata, usuario)
noadmingp = lenguajeGB.smsAutodetec7(inf, m, groupMetadata, usuario)

if (chat.detect && m.messageStubType == 21) {
await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })   
  
} else if (chat.detect && m.messageStubType == 22) {
await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 23) {
await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })    

} else if (chat.detect && m.messageStubType == 25) {
await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  
	
} else if (chat.detect && m.messageStubType == 26) {
await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  

} else if (chat.welcome && m.messageStubType == 27 && conn.user.jid != global.conn.user.jid) { 
let subject = groupMetadata.subject
let descs = groupMetadata.desc || "Lynx-Ai";
let userName = `${m.messageStubParameters[0].split`@`[0]}`;
let defaultWelcome = `*╭┈⊰* ${subject}  *⊰┈ ✦*\n*┊✨ ДОБРО ПОЖАЛОВАТЬ!!*\n┊💖 @${userName}\n┊📄 *ПРОЧТИТЕ ОПИСАНИЕ ГРУППЫ*\n*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ✦*\n${descs}\n`;
let textWel = chat.sWelcome ? chat.sWelcome
.replace(/@user/g, `@${userName}`)
.replace(/@group/g, subject) 
.replace(/@desc/g, descs)
: defaultWelcome;
        
await conn.sendMessage(m.chat, { text: textWel, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[m.sender, m.messageStubParameters[0]],
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
thumbnailUrl: pp, 
title: [wm, '𝗦𝘂𝗽𝗲𝗿 ' + gt + ' 🌟', '🌟'].getRandom(),
containsAutoReply: true,
mediaType: 1, 
sourceUrl: accountsgb }}}, { quoted: fkontak }) 
} else if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32) && conn.user.jid != global.conn.user.jid ) {
let subject = groupMetadata.subject;
let userName = `${m.messageStubParameters[0].split`@`[0]}`;
let defaultBye = `*╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*\n┊ *@${userName}*\n┊ *ОН НЕ БЫЛ ДОСТОИН НАХОДИТЬСЯ ЗДЕСЬ!!* 🌟\n*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*`;
let textBye = chat.sBye ? chat.sBye
.replace(/@user/g, `@${userName}`)
.replace(/@group/g, subject)
: defaultBye;
await conn.sendMessage(m.chat, { text: textBye, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[m.sender, m.messageStubParameters[0]],
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
thumbnailUrl: pp, 
title: [wm, '𝗦𝘂𝗽𝗲𝗿 ' + gt + ' 🌟', '🌟'].getRandom(),
containsAutoReply: true,
mediaType: 1, 
sourceUrl: accountsgb }}}, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType == 29) {
await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType === 172 && m.messageStubParameters.length > 0) {
const rawUser = m.messageStubParameters[0];
const users = rawUser.split('@')[0]; 
const prefijosProhibidos = ['91', '92', '222', '93', '265', '61', '62', '966', '229', '40', '49', '20', '963', '967', '234', '210', '212'];
const usersConPrefijo = users.startsWith('+') ? users : `+${users}`;

if (chat.antifake) {
if (prefijosProhibidos.some(prefijo => usersConPrefijo.startsWith(prefijo))) {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'отклонить');
console.log(`Заявление о приеме в чате @${users} автоматически отклоняется из-за наличия запрещенного префикса.`);
} catch (error) {
console.error(`Ошибка при отклонении запроса на ${usersConPrefijo}:`, error);
}} else {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'одобрить');
console.log(`Заявление о приеме в чате @${users} утверждено автоматически.`);
} catch (error) {
console.error(`Ошибка при утверждении запроса на ${usersConPrefijo}:`, error);
}}} else {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'одобрить');
console.log(`Заявление о приеме в чате @${users} утверждено автоматически, поскольку #antifake está desactivado.`);
} catch (error) {
console.error(`Ошибка при утверждении запроса на ${usersConPrefijo}:`, error);
}}
return;
} if (chat.detect && m.messageStubType == 30) {
await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  

//} else if (chat.detect && m.messageStubType == 145) {
//await conn.sendMessage(m.chat, { text: 'Se ha activado el modo de aprobación para unirse al grupo.', mentions: [m.sender] })

} else {
//console.log({ messageStubType: m.messageStubType,
//messageStubParameters: m.messageStubParameters,
//type: WAMessageStubType[m.messageStubType], 
//})
}}
