const Discord = require('discord.js')
const config = require('../src/Bot/config.js')
const emojis = require('../src/Bot/emojis.js')

const db = require("../src/Models/level");
const db2 = require("../src/Models/settings");

module.exports = async (message) => {

if(message.author.bot) return;

let member = message.member

const data = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
    const level = data ? data.level : 1;
    const yeni_level_xp = level * 25

if(message.content.length >= 10) {

if (!data || data && data.olanXP < yeni_level_xp) return db.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { toplamXP: 1, olanXP: 1 } }, { upsert: true });


const data2 = await db.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { level: 1 }, $set: { olanXP: 0} }, { upsert: true, new: true });

const rank = await db2.findOne({ guildID: message.guild.id, level: data2.level });
const channel = message.guild.channels.cache.get(db2.channel);

if (rank) {
      await member.roles.add(rank.roles);
      if (channel) {
      channel.send(new Discord.MessageEmbed()
.setAuthor(`Bir kullanıcı seviye atladı!`, message.author.avatarURL({dynamic:true}))
.setColor(config.Altyapı.embedColor)
.setFooter(`diego was here!`,message.client.user.avatarURL({dynamic:true}))
.setDescription(emojis.Bot.evet+` Tebrikler ${member.user.username}! Seviye atladın ve \`${rank.roles.map((x) => message.guild.roles.cache.get(x).name).join(", ")}\` isimli rol(leri) kazandın!`))
  } else {
  	 message.channel.send(new Discord.MessageEmbed()
.setAuthor(`Bir kullanıcı seviye atladı!`, message.author.avatarURL({dynamic:true}))
.setColor(config.Altyapı.embedColor)
.setFooter(`diego was here!`,message.client.user.avatarURL({dynamic:true}))
.setDescription(emojis.Bot.evet+` Tebrikler ${member.user.username}! Seviye atladın ve \`${rank.roles.map((x) => message.guild.roles.cache.get(x).name).join(", ")}\` isimli rol(leri) kazandın!`))
  }
}
if(channel) {
	channel.send(new Discord.MessageEmbed()
.setAuthor(`Bir kullanıcı seviye atladı!`, message.author.avatarURL({dynamic:true}))
.setColor(config.Altyapı.embedColor)
.setFooter(`diego was here!`,message.client.user.avatarURL({dynamic:true}))
.setDescription(emojis.Bot.evet+` Tebrikler ${member.user.username}! Seviye atladın! Yeni seviyeniz: \`${data2.level}\``))
} else {
message.channel.send(new Discord.MessageEmbed()
.setAuthor(`Bir kullanıcı seviye atladı!`, message.author.avatarURL({dynamic:true}))
.setColor(config.Altyapı.embedColor)
.setFooter(`diego was here!`,message.client.user.avatarURL({dynamic:true}))
.setDescription(emojis.Bot.evet+` Tebrikler ${member.user.username}! Seviye atladın! Yeni seviyeniz: \`${data2.level}\``))
}
}

};

module.exports.conf = {
  name: "message",
};
