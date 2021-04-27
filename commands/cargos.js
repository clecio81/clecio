const Discord = require('discord.js');

exports.run = (bot, message, params) => {
  message.delete().catch(O_o=>{})
   const embed = new Discord.MessageEmbed()
   .setColor("RANDOM")
   .setAuthor(message.guild.name, message.guild.userURL)
   .setThumbnail(message.guild.iconURL())
   .addField(':bust_in_silhouette:cargo para mencionar todos do servidor:', message.guild.defaultRole, true)
   .addField(':busts_in_silhouette:cargos:', message.guild.roles.cache.map(role => role.name).join(', '), true)
   .setFooter('cargos', message.guild.iconURL())
   .setTimestamp()
   message.channel.send({embed});
   
 };
 