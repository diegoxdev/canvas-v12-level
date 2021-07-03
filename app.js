const Discord = require('discord.js')
const { join } = require('path')
const { readdirSync } = require('fs')
const fs = require('fs')
const moment = require('moment')
const ms = require('ms')
const mongoose = require("mongoose");

const client = global.Client = new Discord.Client()

//Bot clienti tanımlandı

client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
const talkedRecently = new Map();
//Komut, süre tanımları yapıldı.

const config = require('./src/Bot/config.js')
const emojis = require('./src/Bot/emojis.js')

client.on("ready", () =>{
console.log(`${client.user.username} giriş yaptı!`)
client.user.setPresence({activity:  {type: config.Client.botEylem, name: config.Client.botDurum, status: config.Client.botStatus}}) 
})

//Bot girişinde yapılanlar.


//Config tamamlandı.
if(config.Altyapı.merhaba == "AUJSLWSANHG") {
client.login(config.Bot.token)
}
//Bot giriş yapıldı.




fs.readdir("./src/Events", (err, files) => {
  if (err) return console.error(err);
  files
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      let prop = require(`./src/Events/${file}`);
      if (!prop.conf) return;
      client.on(prop.conf.name, prop);
      console.log(`[Diego - EVENT] ${prop.conf.name} başarıyla yüklendi ve aktif!`);
    });
});
//Event yükleyicisi tamamlandı.

const commandFiles = readdirSync(join(__dirname, "src/Commands")).filter((file) =>
file.endsWith(".js"))
for (const file of commandFiles) {
  const command = require(join(__dirname, "src/Commands", `${file}`))
  client.commands.set(command.name, command)
  console.log(`[Diego - KOMUT] ${command.name} başarıyla yüklendi ve aktif!`);
}
//Komut yükleyicisi tamamlandı.


mongoose.connect(config.Altyapı.mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("[Diego - MONGOOSE] Mongoose bağlantısı başarıyla kuruldu!");
});
mongoose.connection.on("error", () => {
  console.error("[Diego - MONGOOSE] Mongoose bağlantısı malesef kurulamadı!");
});



