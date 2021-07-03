const { MessageEmbed } = require('discord.js')
const config = require('../src/Bot/config.js')
const emojis = require('../src/Bot/emojis.js')


module.exports = {
name: "yardım",
aliases: ["help"],
category: "",
usage: "",
cooldown: 10, 
description: "Klasik yardım komutu!",
async execute(client, message, args) {

var prefix = config.Bot.prefix
  var hayır = emojis.Bot.hayır
  var evet = emojis.Bot.evet  

let embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
.setFooter("diego was here!", client.user.avatarURL())
.setColor(config.Altyapı.embedColor)

    message.channel.send(embed.setDescription(client.commands.filter((x) => x.name).sort((a, b) => b.name - a.name).map((x) => `**Komut adı :** \`${prefix}${x.name}\`
    	**Komut Açıklaması :** \`${x.description || "Komut açıklaması bulunmamakta"}\` 
    	**Diğer Kullanımlar :** \`${x.aliases || 'Ek kullanım bulunmamakta'}\` `).join("\n\n")));

}
}
