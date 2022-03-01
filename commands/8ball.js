const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => {

const pregunta = args.join(' ')    

 const idioma = await db.fetch(`idioma_${message.guild.id}`)
 if (idioma === null) idioma = 'pt'
         
 const lang = require(`../idioma/${idioma}.json`) 
 
  if (!pregunta) {
  const embed = new Discord.MessageEmbed()
   .setDescription(`${lang.BALL.usage[0]} **${message.author.username}** ${lang.BALL.usage[1]}`)
   .setColor(0x36393e)
  message.channel.send( embed ); 
  return;
}
  var rpts = lang.BALL.ress

  const BallEmbed = new Discord.MessageEmbed()
    .setColor(0x36393e)
    .setThumbnail('https://cdn.discordapp.com/emojis/396446449832951809.gif')
    .setAuthor('8ball', 'https://findicons.com/files/icons/1700/2d/512/8_ball.png')
    .addField(lang.BALL.preg, pregunta)
    .addField(lang.BALL.res, rpts[Math.floor(Math.random() * rpts.length)])
  message.channel.send( BallEmbed );          
}
module.exports.config = {
    name: "ball",
    description: "Pulls the serverinfo of the guild!",
    usage: "!serverinfo",
    accessableby: "Members",
    aliases: ["8ball"]
}