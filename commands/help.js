const Discord = require('discord.js');

const db = require ('quick.db');

exports.run = async (client, message, args) =>{

function dur(ms) {

    const sec = Math.floor((ms / 1000) % 60).toString()

    const min = Math.floor((ms / (1000 * 60)) % 60).toString()

    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()

    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()

  return `${days.padStart(3, '0')} day(s) ${hrs.padStart(2, '0')} hour(s) ${min.padStart(2, '0')} minute(s) ${sec.padStart(2, '0')} second(s)`

      }

  let prefix = await db.fetch(`prefixos_${message.guild.id}`)

  if(!prefix) prefix = 'c!';

  let idiomas = await db.fetch(`idioma_${message.guild.id}`) || db.fetch(`idioma_${message.author.id}`)  

 if(idiomas === null) idiomas = 'pt';

 const lang = require(`../idioma/${idiomas}.json`) 

 

 let inicio = new Discord.MessageEmbed()



 .setColor([54, 57, 63])



.addField(' Moderação',`\n👋┃ ${prefix}ban\nBanir um usuário do servidor

⏳┃ ${prefix}tempmute\n Silenciar um usuário por um período de tempo

🙊┃ ${prefix}mute\nSilenciar um usuário

💭┃ ${prefix}unmute\nDes-Silenciar um usuário

⚠️┃ ${prefix}warn\nEnviar um aviso para um usuário

👋┃ ${prefix}kick\nExpulsar um usuário

⌛┃ ${prefix}slowmode\n Ativar o modo lento no servidor

⚔️┃ ${prefix}defense\n Ver a defesa do servidor

✒️┃ ${prefix}clear\nLimpar mensagens do canal

🚧┃ ${prefix}lock\nFechar um canal

🚦┃ ${prefix}unlock\n Abrir um canal

📫┃ ${prefix}topic\nAdicionar um tópico a um canal`)  

  

     .addField(` Diversão`,`

   

🎱┃ ${prefix}8ball\nFazer perguntas a bola mágica

👩‍❤️‍💋‍👨┃ ${prefix}kiss\nbeijar um usuário

🤝┃ ${prefix}abraçar\nAbraçar um usuário

😊┃ ${prefix}cafune\nFazer cafuné a um usuário

🏆┃ ${prefix}conquista\nCriar uma conquista com palavras

🌁┃ ${prefix}clima\nVer o clima 

 🗯️┃ ${prefix}say\Faça o bot repetir a palavra

💕┃ ${prefix}ship\nShipar dois usuários

🖐️┃ ${prefix}tapa\nDar um tapa ao usuário determinado

💬┃ ${prefix}emojify\n Transformar texto em emoji

🌄┃ ${prefix}mcskin\n Visualizar skins(MC)`)

                

   

       

  .setThumbnail(client.user.displayAvatarURL)

 message.channel.send(inicio)

 }