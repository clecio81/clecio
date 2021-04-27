 const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    let respostas = ["Sim.", 
                    "Não.", 
                    "Eu não sei.",
                    "Digamos que sim",
                    "Vou procurar na internet",
                    "A Bia me disse que não .",
                    "A amanda me disse que sim.",
                    "Sim definitivamente.",
                    "Sinais apontam que sim."]
    let resultado = Math.floor((Math.random() * respostas.length));
    let que = args.join(" ");
    var infocmd = new Discord.RichEmbed()
        .setTitle("🏆 Comando: Rander")
        .addField("✅ Uso:", "**c!rander** `<pergunta>`", true)
        .addField("📄 Exemplo:", "c!rander Eu sou o melhor?", true)
        .setColor("#FFA500")
        .setFooter("Informações do comando: \"Rander o sábio\"")
    
    if(!que) return message.channel.send(infocmd)
    let ball = new Discord.RichEmbed()
        .setTitle("Rander <:rdr:634185060693835778> ")
        .setDescription(`${message.author} fez uma pergunta 🤔.`)
        .addField('Questão 📝:', que)
        .setColor('#FFA500')
        .setThumbnail(message.author.avatarURL)
        .setFooter(`Pergunta feita por: ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp()
          
   // message.delete().catch(O_o=>{})
  message.channel.send(ball); 
message.delete()
    }
module.exports.help = {
    name: "rander"
    }
