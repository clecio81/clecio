const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let user = message.mentions.members.first();
  if (!user) return message.channel.send("Mencionare um usuário");
  if ((user = message.author))
    return message.channel.send("Você pode doar para você mesmo");

  let erro = new Discord.MessageEmbed().setDescription(
    `você não possue dinheiro suficiente para está ação\n **[click aqui](https://cleciosan.glitch.me/daily)** para conseguir mais cl's`
  );

  let money = await db.fetch(`cls_${message.author.id}`);
  let doado = args[1];
  if (!isNaN(doado)) return message.channel.send("Qual a quantidade?");
  if (money < doado) {
    return message.channel.send(erro);
  } else {
    let gg = new Discord.MessageEmbed().setDescription(
      `Você acaba de doar ${doado} para ${user}`
    );
    message.channel.send(gg);

    db.subtract(`cls_${message.author.id}`, doado);
    message.channel.send(gg);
    db.add(`cls_${user.id}`, doado);
  }
};
