import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const defaultLang = 'es';
const tmpDir = join(process.cwd(), 'tmp'); // Directorio temporal para guardar los archivos de audio

const handler = async (m, { conn, args, usedPrefix, command }) => {
    let lang = args[0];
    let text = args.slice(1).join(' ');

    // Validar el idioma y texto
    if ((args[0] || '').length !== 2) {
        lang = defaultLang;
        text = args.join(' ');
    }
    if (!text && m.quoted?.text) text = m.quoted.text;

    if (!text) throw `🚩 Ingresa un texto junto al comando.\n\nEjemplo:\n${usedPrefix + command} es Hola mundo`;

    // Generar audio usando TTS
    let audioBuffer;
    try {
        audioBuffer = await generateTTS(text, lang);
    } catch (e) {
        m.reply(`⚠️ Error generando TTS: ${e.message}`);
        lang = defaultLang; // Reintentar con idioma predeterminado
        audioBuffer = await generateTTS(text, lang);
    }

    // Enviar archivo de audio si se generó con éxito
    if (audioBuffer) {
        conn.sendFile(m.chat, audioBuffer, 'tts.opus', null, m, true);
    } else {
        throw `🚩 No se pudo generar el TTS. Inténtalo de nuevo.`;
    }
};

// Información del comando
handler.help = ['tts *<idioma> <texto>*', 'tts *<texto>*'];
handler.tags = ['tools'];
handler.command = /^g?tts$/i;

export default handler;

// Función para generar TTS
async function generateTTS(text, lang = 'es') {
    return new Promise((resolve, reject) => {
        try {
            const tts = gtts(lang);
            const filePath = join(tmpDir, `${Date.now()}.wav`);

            tts.save(filePath, text, () => {
                try {
                    const audioBuffer = readFileSync(filePath);
                    unlinkSync(filePath); // Limpiar archivo temporal
                    resolve(audioBuffer);
                } catch (e) {
                    reject(new Error('Error al leer o eliminar el archivo de audio generado.'));
                }
            });
        } catch (e) {
            reject(new Error(`Error en la conversión TTS: ${e.message}`));
        }
    });
}
