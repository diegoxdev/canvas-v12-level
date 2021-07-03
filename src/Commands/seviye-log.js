const { MessageEmbed } = require('discord.js')
const config = require('../src/Bot/config.js')
const emojis = require('../src/Bot/emojis.js')

const db = require("../src/Models/settings");

const code = require("@codedipper/random-code")

module.exports = {
name: "seviye-log",
aliases: ["level-role"],
category: "seviye",
usage: "",
cooldown: 10, 
description: "Bir kullanıcı seviye atladığı zaman o kanala mesaj atılır (zorunlu değildir)!",
async execute(client, message, args) {

var prefix = config.Bot.botPrefix
  var hayır = emojis.Bot.hayır
  var evet = emojis.Bot.evet  


if(args[0] == 'sıfırla') {

    const data = await db.findOne({ guildID: message.guild.id});
    let kanalw = data ? data.channel : null
    if (!kanalw) return message.channel.send(hayır+ ` **Seviye Log** zaten ayarlanmamış!`);
    await db.findOneAndUpdate({guildID: message.guild.id}, {$set: {channel: null}}, {upsert:true})
    message.channel.send(evet+` **Seviye Log** başarıyla sıfırlandı!`);
    return
  }

let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])

if (!kanal) return message.channel.send(hayır+ " **Seviye Log**'un hangi kanala ayarlanacağını seçmelisin");
    const data = await db.findOne({ guildID: message.guild.id });
    if (data.channel) return message.channel.send(hayır+ `  **Seviye Log** zaten ayarlanmış!\n\n<#${data.channel}>`);
    await db.findOneAndUpdate({guildID: message.guild.id}, {$set: {channel: kanal.id}}, {upsert:true})
    message.channel.send(evet+` **Seviye Log** kanalı \`${kanal.name}\` olarak ayarlandı!`);


}
}
