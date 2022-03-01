const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')
exports.run = async (client, message, args, config) => {
  let tempo = 86400000;  
  let hora = await db.fetch(`hora_${message.author.id}`);
  if (hora !== null && tempo - (Date.now() - hora) > 0) { 
    let tempos = ms(tempo - (Date.now() - hora)); 
    message.channel.send(`seu trabalho acabou,volte em: **${tempos.hours}h ${tempos.minutes}m ${tempos.seconds}s**!`) 
       } else {
    if (args[0] == 'vendedor') {
        let amount = Math.floor(Math.random() *500) +1;
        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, você vendeu uma geladeira é ganhou ${amount}$`)
        .setColor("RANDOM")
        message.channel.send(embed)
        db.add(`moneys_${message.author.id}`, amount)
    } else if(args[0] == 'construtor') {
        let amount = Math.floor(Math.random() * 500) + 1;
        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, você trabalhou e ganhou ${amount}$ por construir um servidor no **discord**.`)
        .setColor("RANDOM")
        message.channel.send(embed)
        db.add(`moneys_${message.author.id}`, amount)
    } else if(args[0] == 'programador') {
        let amount = Math.floor(Math.random() * 500) + 1;
        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, você trabalhou na **hundgames** como programador e ganhou ${amount}$!`)
        .setColor("RANDOM")
        message.channel.send(embed)
      let user = message.author;
        db.add(`moneys_${message.author.id}`, amount)
        db.set(`hora_${user.id}`, Date.now())
    }
}
};