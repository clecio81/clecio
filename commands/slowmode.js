const Discord = module.require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
   const langg = await db.fetch(`idioma_${message.guild.id}`)

if(langg === null) langg = 'pt'

 // else langg = idioma       

 const lang = require(`../idioma/${langg}.json`) 

 if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(lang.per.all);
  if(!args[0]) return message.channel.send("especifique um tempo (1 a 21600 segundos)")
  let duration = args[0]
  message.channel.setRateLimitPerUser(duration)
  .catch(() => {
    message.channel.send("erro ao adicionar o Modo lento(verifique se o tempo não contém letras)")
  })
  message.channel.send("você setou o Modo lento para: " + duration + " segundos!")
}