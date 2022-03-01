const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args, config) => {
    if (args[0] == 'balance') {
        let amount = Math.floor(Math.random() * 50000000000000) + 1; // 1-500 random number. whatever you'd like
        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, saldo do banco ${amount}$ ||que tal c!banco rob? 😋||`)
        .setColor("RANDOM")
        message.channel.send(embed)
      message.delete()
    } else if(args[0] == 'rob') {
        let dinheiro = Math.floor(Math.random() * 5000) + 1; // 1-500 random number. whatever you'd like
let muterole = message.guild.roles.find(`name`, "procurado");
  if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "procurado",
                color: "#ff0000",
            })
        let embed = new Discord.RichEmbed()
        .setAuthor("🕵️ anonymous 🕵️") 
        .setDescription(`** anônimo**,silêncio você roubou ${dinheiro}$ do banco secretamente,seu nome nem seus dados não serão informados a ninguém!`)
        .setColor("RANDOM")      essage.channel.send(embed)

          var user = message.mentions.users.first();
    if (!user) user = message.author;    aawait (user.addRole(muterole.id));      message.delete()
            } catch (e) { 
    return console.log(e)
            }
    }
}
}    }