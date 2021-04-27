const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) =>{
  var id = await db.fetch(`idioma_${message.guild.id}`)   
  if(id === null) id = 'pt';
  const idio = require(`../idioma/${id}.json`) 
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(idio.per.all);
  let texto = args.join(' ')
  let prefixo = await db.fetch(`prefixos_${message.guild.id}`)
  if(prefixo === null) prefixo = 'c!';
  const gg = new Discord.MessageEmbed()
  .setTitle('**configuração de prefixo**')
  .setDescription(`**utilise: ${prefixo}prefixo** <e o prefixo que você deseja colocar`)
  .setTimestamp()
  if(!texto){
    return message.channel.send(gg)
  } else{
    db.set(`prefixos_${message.guild.id}`,args[0])
    const cl = new Discord.MessageEmbed()
    .setTitle(`**prefixo atualizado**`)
    .setDescription(`${idio.prefix.prefixUpdate} **${texto}**`)
    .setAuthor(message.guild.name)
    .addField('administrador:',`**${message.author.tag}**`)
    .setTimestamp()
    if(texto) return message.channel.send(cl)
  }
}
