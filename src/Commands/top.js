const { MessageEmbed, MessageAttachment } = require('discord.js')
const config = require('../src/Bot/config.js')
const emojis = require('../src/Bot/emojis.js')
const db = require("../src/Models/level");

const { selam_ben_diego } = require('../src/Functions/levelFunction.js')

module.exports = {
name: "top",
aliases: ["seviye-top"],
category: "seviye",
usage: "",
cooldown: 10, 
description: "Sunucuda bulunan en yüksek seviyeli kullanıcıları listeler",
async execute(client, message, args) {

var prefix = config.Bot.botPrefix
  var hayır = emojis.Bot.hayır
  var evet = emojis.Bot.evet  


 let levelData = await db.find({ guildID: message.guild.id }).sort({ level: -1 }).exec();  
    levelData = levelData.filter(x => message.guild.members.cache.get(x.userID)).slice(0, 25).map((x, i) => `\`${i+1}.\` <@${x.userID}> : **${x.level}** Level`).join("\n") || 'Hiç bir XP kaydı bulunmamakta!'


let embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
.setColor(config.Altyapı.embedColor)
.setFooter(`diego was here!`,client.user.avatarURL({dynamic:true}))
.setDescription(`${levelData}`)
message.channel.send(embed)

}
}
