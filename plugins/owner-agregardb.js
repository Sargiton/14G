import fs from 'fs';
import path from 'path';

const databasePath = path.resolve('./storage/databases/database.json');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Ruta completa del archivo JSON mencionado
    const filePath = path.resolve('./storage/databases', text);

    // Función para cargar la base de datos desde un archivo JSON
    function loadDatabase() {
        if (fs.existsSync(databasePath)) {
            return JSON.parse(fs.readFileSync(databasePath, 'utf8'));
        } else {
            return {};
        }
    }

    // Función para guardar la base de datos en un archivo JSON
    function saveDatabase(db) {
        fs.writeFileSync(databasePath, JSON.stringify(db, null, 2), 'utf8');
    }

    let db = loadDatabase();
    let replyText = '';

    if (command === 'agregardata') {
        // Verificar si el archivo existe y si es un archivo, no un directorio
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);

            if (stats.isFile()) {
                try {
                    // Cargar el archivo JSON mencionado
                    const newDatabase = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                    // Combinar los datos del archivo mencionado con los datos existentes en la base de datos
                    db.users = { ...db.users, ...newDatabase.users };

                    // Guardar la base de datos actualizada
                    saveDatabase(db);

                    replyText = `Base de datos actualizada con éxito con el archivo ${text}.`;
                } catch (error) {
                    replyText = `Hubo un error al procesar el archivo JSON: ${error.message}`;
                }
            } else {
                replyText = 'El archivo mencionado no es un archivo válido.';
            }
        } else {
            replyText = 'No se encontró el archivo JSON mencionado.';
        }
    }

    await conn.reply(m.chat, replyText, m);
};

handler.help = ['agregardata'];
handler.tags = ['owner'];
handler.command = /^agregardata$/i;
handler.rowner = true;

export default handler;
