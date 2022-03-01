const Discord = require('discord.js');
const client = new Discord.Client();
module.exports.run = (client, message, args) => {

    let motivo = args.slice(0).join(' ');
    if (motivo.length < 1) return message.reply('digite o nick de algum jogador Premium.');
      
    let embed = new Discord.MessageEmbed()
    
    .setTitle(`🔰 Informações sobre **${args[0]}**`)
    .setColor("#0051FF")
    .setImage(`https://mc-heads.net/body/${args[0]}`)
    .addField('faça o download', `**[ clicando aqui](https://mc-heads.net/download/${args[0]})**`)
    .setFooter(`Comando solicitado por: ${message.author.tag}`, `${message.author.avatarURL}`)
    .setTimestamp(new Date())
    message.channel.send(embed)
};

module.exports.help = module.exports.help = {
    name: "mcskin"
}
