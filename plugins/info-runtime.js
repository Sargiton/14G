let handler = async (m, { conn, args, usedPrefix, command }) => {

    let _muptime = process.uptime ? process.uptime() : 0; 
    
    if (!_muptime) _muptime = 0;

    let muptime = clockString(_muptime * 1000);
    
    m.reply(`*» Бот был активен в течение:* \n${muptime}`);
}

handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['активность', 'uptime']
export default handler;

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  
  return [d, 'д ', h, 'ч ', m, 'м ', s, 'с ']
    .map(v => v.toString().padStart(2, 0))
    .join('');
}
