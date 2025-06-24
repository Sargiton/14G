import { join } from 'path'
import { readdirSync, unlinkSync, existsSync } from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  const tmpDir = join(__dirname, '../tmp');
  const deletedFiles = [];

  if (existsSync(tmpDir)) {
    const filenames = readdirSync(tmpDir);

    filenames.forEach(file => {
      const filePath = join(tmpDir, file);

      try {
        unlinkSync(filePath);
        deletedFiles.push(file);
      } catch (error) {
        console.error(`Error al eliminar el archivo: ${filePath}`, error);
      }
    });

    if (deletedFiles.length > 0) {
      console.log('Archivos eliminados:', deletedFiles);
      const deletedFilesList = deletedFiles.join('\n');
    } else {
      console.log('В tmp нет файлов для очистки');
    }
  } else {
    console.log('Папка tmp не существует');
  }

  conn.reply(m.chat, '✧ Listo!', m);
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp|clear|tmpclear|cleantmp)$/i
handler.rowner = true

export default handler;
