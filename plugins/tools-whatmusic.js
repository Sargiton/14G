import fs from 'fs'
import acrcloud from 'acrcloud'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  // Verificar si el mensaje tiene un archivo de audio o video
  if (/audio|video/.test(mime)) {
    let media = await q.download()  // Descargar el archivo multimedia
    let ext = mime.split('/')[1]  // Obtener la extensión del archivo
    let filePath = `./tmp/${m.sender}.${ext}`

    // Guardar el archivo descargado en el sistema de archivos
    fs.writeFileSync(filePath, media)

    // Usar acrcloud para identificar la música
    let res = await acr.identify(fs.readFileSync(filePath))
    let { code, msg } = res.status

    // Verificar si hubo un error en la identificación
    if (code !== 0) throw msg

    let { title, artists, album, genres, release_date } = res.metadata.music[0]

    let txt = `
𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙇𝘼 𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼𝙎 

• 🌻 𝙏𝙄𝙏𝙐𝙇𝙊: ${title}
• 🍃 𝘼𝙍𝙏𝙄𝙎𝙏𝙰: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'No encontrado'}
• 💻 𝘼𝙇𝘽𝙐𝙈: ${album.name || 'No encontrado'}
• 🍂 𝙂𝙀𝙉𝙀𝙍𝙊: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'No encontrado'}
• 🪙 𝙁𝙀𝘾𝙃𝘼 𝘿𝙀 𝙇𝘼𝙉𝙕𝘼𝙈𝙄𝙀𝙉𝙏𝙊: ${release_date || 'No encontrado'}
    `.trim()

    // Eliminar el archivo temporal después de usarlo
    fs.unlinkSync(filePath)

    // Responder con la información de la canción
    m.reply(txt)
  } else {
    // Enviar un mensaje si no se ha respondido a un archivo de audio o video
    throw '💭 Responda A Un Audio O Video'
  }
}

handler.command = ['quemusica', 'quemusicaes', 'whatmusic']
export default handler
