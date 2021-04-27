const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => {
   var langg
 const idioma = await db.fetch(`idioma_${message.guild.id}`)
 if (idioma === null) langg = 'pt'
  else langg = idioma       
 const lang = require(`../idioma/${langg}.json`)
 
 let user   = message.mentions.members.first() ||message.guild.members.fetch(args[0]) || message.author;
     let   avatar = user.displayAvatarURL()
       let embed  = new Discord.MessageEmbed()
            .setDescription(`🖼 **${message.author.username}**\n**[${lang.Dow}](${avatar})**`)
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setColor("#aa00ff")
            message.delete().catch(O_o=>{})
    message.channel.send(embed);
}