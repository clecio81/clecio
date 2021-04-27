const Discord = require('discord.js'); // puxando a livraria 'discord.js'
const weather = require('weather-js'); // puxando o NPM 'weather-js' (instale utilizando: npm i weather-js)
const db = require ('quick.db');
exports.run = async (client, message, args) => { 
  let prefix = await db.fetch(`prefixos_${message.guild.id}`)
    weather.find({ 
        search: args, 
        degreeType: 'C' // o detalhe setado: C de Graus Celcius
    }, function (err, result) { // caso ache um erro
        if (err) console.log(err); // enviaremos no console
        // caso o membro não escreva a cidade
        if (!result) return message.reply(`tente usar \`${prefix} clima <nome da cidade/estado\``)
        // caso o bot não encontre a cidade
        if (!result[0]) return message.reply(`desculpe, mas não encontrei essa cidade!`)
        let embed = new Discord.MessageEmbed()
            .setDescription(`**${result[0].location.name}**`)
            .addField(`**Temperatura**`, `${result[0].current.temperature}°C`)
            .addField(`**Sensação Térmica**`, `${result[0].current.feelslike}°C`)
            .addField(`**Umidade**`, `${result[0].current.humidity}%`)
            .addField(`**Vento**`, `${result[0].current.windspeed}`)
            .setColor("RANDOM")
            .setImage(result[0].current.imageUrl)

        message.channel.send(embed)

    });
};

exports.help = { 
    name: `clima`
};
