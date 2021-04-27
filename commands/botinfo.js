const moment = require("moment")


const Discord = require ('discord.js')
const db = require ('quick.db');
exports.run = async (client,message,args)=>{
    let usuario = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]) || message.author);
    let exe = await db.fetch(`executados_${client.id}`) 

  
    let embed = new Discord.MessageEmbed()
        .setAuthor(usuario.user.username, message.author.avatarURL)
        .setDescription("Oi! Eu me chamo __**Clécio**__  e fui criado por <@467472722491080724>,<@693208785929371748> Sou apenas um simples bot de administração e moderação para servidores do Discord.\n \nAqui embaixo estão algumas das minhas informaçoes principais:")
        .addField(`__**Servidores:**__`, `\`\`\`js\n${client.guilds.cache.size}\`\`\``, true)
        .addField(`👥__**Membros:**__`, `\`\`\`js\n${client.users.cache.size}\`\`\``, true)
        .addField(`:speech_balloon: __**Canais:**__`, `\`\`\`js\n${client.channels.cache.size}\`\`\``, true)
        .addField(`📡 __**Ping:**__`, `\`${Math.round(client.ws.ping)}ms\``)
        .addField(":notebook_with_decorative_cover: __**Linguagem:**__", `📂 JavaScript`)
        .addField(`💻 __**ID:**__`, `\`\`\`js\n${usuario.user.id}\`\`\``)
        .addField(" __**Prefix:**__", `\`c!\``, true)
        .addField("__*Sabia que?**__",`eu já executei 58${exe} comandos no total.`)
        .addField(":exclamation: __**Suporte:**__", "Servidor de suporte [clique aqui](https://discord.gg/PS6aCfz)")
        .setThumbnail(client.user.avatarURL)
        .setColor("#ffa300")
        .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp()

    message.channel.send(embed)
}