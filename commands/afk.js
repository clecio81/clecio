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
    var time = ms(timeout - (Date.now() - daily));

    if (!time) time = 0;
    if (daily) {
      return;

      message.channel.send(
        lang.daily.on.replace("{hrs}", time.hours, time.minutes, time.seconds)
      );
    } else {
      message.channel.send(  lang.daily.off.replace(

          "{link}",

          'https://clecio-website.glitch.me/daily"'

        )

      
      );
    }
  }
};
  