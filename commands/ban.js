const Discord = require("discord.js");
const fs = require("fs");
const db  =require ('quick.db')
exports.run =async  (bot,message,args) => {

  let id = await db.fetch(`logs_${message.guild.id}`)
  const idioma = await db.fetch(`idioma_${message.guild.id}`)
 if (idioma === null) idioma = 'pt'
         
 const lang = require(`../idioma/${idioma}.json`) 
 

  const canal = message.guild.channels.cache.find(ch => ch.id === id);  
  if (!canal) return message.channel.send(lang.logs.logserro)
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(lang.per.all)
      if(args.length === 0) return message.reply(lang.mencionar)
    let usuario = message.mentions.users.first() || message.guild.members.fetch(args[0]);
    if(!usuario) return message.reply("Não foi possível encontrar este usuário!");
    let motivo = args.join(" ").slice(22) || args.slice(1).join(" ");
    if(! motivo)
        motivo = "O motivo não informado"
     
  

    
const member = message.guild.member(usuario);
      if (member) {
        member
          .ban({
            reason: motivo
          })
          .then(() => {
            message.reply(lang.ban.s.replace("{user}}",usuario.username)
          )
          .catch(error => message.channel.send(lang.ban.botnao))
         console.log(lang.Error)
        
                })
        }

  }
   