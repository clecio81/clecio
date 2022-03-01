 var Discord = require('discord.js')
const moment = require("moment")
moment.locale("pt-BR")
exports.run = (client, message, args) => {
        let channel = message.mentions.channels.first() || message.channel;
    
        var embed = new Discord.MessageEmbed()
            .setTitle(`Informações do canal:`)
            .addField(":pen_ballpoint: __**Nome:**__", `\`\`\`${channel.name}\`\`\``, true)
            .addField(":desktop: __**ID:**__", `\`\`\`${channel.id}\`\`\``, true)
            .addField(":clock4: __**Criado em:**__", `\`\`\`${moment(channel.createdAt).format("LLLL")}\`\`\``, true)
            .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
            .setColor("5dadec")
            .setTimestamp()
            
        message.channel.send(embed)
        message.delete().catch(O_o=>{})
}