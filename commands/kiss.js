const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')     
exports.run = async (client, message, args) => {
 var member = message.mentions.users.first() || message.guild.members.cache.get(args.join(' ')) 
 
 var langg

 const idioma = await db.fetch(`idioma_${message.guild.id}`)

 if (idioma === null) idioma = 'pt'

  else langg = idioma       

 const lang = require(`../idioma/${langg}.json`) 
    let user = message.mentions.users.first();
    if(!user) return message.reply(`${lang.beijo.sem}`);
    let gifs = ['https://images-ext-2.discordapp.net/external/TFZBcR0N4aUWtVvLKZlQrWtllkOG2kPAUprtnqIqK8Q/%3Fwidth%3D400%26height%3D225/https/media.discordapp.net/attachments/495603769317261312/497213957191237633/giphy_3.gif'] 
    let random = Math.round(Math.random() * gifs.length);
    let embed = new Discord.MessageEmbed()
        .setDescription(`:couplekiss: **<@${message.author.id}>** **${lang.beijo.beijou}** **<@${user.id}>!**`)
        .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
        .setColor('RANDOM')
        

    message.delete().catch(O_o=>{})
    message.channel.send(embed);
}

module.exports.help = {
    name: "beijar"
}