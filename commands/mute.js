const Discord = require("discord.js");
const ms = require("ms");
const db = require ('quick.db')
module.exports.run = async (bot, message, args) => {
  let idiomas = await db.fetch(`idioma_${message.guild.id}`)   

 if(idiomas === null) idiomas = 'pt';

 const lang = require(`../idioma/${idiomas}.json`) 

 if(!message.member.hasPermission('KICK_MEMBERS'))

   return message.channel.send(`${lang.per.all}`)
let id = await db.fetch(`logs_${message.guild.id}`)

  const canal = message.guild.channels.cache.find(ch => ch.id === id);  

  if (!canal) return message.channel.send(lang.aviso.logs)

    let perm = new Discord.MessageEmbed()
        .setDescription("| Você não tem permissão para usar esse comando.")
        .setColor("0xe80005")
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(perm)
    const mod = message.author;
                                                    
 let user   = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
 
    let infocmd = new Discord.MessageEmbed()
        .setTitle(":white_check_mark: Comando: mute")
        .addField(":no_entry_sign: Uso:", "**c!mute** `<@user>` `<motivo>`")
        .addField ("⏰ mute por tempo","use **c!tempmute** `<@user>` `<tempo>`")
        .addField(":page_facing_up:  Exemplo:", "c!mute @User#1234 Spawn")
        .setColor("0xe80005")
        .setFooter("Informações do comando: \"mute\"")
    if (!user) return message.channel.send(infocmd)
    let reason = message.content.split(" ").slice(2).join(" ");
    let msgreason = new Discord.MessageEmbed()
        .setDescription("Especifique um motivo para poder mutar.")
        .setColor("0xe80005")
    if (!reason) return message.channel.send(msgreason)
    let role = message.guild.roles.cache.find((x) => x.name === "muted");

    if (!role)

      role = await message.guild.roles

        .create({ data: { name: "Muted", color: "#ff0000" } })
.then((x) => {

          message.guild.channels.cache.forEach((f) => {
            

            f.createOverwrite(x.id, {

              SEND_MESSAGES: false,

              ADD_REACTIONS: false,

              SPEAK: false,

              STREAM: false,

            });

          });
        });


  await  user.roles.add(role)
    const muteembed = new Discord.MessageEmbed()
            .setAuthor(' ação| Mute', `https://images-ext-2.discordapp.net/external/Wms63jAyNOxNHtfUpS1EpRAQer2UT0nOsFaWlnDdR3M/https/image.flaticon.com/icons/png/128/148/148757.png`)
            .addField('usuário', `<@${user.id}>`)
            .addField('motivo', `${reason}`)
            .addField('executor', `${mod}`)
            .setColor('BLACK')
    message.channel.send("usuário silenciado com sucesso")
       canal.send(muteembed)
  
  
  
}
                                                    



exports.conf = {
    aliases: [],
    permLevel: 2
};

module.exports.help = {
    name: "mute",
    category: "MODERATION",
}