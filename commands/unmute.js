const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let idiomas = await db.fetch(`idioma_${message.guild.id}`);

  if (idiomas === null) idiomas = "pt";

  const lang = require(`../idioma/${idiomas}.json`);

  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send(`${lang.per.all}`);
  let id = await db.fetch(`logs_${message.guild.id}`);

  const canal = message.guild.channels.cache.find(ch => ch.id === id);

  if (!canal) return message.channel.send(lang.aviso.logs);

  const mod = message.author;

  let user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.author;
  let infocmd = new Discord.MessageEmbed()
    .setTitle("🔇 Comando: c!unmute")
    .addField("✅ Uso:", "**c!unmute** `<@user>` `<motivo>`")
    .addField("📄 Exemplo:", "c!unmute @User#1234 spam")
    .setColor("#ff0000")
    .setFooter('Informações do comando: "unmute"');
  if (!user) return message.channel.send(infocmd);
  let reason = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  let msgdeexi = new Discord.MessageEmbed()
    .setDescription("este usuário não está mutado")
    .setColor("#ff0000");
  if (!user.roles.cache.find(`name`, "Muted"))
    return message.channel.send(msgdeexi);
  let msgreason = new Discord.MessageEmbed()
    .setDescription("Coloque algum motivo.")
    .setColor("#ff0000");
  if (!reason) return message.channel.send(msgreason);
    let role = message.guild.roles.cache.find((x) => x.name === "muted");

    if (!role)

      role = await message.guild.roles

        .create({ data: { name: "muted", color: "#ff0000" } })
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

  await user.roles.remove(role.id);
  const muteembed = new Discord.MessageEmbed()
    .setAuthor(
      " Ação | UnMute",
      `https://images-ext-2.discordapp.net/external/wKCsnOcnlBoNk-__BXsd6BrO6YddfUB-MtmaoaMxeHc/https/lh3.googleusercontent.com/Z5yhBQBJTSJVe5veJgaK-9p29hXm7Kv8LKF2oN0hDnsToj4wTcQbirR94XVpH4Lt5a5d%3Dw300`
    )
    .addField("Usuário", `<@${user.id}>`)
    .addField("Motivo", `${reason}`)
    .addField("Executor", `${mod}`)
    .setColor("#000000");
  message.channel.send("usuário desmutado com sucesso");
  canal.send(muteembed);
};
