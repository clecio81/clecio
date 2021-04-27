const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
 if (!message.member.hasPermission('MANAGE_CHANNELS'))
  return message.reply("você não tem permissão de ``gerenciar canais`` para usar este comando");

  let canal = message.mentions.channels.first();
  const o1 = new Discord.MessageEmbed()
  .setTitle('sitema de boas vindas:')
  .setDescription('sistema de boas vindas com autorol,use c!setwelcome ``<cargo>`` ``<canal>``')
  .setColor('RANDOM')
 if (!canal) return message.reply(o1);

  if (!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.channel.send("**Você não tem permissão de ``gerenciar mensagens`` para usar este comando!**");
  
      let cargo = message.mentions.roles.first();
      if (!cargo) return message.reply('mencione o cargo que irei da assim que o membro entrar no servidor')
     
	const embed = new Discord.MessageEmbed()
  .setTitle('sistema de boas vindas ativado!')
		.setDescription(`sistema ativado, quando o membro entrar no servidor irei da o cargo ${cargo} id:${cargo.id} assim que o membro entrar irei enviar uma mensagem de boas vindas no canal ${canal} id: ${canal.id} *escreva testar_entrada para testar*`)
		.setColor("RANDOM")
		.setTimestamp()
	message.channel.send({embed})
     db.set(`cargos_${message.guild.id}`,cargo.id)
     db.set(`canal_${message.guild.id}`,canal.id)
    const id = await db.fetch(`canal_${message.guild.id}`)         
    const canals = bot.channels.cache.find(channel => channel.id === id)
    canals.send("olá")
  }