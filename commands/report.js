const {MessageEmbed} = require("discord.js")
const moment = require("moment")
const fs = require ('fs')
moment.locale("pt-br")
exports.run = async (client, message, args) => {
  let giriscikis = JSON.parse(fs.readFileSync("./cargo/cargos.json", "utf8"));  
  if (!giriscikis[message.guild.id].kanal) {
    return;
  }
  try {
    let giriscikiskanalID = giriscikis[message.guild.id].kanal;
    let giriscikiskanali = client.guilds.cache.get(message.guild.id).channels.get(giriscikiskanalID);
  let canal = message.guild.channels.cache.get(giriscikiskanalID)
  if (!canal) return message.channel.send("não consigo achar o canal onde irei anunciar as punição do servidor,**utilize c!setlogs ``<nome do canal>`` para que eu possa anunciar**");
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
  if (!rUser) return message.channel.send("você precisa mencionar um usuário.");
  let reason = args.join(" ").slice(22);
  let embed = new MessageEmbed()
  .setDescription("Reports")
  .setColor("#7289DA")
  .addField("Usuários reportado ", `${rUser} ID: ${rUser.id}`)
  .addField("Reportado por", `${message.author} ID: ${message.author.id}`)
  .addField ("No canal", message.channel)
  .addField ("Horário",`${moment(message.guild.createdAt).format('LLLL')}`)
  .addField ("Motivo", reason)
 giriscikiskanali.send(embed);
    message.delete()
  return;
  } catch (e) { 
    return console.log(e)
  }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['r'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'report',
    description: 'Gives you a random response to a question.',
    usage: '8ball [question]'
}};
  