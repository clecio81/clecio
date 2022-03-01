const Discord = require("discord.js")
const {join} = require('path')
const {readdirSync} = require('fs')

module.exports.run = async (bot, message, args) => {
  
  this.bot = bot;
      if (message.author.id !== "693208785929371748")
        
    return message.channel.send(`só desenvolvedores do bot pode usar este comando`)
  
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor("RED").addField("Error:", 'Escreva o nome do Comando para reiniciar !'))     
    
    let commands = args[0].toLowerCase()

    try {
        delete require.cache.get[require.resolve(`./${commands}.js`)] // usage !reload <name>
        bot.commands.delete(commands)
        const pull = require(`./${commands}.js`)
        bot.commands.set(commands, pull)
    } catch(e) {
        return message.channel.send(` O pacote \`${args[0].toLowerCase()}\`.js não pôde ser reiniciado.`)
    }

    message.channel.send(`O pacote \`${args[0].toLowerCase()}\`.js foi reiniciado com sucesso !`)                     
}

exports.config = {
    name: 'reload',
    aliases: ['reiniciar', 'restart'],
    usage: "reload",
    desc: 'Reinicie comandos pelo Discord.'
}