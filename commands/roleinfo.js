const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
 
     let cargo = message.mentions.roles.first();

      if (!cargo) return message.reply('mencione um cargo')

 const moment = require("moment");
  moment.locale("pt-BR");
  var temps = moment(message.createdTimestamp).format("LLLL");
  var roleinfoEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("✏ nome do cargo", cargo.name)
    .addField("🆔 ID", cargo.id)
    .addField("👥 usuários usando", cargo.members.size)
    .addField("#️⃣ cor do cargo", cargo.hexColor)
    .addField(
      "📣 todos podem mencionar?",
      cargo.mentionable ? "\nsim" : "não",
      true
    )
    .addField("📅 criado em", moment(cargo.createdAt).format("LLLL"), true)
    .setFooter("");
  message.channel.send(roleinfoEmbed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rolinfo", "rolhakkında", "rolbilgi"],
  permLevel: 0,
  kategori: "genel"
};

exports.help = {
  komut: "rolinfo",
  description: "rolinfo | Rol hakkında bilgi verir.",
  usage: "rolinfo <rolismi>"
};
