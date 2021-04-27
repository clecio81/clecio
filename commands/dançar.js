var Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    if(!user) return message.reply("você precisa mencionar alguém!");
    let gifs = ['https://i.gifer.com/6CBI.gif'] 
    let random = Math.round(Math.random() * gifs.length);
    let embed = new Discord.RichEmbed()
        .setDescription(`:man_dancing: **<@${message.author.id}>** **dançou com** **<@${user.id}>!**`)
        .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
        .setColor('RANDOM')

    message.delete().catch(O_o=>{})
    message.channel.send(embed);
}

module.exports.help = {
    name: "beijar"
    }