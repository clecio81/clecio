const Discord = require('discord.js');

const db = require('quick.db');

const config = require('../config.json');

exports.run = async (client, message, args) => {

             

  const sayMessage = args.join(' ');

const embed = new Discord.MessageEmbed()

  .setTitle('Comando executado por: ${message.author.username}')

  .setColor("#882D61")

  .setDescription('*Eae mano como posso te ajudar ?')

  


}

    

exports.help = {

    name : "Help",

    description: "Te ajuda com os comandos do bot ",

    usage: "help"

  };

