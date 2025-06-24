let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    await conn.sendMessage(m.chat, { 
      text: `Uso: ${usedPrefix}${command} <link del grupo/canal>` 
    });
    return;
  }

  let link = args[0];
  let regexGroup = /https:\/\/chat\.whatsapp\.com\/([\w\d]+)/;
  let regexChannel = /https:\/\/whatsapp\.com\/channel\/([\w\d]+)/;

  let id;
  let isValid = false;

  if (regexGroup.test(link)) {
    let match = link.match(regexGroup);
    id = match[1];
    // Validar si el grupo realmente existe
    try {
      let groupInfo = await conn.groupMetadata(id);
      console.log('Grupo encontrado:', groupInfo); // Log para depuración
      isValid = !!groupInfo;
    } catch (e) {
      console.error('Error al obtener información del grupo:', e); // Log de error
      isValid = false;
    }
  } else if (regexChannel.test(link)) {
    let match = link.match(regexChannel);
    id = `${match[1]}@newsletter`;
    // Validar si el canal realmente existe
    try {
      let channelInfo = await conn.query({
        tag: 'iq',
        attrs: { to: id, type: 'get', xmlns: 'w:biz' },
        content: [{ tag: 'newsletter', attrs: { xmlns: 'w:biz' } }],
      });
      console.log('Canal encontrado:', channelInfo); // Log para depuración
      isValid = !!channelInfo;
    } catch (e) {
      console.error('Error al obtener información del canal:', e); // Log de error
      isValid = false;
    }
  } else {
    await conn.sendMessage(m.chat, { 
      text: 'Por favor, proporciona un enlace válido de grupo o canal de WhatsApp.' 
    });
    return;
  }

  if (!isValid) {
    await conn.sendMessage(m.chat, { 
      text: 'El grupo o canal no parece ser válido o no se pudo verificar.' 
    });
    return;
  }

  // Verificar que el chat está definido
  if (!m.chat) {
    console.error('Chat no definido, no se puede enviar el mensaje');
    return;
  }

  try {
    console.log(`Enviando mensaje con la ID: ${id}`); // Log para confirmar el envío
    await conn.sendMessage(m.chat, { 
      text: `El ID del grupo/canal es: \n\n*${id}*` 
    });
    console.log('Mensaje enviado con éxito'); // Log para confirmar el envío exitoso
  } catch (e) {
    console.error('Error al enviar el mensaje con la ID:', e); // Log de error si falla el envío
  }
};

handler.help = ['id'];
handler.tags = ['tools'];
handler.command = /^id/i;
export default handler;
