const { MessageEmbed, MessageAttachment } = require('discord.js')
const config = require('../src/Bot/config.js')
const emojis = require('../src/Bot/emojis.js')
const { createCanvas, loadImage } = require('canvas')
const { join } = require('path')
const db = require("../src/Models/level");
const { selam_ben_diego } = require('../src/Functions/levelFunction.js')


module.exports = {
name: "seviye",
aliases: ["level", "xp", "exp", "rank"],
category: "seviye",
usage: "",
cooldown: 10, 
description: "Bir kullanıcının seviyesini gösterir!",
async execute(client, message, args) {

var prefix = config.Bot.botPrefix
  var hayır = emojis.Bot.hayır
  var evet = emojis.Bot.evet  


let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

if(member.user.bot) return message.channel.send(hayır+" Bir botun seviyesinin olabileceğini mi zannediyorsun?")


const userData = await db.findOne({ guildID: message.guild.id, userID: member.user.id });
    const level = userData ? userData.level : 1;
    const xp = userData ? userData.olanXP : 0;
    const tlevel = userData ? userData.toplamXP : 0;
    const nextLevelXP = level * 25;
    const data = await db.find({ guildID: message.guild.id }).sort({ toplamXP: -1 });
    const rank = data.map((x) => x.userID).indexOf(member.user.id) + 1;

const canvas = createCanvas(1000, 333)
const ctx = canvas.getContext("2d")
const background = await loadImage(join(__dirname, "..", "src", "Images", "background.jpg"))
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.lineWidth = 4;
ctx.strokeStyle = "#ffffff";
ctx.globalAlpha = 0.2;
ctx.fillStyle = "#000000";
ctx.fillRect(180, 216, 775, 65);
ctx.fill()
ctx.globalAlpha = 1;
ctx.strokeRect(180, 216, 775, 65);
ctx.stroke();

ctx.fillStyle = "#e67e22";
ctx.globalAlpha = 0.6;
ctx.fillRect(180, 216, ((100 / (1 * 40)) * 2) * 7.7, 65);
ctx.fill();
ctx.globalAlpha = 1;

 ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#A3A3A3"
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000"
        ctx.fillRect(180, 216, 775, 65);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeRect(180, 216, 775, 65);
        ctx.stroke();

        ctx.fillStyle = "#838383";
        ctx.globalAlpha = 0.6;
        ctx.fillRect(200, 216, ((100 / (nextLevelXP)) * xp) * 7.5, 65);
        ctx.fill();
        ctx.globalAlpha = 1;

ctx.font = "30px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "#ffffff"
ctx.fillText(`${xp} / ${nextLevelXP} XP`, 600, 260);

ctx.textAlign = "left";
ctx.fillText(member.user.tag, 310, 120);
ctx.font = "45px Arial";
ctx.fillText("LEVEL:", 312, 180);
ctx.fillText(""+level+"", 500, 180);

ctx.textAlign = "left";
ctx.font = "45px Arial";
ctx.fillText("RANK:", 700, 180);
ctx.fillText(""+rank+"", 880, 180);

ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
ctx.lineWidth = 6;
ctx.strokeStyle = "#ffffff";
ctx.stroke();
ctx.closePath();
ctx.clip();



const avatar = await loadImage(member.user.displayAvatarURL({format: "jpg"}))

ctx.drawImage(avatar, 40, 40, 250, 250);

const attachment = new MessageAttachment(canvas.toBuffer(), "diego-rank.png")

setTimeout(() => {
message.channel.send(attachment)

}, 2000)


}
}
