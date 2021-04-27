const Discord = require('discord.js');

const db = require ('quick.db')

const fs = require("fs");

exports.run = async (client, message, args) => {

let idiomas = await db.fetch(`idioma_${message.guild.id}`)   

 if(idiomas === null) idiomas = 'pt';

 const lang = require(`../idioma/${idiomas}.json`) 

 if(!message.member.hasPermission('KICK_MEMBERS'))

   return message.channel.send(`${lang.per.all}`)

  let reason = args.slice(2).join(' ');

  let user = message.mentions.users.first();

  if (message.mentions.users.size < 1) return message.channel.send(lang.aviso.mencionar)

  if (reason.length < 2) return message.channel.send(lang.aviso.motivo)

  let Embed = new Discord.MessageEmbed()

  .setTitle("Aviso")

  .setColor("#00ff00")

  .setDescription(`${user.tag} ${lang.aviso.dm} \`${message.guild.name}\``)

  .addField("avisado por", message.author.tag)

  .addField("Motivo", reason)

  

  let Embed2 = new Discord.MessageEmbed()

  .setTitle("Aviso")

  .setColor("#00ff00")

  .setDescription(`${user.tag}`)

  .addField("avisado por", message.author.tag)

  .addField("Motivo", reason)

  

  

let id = await db.fetch(`logs_${message.guild.id}`)

  const canal = message.guild.channels.cache.find(ch => ch.id === id);  

  if (!canal) return message.channel.send(lang.aviso.logs)

  user.send(Embed);

canal.send(Embed2)

  message.channel.send(lang.aviso.sucesso)

}

