let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let tiempoEspera = 5
    
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
        m.reply(`[ ✰ ] Вы уже недавно сделали ставку, подождите *⏱ ${tiempoRestante}* para apostar nuevamente.`)
        return
    }

    if (!text || !['грань', 'крест'].includes(text.toLowerCase())) {
        return conn.reply(m.chat, '[ ✰ ] Выберите вариант (*Орел или решка*), чтобы подбросить монету.\n\n`» Пример :`\n' + `> *${usedPrefix + command}* грань`, m, rcanal)
    }

    cooldowns[m.sender] = Date.now()
    let resultado = Math.random() < 0.5 ? 'грань' : 'крест'
    let esGanador = text.toLowerCase() === resultado

    if (esGanador) {
        global.db.data.users[m.sender].corazones += 1000
        conn.reply(m.chat, `✿︎ Монета упала в *${text}*, вы только что выиграли *1000 🤍 сердец*`, m, rcanal)       
    } else {
        global.db.data.users[m.sender].corazones -= 500
        conn.reply(m.chat, `✿︎ Монета упала в *${text}*, ты только что проиграл *500 🤍 сердец*`, m, rcanal)
    }
}

handler.help = ['coinflip']
handler.tags = ['rpg']
handler.command = ['suerte', 'cf', 'flip', 'coinflip']

export default handler

function segundosAHMS(segundos) {
    return `${segundos % 60} segundos`
}
