const db = require("quick.db");
const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  

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
  let msg2 =ts .replace("{cls}",1000)
  

  .replace("{item}","background")
let msg = ts2 .replace("{item}","background")
             .replace("{cls}",1000)
            .replace("{link}",link)

  
  let erro = new Discord.MessageEmbed()

     .setDescription(`${msg}`)
    .setFooter(msg2)

  let author = db.fetch(`cls_${message.author.id}`);
  if (author < 1000) return message.channel.send(erro);
  var imagens = message.attachments.map(attachment => {
    return attachment;
  });
  let imagem;

  if (imagens[0]) {
    imagem = imagens[0].url;
  } else {
    imagem = args.join(" ");
  }

  let user = message.author || message.mentions.members.first();
  let agoras = await db.fetch(`im_${user.id}`);
  if (!imagem) {
    message.channel.send(
      "Você precisa colocar um link ou upload de uma imagem!"
    );
    message.channel.send(
      "`obs: se detectamos imagens +18(nsfw) você estará proibido de usar meus comandos`"
    );
  } else {
    db.set(`im_${user.id}`, imagem);
    let prefix = await db.fetch(`prefixos_${message.guild.id}`);
    if (prefix === null) prefix = "c!";

    db.subtract(`cls_${message.author.id}`, 1000);
    let bio = new Discord.MessageEmbed()
      .setTitle(lang.compras.sim.replace("{item}","background"))
      .setImage(imagem)
      .setDescription(
        `*_Algo destranho com essa imagem?_*\ndenuncie essa imagem utilizado ${prefix}bug`
      );

    message.channel.send(bio);
  }
};
