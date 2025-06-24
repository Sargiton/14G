import translate from '@vitalets/google-translate-api';
const prohibited = ['poop', 'dick', 'porn', 'gore', 'cum', 'prostitute', 'ass', 'pussy', 'rule34', 'harddick', 'dick', 'penis', 'pornography', 'child porn', 'child pornography', 'cp', 'cock', 'vagina', 'pussy']

let handler = async (m, { conn, text, usedPrefix, command }) => {
async function detectProhibitedWords(text) {
const translatedText = await translate(text, { to: 'en' })
const lowercaseTranslatedText = translatedText.text.toLowerCase()

if (prohibited.some(word => lowercaseTranslatedText.includes(word))) {
return m.reply('⚠️😾')
} else {
return null
}}

detectProhibitedWords(text)
.then(response => {
if (response) {
console.log(response)
} else {
m.reply('В тексте нет запрещенных слов.')
}})
}

handler.command = /^(prueba03)$/i 
export default handler

