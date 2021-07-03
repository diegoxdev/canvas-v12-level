const Discord = require('discord.js')
const config = require('../src/Bot/config.js')
const emojis = require('../src/Bot/emojis.js')


module.exports = async (message) => {

const client = message.client

const cooldowns = new Discord.Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
const talkedRecently = new Map();

 if(message.author.bot) return;
  if(!message.guild) return;

  const prefixRegex = new RegExp(`^(<@${message.client.user.id}> |${escapeRegex(config.Bot.botPrefix)})\\s*`)

if(!prefixRegex.test(message.content)) return;

const [, matchedPrefix] = message.content.match(prefixRegex)

const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)

const commandName = args.shift().toLowerCase()

const command =
client.commands.get(commandName) ||
client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))

if(!command) return;

if(!cooldowns.has(command.name)) {
  cooldowns.set(command.name, new Discord.Collection())
}

const now = Date.now();
const timestamps = cooldowns.get(command.name)
const cooldownAmount = (command.cooldown || 1) * 1000;


if(timestamps.has(message.author.id)) {
  const expirationTime = timestamps.get(message.author.id) + cooldownAmount

if(now < expirationTime) {
  const timeLeft = (expirationTime - now) / 1000
  return message.channel.send(`:timer: ${message.author}, **${command.name}** isimli komutu kullanabilmek için **${timeLeft.toFixed(1)}** saniye bekle!`).then(diego => diego.delete({timeout: expirationTime - now}))
}
}

timestamps.set(message.author.id, now)
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

try{
command.execute(client, message, args)
} catch (error) {
  console.log(error)
  message.channel.send(`${emojis.Bot.hayır} Bir hata oluştu! Bunu geliştiricilere gönderiniz!\n${error}`).catch(console.error)
}


};

module.exports.conf = {
  name: "message",
};
