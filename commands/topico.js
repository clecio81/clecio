const Discord = require("discord.js")
exports.run = async (client, message, args) => {

  if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("sem permissão")
let topico = args.join(" ")
if(!topico) return message.channel.send('você não definiu nenhum topico')
let canal = message.mentions.channels.first() || message.channel
message.delete()
canal.setTopic(topico).then(() => {

    message.channel.send({
        embed: {
            title: "Novo topico de canal definido",
            description: `O topico do canal: ${canal.name} foi definido para: ${topico}`
          
        }
    })
})
}