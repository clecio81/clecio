const Discord = require("discord.js")
const Jimp = require("jimp")
const fs = require("fs")
exports.run = async (client,message,args) => {
var porcentagem = 0
var aleatorio = Math.round(Math.random() * 100)
porcentagem = aleatorio
let user1 = message.mentions.users.first() || message.author
let user2 = message.mentions.users.array()[1]
if(!user2) return message.reply("você não mencionou ninguem")
  let avatar1 = await Jimp.read(user1.displayAvatarURL({ format: `png` }))
  let avatar2 = await Jimp.read(user2.displayAvatarURL({ format: `png` }))
  await avatar1.resize(115, 115)
  await avatar1.resize(115, 115)
  let gif = await Jimp.read("https://cdn.discordapp.com/attachments/486016051851689994/509883077707694100/ships.png")
  await gif.composite(avatar1, 1, 1)
  await gif.composite(avatar2, 229, 1)
  .write(`./img/${user1.id}${user2.id}.png`)
let array = new Array ()
 array[1] = "Msg 1"
 array[2] = "Msg 2"
var i = Math.floor(2*Math.random())
var mensagem = porcentagem <= 5 ? `**${porcentagem}% [████...] Não mesmo 😥**` : porcentagem <= 10 ? `**${porcentagem}% [████...] Um dia talvez! 🤔**` : porcentagem <= 50 ? `**${porcentagem}% [█████....] Eles são perfeitos! 😍**` : porcentagem <= 70 ? `**${porcentagem}% [█████....] Já deveriam estar casados! 💍**` : porcentagem <= 100 ? `**${porcentagem}% [█████████.] Casal perfeito, Ninguem os separa! 💍**` : ``

message.channel.send({
  
    embed: {
    "fields": [
      {
        "name": `:sparkling_heart: Hmmm, será que nós temos um novo casal aqui? :sparkling_heart:`,
        "value": `**_${user1}\n${user2}_** ${mensagem}`
      }],
        "color": 0xff88de,
    image: {
         url: 'attachment://file.jpg'
      }
   },
   files: [{
      attachment: "./img/" + user1.id + user2.id + ".png",
      name: 'file.jpg'
   }]
})
                  setTimeout(function() {      
                    fs.unlink(`./img/${user1.id}${user2.id}.png`)
                  }, 2000)
}         
module.exports.config = {
    name: "ship",
    description: "Pulls the serverinfo of the guild!",
    usage: "!serverinfo",
    accessableby: "Members",
    aliases: ["shipar"]
}