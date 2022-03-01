const Discord = require("discord.js");

const db = require("quick.db");

module.exports = async (client, member, user) => {
  let prefixo = await db.fetch(`prefixos_${member.guild.id}`);

  if (prefixo === null) prefixo = "c!";

  let texto = await db.fetch(`entrada_${member.guild.id}`);

  let id = await db.fetch(`exite_${member.guild.id}`);

  if (id === null) return;

  const channel = member.guild.channels.cache.find(ch => ch.id === id);

  if (!channel) return;

  if (texto == null)

    texto = `{user} saiu do servidor {space} agora temos {members} membros `;

  let mensagem = texto

    .replace("{user}", member.user.tag)

    .replace("{guild}", member.guild.name)

    .replace("{members}", member.guild.members.cache.size)

    .replace("{space}", "\n")

    .replace("{tab}", "\n\n")

    .replace("{username}", member.user.username);

  const welcomeEmbed = new Discord.MessageEmbed()

    .setAuthor(

      member.user.username,

      member.user.displayAvatarURL({ dynamic: true })

    )

    .addField("<a:saiu:794831286039871519>", mensagem)

    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))

    .setColor("RANDOM")

    .setFooter(member.guild.name);

  channel.send(welcomeEmbed);

};

