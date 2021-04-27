const Discord = require("discord.js");
const moment = require("moment");
const  db = require ('quick.db');
moment.locale("pt-br")

exports.run = async (client, message, args) => {
	let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
	let createdAt = moment(target.user.createdAt).format("D MMM YYYY, h:mm a");
	let joinedAt = moment(target.joinedAt).format("D MMM YYYY, h:mm a");
let total = await db.fetch(

    `total_points_${message.guild.id}_${target.id}`

  );

  if (total === null) total = 0;

 
	let embed = new Discord.MessageEmbed()
		.setColor(target.displayColor)
		.setThumbnail(target.user.displayAvatarURL)
		.addField("Nome do usuário ", target.user.tag, true)
		.addField("Nickname", target.nickname || "Não possue", true)
		.addField("ID", target.id, true)
		.addField("Conta criada em", `${moment(message.guild.creatdAt).format('LLLL')}`)
		.addField("Entrou no servidor em", `${moment(message.guild.joinedAt).format('LLLL')}`)
  
     .addField("Status",target.user.presence.status)
     .addField("Jogando🎮",target.user.presence.game || "nada no momento" ,true)
     .addField("Pontuação de rank",total)
		.setTimestamp();
	message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ui'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'userinfo',
    description: 'Gives you a random response to a question.',
    usage: '8ball [question]'
};