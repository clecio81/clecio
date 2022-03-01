const Discord = require("discord.js");

const backup = require("discord-backup");


exports.run = (bot, message, args) => {
  if (
    !message.member.hasPermission("ADMINISTRATOR")
  ) {
    return message.channel.send(
      ":x: Você precisa ter permissão de administrador para criar um backup!"
    );
  }

  backup
    .create(message.guild, {
      jsonBeautify: true
    })
    .then(async backupData => {
      console.log(backupData);

      const msg_embed = new Discord.MessageEmbed()

        .setColor("#ff0015")

        .setTitle(message.guild.name)

        .setURL(
          `https://discord.com/oauth2/authorize?client_id=${bot.id}&permissions=8&scope=bot`
        )

        .setDescription(`\\✅ Backup criado com sucesso!\n Utilize o comando load <id> para carrega-lo \nID: ${backupData.id}\n Enviaremos informações do backup na sua DM`)

        .setFooter(
          message.author.username,
          message.author.avatarURL() || message.author.defaultAvatarURL
        )

        .setTimestamp();

      message.channel.send(msg_embed);
    message.channel.send(`${backupData.id}`)
    })
    .catch(async err => {
      const err_embed = new Discord.MessageEmbed()

        .setColor("#ff0015")

        .setTitle(message.guild.name)

        .setURL(
          `https://discord.com/oauth2/authorize?client_id=${bot.id}&permissions=8&scope=bot`
        )

        .setDescription(
          `\\❌ Erro ao criar o backup!\nTente novamente mais tarde.\n${err}`
        )

        .setFooter(
          message.author.username,
          message.author.avatarURL() || message.author.defaultAvatarURL
        )

        .setTimestamp();

      message.channel.send(err_embed);
    });
};
