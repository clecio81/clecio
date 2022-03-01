var Discord = require('discord.js')
const db = require ('quick.db')
module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    if(!user) return message.reply("você precisa mencionar alguém paradar uma tapa!");
    let gifs = ['https://i.pinimg.com/originals/a5/9d/f3/a59df307e6bb26c6c0f1d726675ee934.gif'] 
   let prefix = await db.fetch(`prefixos_${message.guild.id}`)
   if(prefix === null) prefix = 'c!';
    let random = Math.round(Math.random() * gifs.length);
    let embed = new Discord.MessageEmbed()
        .setDescription(`:scream_cat: **<@${message.author.id}>** **deu um tapa em** **<@${user.id}>!**`)
        .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
        .setColor('RANDOM')
        .setFooter(`Clique em 🔁 para retribuir!`)
   message.channel.send(embed).then(msg=>{
            msg.react('🔁').then(r=>{
    const inicios =(reaction, user, ) => reaction.emoji.name === '🔁' && message.author.id === user.id;
  const gg = msg.createReactionCollector(inicios, { time: 90000 });
gg.on('collect', r2 => { 
      let embed = new Discord.MessageEmbed()
        .setDescription(`:scream_cat: **<@${user.id}>** **deu um tapa em** **<@${message.author.id}>!**`)
        .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
        .setColor('RANDOM')
        .setFooter(`use **${prefix}tapa <usuário>** para retribuir!`)
  message.channel.send(embed)

  
})
     
     })
   })
}
                                    