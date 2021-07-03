const { MessageEmbed } = require('discord.js')
const config = require('../src/Bot/config.js')
const emojis = require('../src/Bot/emojis.js')

const db = require("../src/Models/settings");

const code = require("@codedipper/random-code")

module.exports = {
name: "seviye-rol",
aliases: ["level-role"],
category: "seviye",
usage: "",
cooldown: 10, 
description: "Bir kullanıcı seviye atladığı zaman o kullanıcıya ayarlanan rol verilir (zorunlu değildir)!",
async execute(client, message, args) {

var prefix = config.Bot.botPrefix
  var hayır = emojis.Bot.hayır
  var evet = emojis.Bot.evet  


if(args[0] == 'sıfırla') {
	if (!args[1]) return message.channel.send(hayır+ " Kaçıncı leveldeki rollerin sıfırlanacağını belirtmelisin!");
    const data = await db.findOne({ guildID: message.guild.id, level: args[1] });
    if (!data) return message.channel.send(hayır+ ` **${args[1]}.** levelde verilecek rol(ler) bulunmuyor!`);
    await db.deleteOne({ guildID: message.guild.id, level: args[1] });
    message.channel.send(evet+` **${args[1]}.** levelde verilecek roller sıfırlandı!`);
    return
  }


if (!args[0]) return message.channel.send(hayır+ " Rol(lerin) kaçıncı levelde verileceğini belirtmelisin!");
    const roles = message.mentions.roles.array();
    if (!roles.length) return message.channel.send(hayır+` **${args[0]}.** levelde verilecek rol(leri) belirtmelisin!`);
    const data = await db.findOne({ guildID: message.guild.id, level: args[0] });
    if (data) return message.channel.send(hayır+ ` **${args[0]}.** levelde verilecek roller zaten ayarlanmış! \n\n${data.roles.map((x) => `${x.name}`).join(", ")}`);
    await new db({ guildID: message.guild.id, level: args[0], roles }).save();
    message.channel.send(evet+` **${args[0]}.** levelde verilecek roller \`${roles.map((x) => x.name).join(", ")}\` olarak ayarlandı!`);


}
}
