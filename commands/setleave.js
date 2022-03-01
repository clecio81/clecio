const db = require("quick.db");
const Discord = require("discord.js")
exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.reply(
      "você não tem permissão de ``gerenciar canais`` para usar este comando"
    );
  let canal = message.mentions.channels.first();
  const o1 = new Discord.MessageEmbed()
    .setTitle("sitema de saida:")
    .setDescription("sistema de saida,use c!setsaida ``<canal>``")
    .setColor("RANDOM");
  if 
    (!canal && args[0] !== "sıfırla") return message.reply(o1);
    const embed = new Discord.MessageEmbed()
      .setTitle("sistema de saida ativado!")
      .setDescription(`sistema ativado, para o canal ${canal} id: ${canal.id} escreva *testar_saida* para testar`)
      .setColor("RANDOM")
      .setTimestamp();
    message.channel.send({ embed });
  db.set(`exite_${message.guild.id}`,canal.id)
  
}

