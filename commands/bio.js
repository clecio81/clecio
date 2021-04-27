const db = require('quick.db')
const Discord = require('discord.js')
module.exports.run = async(client, message, args) => {
  var gg = message.author;
  

  var idioma = await db.fetch(`idioma_${message.guild.id}`);

  if (idioma === null) idioma = "pt";

  const lang = require(`../idioma/${idioma}.json`);

  var gg = message.author;

  //background

  

let ts = lang.compras.cls;

  

let ts2 = lang.compras.err;

let link = (`

**[

${lang.click}](https://clecio-website.glitch.me/daily)**`)

  let msg2 =ts .replace("{cls}",100)

  

  .replace("{item}","bio")

let msg = ts2 .replace("{item}","bio")

             .replace("{cls}",100)

            .replace("{link}",link)
    let erro = new Discord.MessageEmbed()

     .setDescription(     msg
    )

    .setFooter(msg2);
  let author = db.fetch(`cls_${message.author.id}`)
  if(author < 100) return message.channel.send(erro)
  let agora = args.join(" ")
    let user = message.author || message.mentions.members.first()
    let sobre = await db.fetch(`sobre_${user.id}`);
    if(!args[0]){
        message.channel.send("Você precisa colocar uma frase")
     // if(message.suffix.length >= 120) return message.channel.sens("&&")
      
}else{
  
    if(agora.length > 300) {

    message.channel.send('Você excedeu o limite de 300 caracteres...')
    }else{
        db.set(`sobre_${user.id}`, agora);
      db.subtract(`cls_${message.author.id}`,100)
        let bio = new Discord.MessageEmbed()
        . setTitle (lang.compras.sim.replace("{item}","bio"))
        .setDescription(`biogragia atualizada para:\n${agora}`)
       
        message.channel.send(bio)
      };
}
 }
//return message.channel.send("limite de 50 caracterís ultrapassado")
 
                      


