const db = require("quick.db");
const ms = require("parse-ms");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  var langs = await db.fetch(`idioma_${message.guild.id}`);

  if (!langs) langs = "pt";

  var lang = require(`../idioma/${langs}.json`);
      let timeout = 86400000;
  let daily = await db.fetch(`tempos_${message.author.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {

    let time = ms(timeout - (Date.now() - daily));

  
  message.channel.send(lang.daily.on.replace("{hrs}",`**${time.hours} ${lang.daily.horas} ${ time.minutes} ${lang.daily.minutos} ${ time.seconds} ${lang.daily.segundos}**`))

        

  } else {
message.channel.send(

        lang.daily.off.replace(

          "{link}",

          "https://clecio-website.glitch.me/daily"

        )

      );  
  
  
}

    
  
};

