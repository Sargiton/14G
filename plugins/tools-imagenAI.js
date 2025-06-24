// Código Creado Por Niño Piña Wa.me/50557865603
import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {
// Verificamos que el usuario haya ingresado un texto
if (!text) return conn.reply(m.chat, `*🧑‍💻 Ingresa un texto para generar tu imagen a tu gusto*`,m,rcanal);
// Mostramos un emoji de reloj mientras generamos la imagen
m.react('🕒');
await conn.reply(m.chat,'*🧑‍💻 Espere, Estamos Trabajando en su imagen*',m,rcanal);
try {
// Hacemos la solicitud a la API con el texto proporcionado
const response = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);
// Verificamos si la respuesta fue exitosa
if (!response.ok) throw new Error('Network response was not ok');
// Obtenemos el buffer de la imagen
const buffer = await response.buffer();
// Mostramos un emoji de éxito
m.react('✔️');
// Enviamos la imagen generada al chat
await conn.sendFile(m.chat, buffer, 'imagen.jpg',listo,m,rcanal,fake);
} catch (error) {
console.error(error);
throw `*🚨 Lo sentimos, ha ocurrido un error 😔*`;
}
}

handler.tags = ['tools'];
handler.help = ['genearimg'];
handler.command = ['genearimg', 'imgg'];

export default handler;
