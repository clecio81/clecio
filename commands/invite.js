const Discord = require('discord.js');
const moment = require("moment");
moment.locale("pt-BR")

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setDescription(`**gostou das minhas funções? que tal me adicionar no seu servidor?**\n\n[clique aqui](https://discordapp.com/oauth2/authorize?client_id=695760577485733910&permissions=8&scope=bot) para me adicionar`)
        .setThumbnail(message.author.avatarURL)
        .setColor("#ffffff")
        .setFooter(`${message.author.tag}`)
      message.delete().catch(O_o=>{})
     message.channel.send({embed});
};