 const db = require('quick.db')
const Discord = require ('discord.js')
exports.run = async (client, message, args) => {
 let idiomas = await db.fetch(`idioma_${message.guild.id}`)   
 if(idiomas === null) idiomas = 'pt';
 const lang = require(`../idioma/${idiomas}.json`) 
 if(!message.member.hasPermission('KICK_MEMBERS'))
   return message.channel.send(`${lang.per.all}`)
 let erro = new Discord.MessageEmbed()
 .setTitle(lang.idioma.idiomaerro2)
 .setDescription(`${lang.idioma.idiomapergunta} \nen 🇺🇲\nes 🇪🇸\npt 🇧🇷 `)
 .setTimestamp()
 if (!['en', 'es', 'pt'].includes(args[0])) {
   return message.channel.send(erro)
  
 } else {
   let idiomas = await db.fetch(`idioma_${message.guild.id}`)   
 if(idiomas === null) idiomas = 'pt';
   const lang = require(`../idioma/${idiomas}.json`) 
   let texto = args[0]
   if(texto === 'en') texto = 'Language changed to **English** <:lang:763486370295316480>';
   if(texto === 'pt') texto = 'Idioma alterado para **Português** <:lang:763486370295316480>';
   if(texto === 'es') texto = 'Idioma cambiado a **Espanol** <:lang:763486370295316480>';
   let up = new Discord.MessageEmbed()
 .setDescription(`${texto}`)
   .setTimestamp()
 message.channel.send(up)
   db.set(`idioma_${message.guild.id}`,args[0])
 }
}