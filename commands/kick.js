const Discord = require("discord.js")
const moment = require("moment")
const  db = require ('quick.db')
moment.locale("pt-br")
const fs = require("fs");
exports.run = async (client, message, args) => {
  let id = await db.fetch(`logs_${message.guild.id}`)

  const canal = message.guild.channels.cache.find(ch => ch.id === id);  
  if (!canal) return message.channel.send("não consigo achar o canal onde irei anunciar as punição do servidor,**utilize c!setlogs ``<nome do canal>`` para que eu possa anunciar**");

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
  if(!kUser) return message.channel.send("Quem você quer expulsar?");
  let kReason = args.join(" ").slice(22);
 let idiomas = await db.fetch(`idioma_${message.guild.id}`)   

 if(idiomas === null) idiomas = 'pt';

 const lang = require(`../idioma/${idiomas}.json`) 

 if(!message.member.hasPermission('KICK_MEMBERS'))

   return message.channel.send(`${lang.per.all}`)
  if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("não tenho permissão para isso,o usuário pode ter o cargo mais alto que o meu")
  if (!kReason){kReason = "o motivo não foi informado"}
  let embed = new Discord.MessageEmbed()
  .setDescription("Kick")
  .setColor("#7289DA")
  .addField("Kicked ", `${kUser} ID ${kUser.id}`)
  .addField("Kickado por", `<@${message.author.id}>  ID ${message.author.id}`)
  .addField("Kickado em", message.channel)
  .addField("Hora", `${moment(message.guild.cratedAt).format('LLLL')}`)
  .addField("Motivo ", kReason)
  message.guild.member(kUser).kick(kReason)
    message.channel.send("usuário chutado com sucesso")
  canal.send(embed)
  }

 

  