let handler = m => m
handler.all = async function (m) {
let chat = global.db.data.chats[m.chat]

if (/^hola$/i.test(m.text) && chat.audios && !chat.isBanned) {
let vn = './media/Hola.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}   

if (!chat.isBanned && chat.audios && m.text.match(/(правила|Правила)/gi)) {
let vn = './media/правила.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(давай|дайте|дай)/gi)) {    
let vn = './media/дай.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}    
    
if (!chat.isBanned && chat.audios && m.text.match(/(время)/gi)) {    
let vn = './media/время.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}    
    
if (!chat.isBanned && chat.audios && m.text.match(/(как дела|как делишки)/gi)) {    
let vn = './media/как дела.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}   
   
if (!chat.isBanned && chat.audios && m.text.match(/(спать|спокойной ночи)/gi)) {    
let vn = './media/спать.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}  
    
if (!chat.isBanned && chat.audios && m.text.match(/(друг|подруга|друзья)/gi)) {    
let vn = './media/друг.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(расмешил|смешно|угараю)/gi)) {    
let vn = './media/смешно.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(сука|сучка|сучара)/gi)) {    
let vn = './media/Сука.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(секс|порно|трахну|выебу|жарю|готовлю)/gi)) {    
let vn = './media/секс.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(здравствуйте|здрасьте|здорова)/gi)) {    
let vn = './media/здравствуйте.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(красавица|красотка)/gi)) {    
let vn = './media/красавица.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(музыка|песня|музон)/gi)) {    
let vn = './media/музыка.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(плов)/gi)) {    
let vn = './media/плов.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(с днём рождения|с днюхой)/gi)) {    
let vn = './media/с днём рождения.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(спокойной ночи|шпать|споки)/gi)) {    
let vn = './media/спокойной ночи.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(суп|борщ|свекольник|расольник|gemi2)/gi)) {    
let vn = './media/суп.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(такси|еду|я за рулём|скоро подъеду)/gi)) {    
let vn = './media/такси.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(тост)/gi)) {    
let vn = './media/тост.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(новенький|это кто)/gi)) {    
let vn = './media/новенький.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    

    
if (!chat.isBanned && chat.audios && m.text.match(/(пидор|пидорас|пидрила)/gi)) {    
let vn = './media/пидор.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(пофиг)/gi)) {    
let vn = './media/пофиг.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(отвали)/gi)) {    
let vn = './media/отвали.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(пошел нахуй|нихуя|иди в попу)/gi)) {    
let vn = './media/надоел.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(я хочу|мечтаю)/gi)) {    
let vn = './media/мечта.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(красотка)/gi)) {    
let vn = './media/красотка.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    

    
if (!chat.isBanned && chat.audios && m.text.match(/(казел|козел|сука|блять|пидар)/gi)) {    
let vn = './media/казел.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(что делать|скучно)/gi)) {    
let vn = './media/ебать.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(дурак)/gi)) {    
let vn = './media/дурак.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(дура|дурочка)/gi)) {    
let vn = './media/дура.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(давай знакомиться)/gi)) {    
let vn = './media/давай знакомитьсяс.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(группа)/gi)) {    
let vn = './media/группа.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(😡)/gi)) {    
let vn = './media/бот.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(афигеть)/gi)) {    
let vn = './media/афигеть.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(админы)/gi)) {    
let vn = './media/админы.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(любят)/gi)) {    
let vn = './media/любят.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

if (!chat.isBanned && chat.audios && m.text.match(/(что делаешь)/gi)) {    
let vn = './media/пошол нахуй.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
        
if (!chat.isBanned && chat.audios && m.text.match(/(блядина|блидина)/gi)) {    
let vn = './media/сье.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

if (!chat.isBanned && chat.audios && m.text.match(/(ты кто)/gi)) {    
let vn = './media/ты кто.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
if (!chat.isBanned && chat.audios && m.text.match(/(удалю)/gi)) {    
let vn = './media/удалю.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

if (!chat.isBanned && chat.audios && m.text.match(/(ебал)/gi)) {    
let vn = './media/ебал.mp4'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})} 

if (!chat.isBanned && chat.audios && m.text.match(/(девушка|женщина)/gi)) {    
let vn = './media/дувушка.mp4'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

if (!chat.isBanned && chat.audios && m.text.match(/(хочу парня)/gi)) {    
let vn = './media/хочу паня.mp4'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

if (!chat.isBanned && chat.audios && m.text.match(/(милашки|девочки)/gi)) {    
let vn = './media/мтлашки.mp4'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

if (!chat.isBanned && chat.audios && m.text.match(/(бухаю|пью)/gi)) {    
let vn = './media/бухаю.mp4'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}



if (!chat.isBanned && chat.audios && m.text.match(/(пошол нах)/gi)) {    
let vn = './media/пошол нах.webp'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(о бот)/gi)) {    
let vn = './media/о бот.webp'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(😭)/gi)) {    
let vn = './media/смайл.webp'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    
if (!chat.isBanned && chat.audios && m.text.match(/(вызов)/gi)) {    
let vn = './media/вызов.webp'
this.sendPresenceUpdate('recording', m.chat)   
this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
    


if (!chat.isBanned && chat.audios && m.text.match(/(лот)/gi)) {    
    let vn = './media/лот.webp'
    this.sendPresenceUpdate('recording', m.chat)   
    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

    if (!chat.isBanned && chat.audios && m.text.match(/(где была|где был)/gi)) {    
        let vn = './media/где была.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
        if (!chat.isBanned && chat.audios && m.text.match(/(доброй ночи)/gi)) {    
        let vn = './media/доброй ночи.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

        if (!chat.isBanned && chat.audios && m.text.match(/(внимание)/gi)) {    
        let vn = './media/внимание.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
        if (!chat.isBanned && chat.audios && m.text.match(/(люблю)/gi)) {    
        let vn = './media/люблю.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
        if (!chat.isBanned && chat.audios && m.text.match(/(скучно)/gi)) {    
        let vn = './media/скучно.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
        if (!chat.isBanned && chat.audios && m.text.match(/(мальчики)/gi)) {    
        let vn = './media/мальчики.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
        if (!chat.isBanned && chat.audios && m.text.match(/(проиграл|проиграла)/gi)) {    
        let vn = './media/проиграл.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
        if (!chat.isBanned && chat.audios && m.text.match(/(Чи дае|кто ты)/gi)) {    
        let vn = './media/Чи дае.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
        if (!chat.isBanned && chat.audios && m.text.match(/(девочки)/gi)) {    
        let vn = './media/девочки.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
        if (!chat.isBanned && chat.audios && m.text.match(/(не правильно)/gi)) {    
        let vn = './media/не правильно.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
        
        if (!chat.isBanned && chat.audios && m.text.match(/(кто откуда|с какого города|какой город|ты от куда)/gi)) {    
        let vn = './media/кто от.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                
        if (!chat.isBanned && chat.audios && m.text.match(/(добро подаловать)/gi)) {    
        let vn = './media/добро.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
        
        if (!chat.isBanned && chat.audios && m.text.match(/(молодец|малодец)/gi)) {    
        let vn = './media/молодец.mp3'
        this.sendPresenceUpdate('recording', m.chat)   
        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                    



                
            if (!chat.isBanned && chat.audios && m.text.match(/(в оморок|в омороке)/gi)) {    
            let vn = './media/в оморок.mp4'
            this.sendPresenceUpdate('recording', m.chat)   
            this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
               if (!chat.isBanned && chat.audios && m.text.match(/(где все)/gi)) {    
                    let vn = './media/где все.mp3'
                    this.sendPresenceUpdate('recording', m.chat)   
                    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                        
                    if (!chat.isBanned && chat.audios && m.text.match(/(💋)/gi)) {    
                    let vn = './media/на смайл.mp3'
                    this.sendPresenceUpdate('recording', m.chat)   
                    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
            
                    if (!chat.isBanned && chat.audios && m.text.match(/(на работу)/gi)) {    
                    let vn = './media/на работу.mp3'
                    this.sendPresenceUpdate('recording', m.chat)   
                    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                        
                    if (!chat.isBanned && chat.audios && m.text.match(/(фото|фотку)/gi)) {    
                    let vn = './media/фото.mp3'
                    this.sendPresenceUpdate('recording', m.chat)   
                    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                        
                    if (!chat.isBanned && chat.audios && m.text.match(/(чем занимаешься)/gi)) {    
                    let vn = './media/занимаешься.mp3'
                    this.sendPresenceUpdate('recording', m.chat)   
                    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                        
                    if (!chat.isBanned && chat.audios && m.text.match(/(писька)/gi)) {    
                    let vn = './media/писька.mp3'
                    this.sendPresenceUpdate('recording', m.chat)   
                    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                        
                    if (!chat.isBanned && chat.audios && m.text.match(/(ахуеть)/gi)) {    
                    let vn = './media/ахуеть.mp3'
                    this.sendPresenceUpdate('recording', m.chat)   
                    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                        
                    if (!chat.isBanned && chat.audios && m.text.match(/(за что)/gi)) {    
                    let vn = './media/за что.mp3'
                    this.sendPresenceUpdate('recording', m.chat)   
                    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                        
                    if (!chat.isBanned && chat.audios && m.text.match(/(ушла|ушол)/gi)) {    
                    let vn = './media/ушла.mp4'
                    this.sendPresenceUpdate('recording', m.chat)   
                    this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}
                        
                    if (!chat.isBanned && chat.audios && m.text.match(/(покажи сиськи|сиськи)/gi)) {    
                        let vn = './media/покажи сиськи.mp4'
                        this.sendPresenceUpdate('recording', m.chat)   
                        this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

                        if (!chat.isBanned && chat.audios && m.text.match(/(настроение)/gi)) {    
                            let vn = './media/настроение.mp4'
                            this.sendPresenceUpdate('recording', m.chat)   
                            this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true})}

   
return !0 }
export default handler
