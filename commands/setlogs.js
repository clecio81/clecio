const fs = require ('fs')
const Discord = require('discord.js')

const db = require ('quick.db')
exports.run = async (bot, message, args) => {
  var idioma = await db.fetch(`idioma_${message.guild.id}`)    
  if(idioma === null) idioma = 'pt'
  const txt = require(`../idioma/${idioma}.json`) 
 if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(txt.per.all);
  var canal = message.mentions.channels.first();
  const o1 = new Discord.MessageEmbed()
  .setTitle('logs:')
  .setDescription(txt.logs.logserro)
  .setColor('RANDOM')
  if (!canal)return message.channel.send(o1);
  
    
  if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.rep(txt.per.all);
  {
      


	const embed = new Discord.MessageEmbed()
  .setTitle('logs!')
		.setDescription(txt.logs.s.replace("{canal}",canal))
		.setColor("RANDOM")
		.setTimestamp()
	message.channel.send({embed})
    

  db.set(`logs_${message.guild.id}`,canal.id)
}

}



