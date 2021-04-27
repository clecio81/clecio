var Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    if(!user) return message.reply("você precisa mencionar alguém para beijar!");
    let gifs = ['https://pa1.narvii.com/6757/0c6c5e9fff76e3533ef017ad64559999b2753a75_hq.gif'] 
    let random = Math.round(Math.random() * gifs.length);
    let embed = new Discord.RichEmbed()
        .setDescription(`☺️ **<@${message.author.id}>** **fez cafuné em** **<@${user.id}>!**`)
        .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
        .setColor('RANDOM')
        .setFooter(`Clique em 🔁 para retribuir!`)

    message.delete().catch(O_o=>{})
    message.channel.send(embed);
}

module.exports.help = {
    name: "beijar"
}