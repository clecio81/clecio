const Discord = require("discord.js");

exports.run = (client, message, args) => {
 // if(message.author.id !== "592045792391594061") return message.channel.send("🛠️ | Oops! Esse comando foi temporariamente desativado!").then(msg => msg.delete(10000))

  const comousar = new Discord.RichEmbed()
    .setTitle(`c!reverso`)
    .setDescription(`Como usar: c!reverso <Mensagem>**`)
    .setColor(
      `${
        message.guild.me.displayHexColor !== "#00000"
          ? message.guild.me.displayHexColor
          : 0xffffff
      }`
    );
message.delete()
  let mensg = args.join(" ");
  if (!mensg)
    return message.channel
      .send(message.author, comousar)
      .then(msg => msg.delete(9000));

  var texto = message.content.substring(10);

  let ReverseEmbed = new Discord.RichEmbed()
    .setTitle(`**»** Reverso`)
    .setColor(
      `${
        message.guild.me.displayHexColor !== "#00000"
          ? message.guild.me.displayHexColor
          : 0xffffff
      }`
    )
    .addField("Mensagem", texto)
    .addField(
      "Mensagem Invertida:",
      args
        .join(" ")
        .split("")
        .reverse()
        .join("")
    )
    .setFooter(
      `Comando solicitado por: ${message.author.tag}`,
      message.author.displayAvatarURL
    )
    .setTimestamp();
  message.channel.send(ReverseEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["inverse"],
  permLevel: 0
};

exports.help = {
  name: "reverso",
  description: "Inverta a mensagem que você deseja",
  usage: "reverso <palavra/frase>",
  categoria: 'diversão'
};
