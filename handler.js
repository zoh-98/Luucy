import { generateWAMessageFromContent } from "@whiskeysockets/baileys" 
import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'   
import fetch from 'node-fetch' 

/**
 * @type {import('@whiskeysockets/baileys')}  
 */
const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
clearTimeout(this)
resolve()
}, ms))
 
/**
 * Handle messages upsert
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate 
 */
export async function handler(chatUpdate) {
this.msgqueque = this.msgqueque || [];
this.uptime = this.uptime || Date.now();
if (!chatUpdate)
return
this.pushMessage(chatUpdate.messages).catch(console.error)
let m = chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m)
return
if (global.db.data == null)
await global.loadDatabase()
try {
m = smsg(this, m) || m
if (!m)
return

if (opts['nyimak'])
return
if (!m.fromMe && opts['self'])
return
if (opts['pconly'] && m.chat.endsWith('g.us'))
return
if (opts['gconly'] && !m.chat.endsWith('g.us'))
return
if (opts['swonly'] && m.chat !== 'status@broadcast')
return
if (typeof m.text !== 'string')
m.text = ''

const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isOwner = isROwner || m.fromMe
const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

if (opts['queque'] && m.text && !(isMods)) {
let queque = this.msgqueque, time = 1000 * 5
const previousID = queque[queque.length - 1]
queque.push(m.id || m.key.id)
setInterval(async function () {
if (queque.indexOf(previousID) === -1) clearInterval(this)
await delay(time)
}, time)
}

if (m.isBaileys)
return
m.exp += Math.ceil(Math.random() * 10)

let usedPrefix
let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
const participants = (m.isGroup ? groupMetadata.participants : []) || []
const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} 
const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} 
const isRAdmin = user?.admin == 'superadmin' || false
const isAdmin = isRAdmin || user?.admin == 'admin' || false 
const isBotAdmin = bot?.admin || false 

const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
for (let name in global.plugins) {
let plugin = global.plugins[name]
if (!plugin)
continue
if (plugin.disabled)
continue
const __filename = join(___dirname, name)
if (typeof plugin.all === 'object') {
try {
await plugin.all.run.call(this, m, {
chatUpdate,
__dirname: ___dirname,
__filename
})
} catch (e) {
console.error(e)
for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
let data = (await conn.onWhatsApp(jid))[0] || {}

if (data.exists)
m.reply(`${lenguajeGB['smsCont1']()}\n\n${lenguajeGB['smsCont2']()}\n*_${name}_*\n\n${lenguajeGB['smsCont3']()}\n*_${m.sender}_*\n\n${lenguajeGB['smsCont4']()}\n*_${m.text}_*\n\n${lenguajeGB['smsCont5']()}\n\`\`\`${format(e)}\`\`\`\n\n${lenguajeGB['smsCont6']()}`.trim(), data.jid)
}}}

if (!opts['restrict'])
if (plugin.tags && plugin.tags.includes('admin')) {
continue
}
const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
let _prefix = plugin.prefix ? plugin.config.prefix : conn.prefix ? conn.prefix : global.prefix
let match = (_prefix instanceof RegExp ? 
[[_prefix.exec(m.text), _prefix]] :
Array.isArray(_prefix) ? 
_prefix.map(p => {
let re = p instanceof RegExp ? 
p :
new RegExp(str2Regex(p))
return [re.exec(m.text), re]
}) :
typeof _prefix === 'string' ? 
[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
[[[], new RegExp]]
).find(p => p[1])

            console.log(match)
if (typeof plugin.before === 'object') {
if (await plugin.before.run.call(this, m, {
match, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, chatUpdate, __dirname: ___dirname, __filename
}))
continue
}
if (typeof plugin !== 'object')
continue
if (!(usedPrefix = "")) {
let noPrefix = m.text.replace(usedPrefix, '')
let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
args = args || []
let _args = noPrefix.trim().split` `.slice(1)
let text = _args.join` `
command = (command || '').toLowerCase()
let fail = plugin.fail || global.dfail 
let isAccept = plugin.config.name instanceof RegExp ? 
plugin.config.name.test(command) :
Array.isArray(plugin.config.name) ? 
plugin.config.name.some(cmd => cmd instanceof RegExp ? 
cmd.test(command) :
cmd === command
) :
typeof plugin.config.name === 'string' ? 
plugin.config.name === command :
false
		

let hl = _prefix 
let adminMode = global.db.data.chats[m.chat].modoadmin
let gata = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugins.command}`
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && gata) return   

if (plugin.config.Auth == 2 && !isOwner) {
fail('owner', m, this)
continue
}
if (plugin.config.Auth == 1) {
    fail('admin', m, this)
    continue
}

m.isCommand = true
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10 // GANANCIAS DE EXP POR COMMANDO 
if (xp > 2000)
m.reply('Exp limit') // LÍMITE DE EXP 
m.exp += xp
if ( plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
this.reply(m.chat, `${lenguajeGB['smsCont7']()} *${usedPrefix}buy*`, m)
continue // LÍMITE DE DIAMANTES
}
if (plugin.level > _user.level) {
this.reply(m.chat, `${lenguajeGB['smsCont9']()} *${plugin.level}* ${lenguajeGB['smsCont10']()} *${_user.level}* ${lenguajeGB['smsCont11']()} *${usedPrefix}nivel*`, m)
continue // LÍMITE DE NIVEL
}
                
let extra = { match, usedPrefix, noPrefix, _args, args, command, text, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, chatUpdate, __dirname: ___dirname, __filename }
try {
await plugin.run.call(this, m, extra)
} catch (e) {
m.error = e
console.error(e)
if (e) {
let text = format(e)
for (let key of Object.values(global.APIKeys))
text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
if (e.name)
for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
let data = (await conn.onWhatsApp(jid))[0] || {}
if (data.exists)
m.reply(`${lenguajeGB['smsCont1']()}\n\n${lenguajeGB['smsCont2']()}\n*_${name}_*\n\n${lenguajeGB['smsCont3']()}\n*_${m.sender}_*\n\n${lenguajeGB['smsCont4']()}\n*_${m.text}_*\n\n${lenguajeGB['smsCont5']()}\n\`\`\`${format(e)}\`\`\`\n\n${lenguajeGB['smsCont6']()}`.trim(), data.jid)
}
m.reply(text)
}} finally {
if (typeof plugin.run.after === 'function') {
try {
await plugin.run.after.call(this, m, extra)
} catch (e) {
console.error(e)
}}
if (m.limit)
m.reply(+m.limit + lenguajeGB.smsCont8())
}
if (m.money)
m.reply(+m.money + ' *GATACOINS USADO(S)* 🐱')
break
}}} catch (e) {
console.error(e)
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
if (quequeIndex !== -1)
this.msgqueque.splice(quequeIndex, 1)
}
let user, stats = global.db.data.stats
if (m) {
if (m.sender && (user = global.db.data.users[m.sender])) {
user.exp += m.exp
user.limit -= m.limit * 1
user.money -= m.money * 1
}

let stat
if (m.plugin) {
let now = +new Date
if (m.plugin in stats) {
stat = stats[m.plugin]
if (!isNumber(stat.total))
stat.total = 1
if (!isNumber(stat.success))
stat.success = m.error != null ? 0 : 1
if (!isNumber(stat.last))
stat.last = now
if (!isNumber(stat.lastSuccess))
stat.lastSuccess = m.error != null ? 0 : now
} else
stat = stats[m.plugin] = {
total: 1,
success: m.error != null ? 0 : 1,
last: now,
lastSuccess: m.error != null ? 0 : now
}
stat.total += 1
stat.last = now

if (m.error == null) {
stat.success += 1
stat.lastSuccess = now
}}}

try {
if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
} catch (e) {
console.log(m, m.quoted, e)
}
let settingsREAD = global.db.data.settings[this.user.jid] || {}  
if (opts['autoread']) await this.readMessages([m.key])
if (settingsREAD.autoread2) await this.readMessages([m.key])  
if (settingsREAD.autoread2 == 'true') await this.readMessages([m.key])    
	    
}}

/**
 * Handle groups participants update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
if (opts['self'])
return
if (this.isInit)
return
if (global.db.data == null)
await loadDatabase()
let chat = global.db.data.chats[id] || {}
let botTt = global.db.data.settings[conn.user.jid] || {}
let text = ''
switch (action) {
case 'add':
case 'remove':
if (chat.welcome) {
let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
for (let user of participants) {
let pp = gataImg.getRandom()
try {
pp = await this.profilePictureUrl(user, 'image')
} catch (e) {
} finally {
let apii = await this.getFile(pp)                                      
const botTt2 = groupMetadata.participants.find(u => this.decodeJid(u.id) == this.user.jid) || {} 
const isBotAdminNn = botTt2?.admin === "admin" || false
text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || '😻 𝗦𝘂𝗽𝗲𝗿 𝙂𝙖𝙩𝙖𝘽𝙤𝙩𝙇𝙞𝙩𝙚-𝙈𝘿 😻') :
(chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
			    
if (chat.antifake && botTt.restrict && isBotAdminNn && action === 'add') {
const numerosPermitidos = ["1", "2", "4", "6", "7", "8", "9"] //PUEDES EDITAR LOS USUARIOS QUE SE ELIMINARÁN SI EMPIEZA POR CUALQUIER DE ESOS NÚMEROS	
if (numerosPermitidos.some(num => user.startsWith(num))) {	
this.sendMessage(id, { text:`*${lenguajeGB['smsAvisoAG']()}${lenguajeGB['smsInt1']()} @${user.split("@")[0]} ${lenguajeGB['smsInt2']()}*`, mentions: [user] }, { quoted: null });          
let responseb = await this.groupParticipantsUpdate(id, [user], 'remove')
if (responseb[0].status === "404") return      
return    
}}    
this.sendFile(id, apii.data, 'pp.jpg', text, null, false, { mentions: [user] }) 
}}}
	     
break
case 'promote':
case 'daradmin':
case 'darpoder':
text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
case 'demote':
case 'quitarpoder':
case 'quitaradmin':
if (!text)
text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
text = text.replace('@user', '@' + participants[0].split('@')[0])
if (chat.detect)
//this.sendMessage(id, { text, mentions: this.parseMention(text) })
break
}}

/**
 * Handle groups update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
if (opts['self'])
return
for (const groupUpdate of groupsUpdate) {
const id = groupUpdate.id
if (!id) continue
let chats = global.db.data.chats[id], text = ''
if (!chats?.detect) continue
//if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
//if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
if (!text) continue
await this.sendMessage(id, { text, mentions: this.parseMention(text) })
}}

export async function callUpdate(callUpdate) {
let isAnticall = global.db.data.settings[this.user.jid].antiCall  
if (!isAnticall) return
for (let nk of callUpdate) { 
if (nk.isGroup == false) {
if (nk.status == "offer") {
let tagUserL = `${nk.from.split('@')[0]}`
let llamadaVideo = nk.isVideo
let callmsg = await this.reply(nk.from, lenguajeGB['smsHandlerLlamar'](tagUserL, llamadaVideo), false, { mentions: [nk.from] })
//let data = global.owner.filter(([id, isCreator]) => id && isCreator)
//await this.sendContact(nk.from, data.map(([id, name]) => [id, name]), false, { quoted: callmsg })
await this.updateBlockStatus(nk.from, 'block')
}}}}

export async function deleteUpdate(message) {
try {
const { fromMe, id, participant } = message
if (fromMe)
return
let msg = this.serializeM(this.loadMessage(id))
if (!msg)
return
let chat = global.db.data.chats[msg.chat] || {}
let userDelete = `${participant.split`@`[0]}`
if (chat.delete) 
return
await this.reply(msg.chat, lenguajeGB['smsAntiEliminar'](userDelete).trim(), msg, {mentions: [participant] })
this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
} catch (e) {
console.error(e)
}}

global.dfail = (type, m, conn) => {
let msg = {
rowner: lenguajeGB['smsRowner'](),
owner: lenguajeGB['smsOwner'](),
mods: lenguajeGB['smsMods'](),
premium: lenguajeGB['smsPremium'](),
group: lenguajeGB['smsGroup'](),
private: lenguajeGB['smsPrivate'](),
admin: lenguajeGB['smsAdmin'](),
botAdmin: lenguajeGB['smsBotAdmin'](),
unreg: lenguajeGB['smsUnreg'](),
restrict: lenguajeGB['smsRestrict'](),
}[type]
let tg = { quoted: m, userJid: conn.user.jid }
let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: msg, contextInfo: { externalAdReply: { title: lenguajeGB.smsAvisoAG().slice(0,-2), body: [wm, '😻 𝗦𝘂𝗽𝗲𝗿 ' + gt + ' 😻', '🌟 centergatabot.gmail.com'].getRandom(), thumbnail: gataImg.getRandom(), sourceUrl: [md, yt, nna, nn, nnn, ig, paypal, fb].getRandom() }}}}, tg)
if (msg) return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

const file = global.__filename(import.meta.url, true);
watchFile(file, async () => {
unwatchFile(file);
console.log(chalk.bold.greenBright(lenguajeGB['smsHandler']()))
if (global.reloadHandler) console.log(await global.reloadHandler());
if (global.conns && global.conns.length > 0 ) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
for (const userr of users) {
userr.subreloadHandler(false)
}}});
