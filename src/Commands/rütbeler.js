const { MessageEmbed, MessageAttachment } = require('discord.js')
const config = require('../src/Bot/config.js')
const emojis = require('../src/Bot/emojis.js')
const db = require("../src/Models/settings");


module.exports = {
name: "rütbeler",
aliases: ["ranks"],
category: "seviye",
usage: "",
cooldown: 10, 
description: "Sunucuda ayarlanmış tüm seviye rol rütbelerini gösterir!",
async execute(client, message, args) {

var prefix = config.Bot.botPrefix
  var hayır = emojis.Bot.hayır
  var evet = emojis.Bot.evet  
let data = await db.find({ guildID: message.guild.id })

const all = await db.find().sort({ level: "descending" });
let diego = all.sort((a, b) => b.level - a.level).map((a, i) => `\`${i +1}.\` ${a.roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => `<@&${role.id}>`).join(", "))} rol(leri) **\`${a.level}.\` seviyede alınabilecektir!**`).slice(0, 15).join('\n')
    

let embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
.setColor(config.Altyapı.embedColor)
.setFooter("diego was here!",client.user.avatarURL())
.setDescription(`${diego || ""+hayır+" Hiç bir **seviye rol** verisi bulunamadı!"}`)

message.channel.send(embed)




}
}
