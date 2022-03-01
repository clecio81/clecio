const Discord = require("discord.js");

const db = require("quick.db");

exports.run = async (client, message, args) => {
  
 var user = message.guild.id;


  var idioma = await db.fetch(`idioma_${message.guild.id}`);

  if (idioma === null) idioma = "pt";

  const lang = require(`../idioma/${idioma}.json`);

  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(lang.per.all);

  let black = await db.fetch(`locklevel_${user}`);

  if (black === "não") {
    db.set(`locklevel_${user}`, "sim");

    message.channel.send(lang.level.desligado);
  } else if (black === "sim") {
    message.channel.send(lang.level.ligado);

    db.set(`locklevel_${user}`, "não");
  } else {
    db.set(`locklevel_${user}`, "não");

    message.channel.send(lang.level.setup);
  }
};
