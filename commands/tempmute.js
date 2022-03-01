const ms = require("ms");
const db = require("quick.db");
const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let id = await db.fetch(`logs_${message.guild.id}`);

  const idioma = await db.fetch(`idioma_${message.guild.id}`);

  if (idioma === null) idioma = "pt";

  const lang = require(`../idioma/${idioma}.json`);

  const canal = message.guild.channels.cache.find(ch => ch.id === id);

  if (!canal) return message.channel.send(lang.logs.logserro);

  let tomute =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.author;

  if (!tomute) return message.reply("use: c!tempmute <@user> <s/h/d/m>");
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.reply("você não tem permissão para utilizar este comando");
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


  let mutetime = args[1];
  let tempo = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  if (!mutetime) return message.reply("especifique um tempo");
  await tomute.roles.add(role.id);

  message.reply(` foi mutado por ${tempo}`);

  setTimeout(function() {
    tomute.roles.remove(role.id);
    canal.send(
      `<@${tomute.id}> foi desmutado pelo **motivo:** o tempo de silêncio do usuário expirou,** tempo de ${tempo}**`
    );
  }, ms(mutetime));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tm"],
  permLevel: 0
};

exports.help = {
  name: "tempmute",
  description: "Gives you a random response to a question.",
  usage: "8ball [question]"
};
