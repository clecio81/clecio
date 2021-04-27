const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (bot,message,args) => {
  const idioma = await db.fetch(`idioma_${message.guild.id}`)
  if(!idioma) idioma = 'pt';
  let lang = require(`../idioma/${idioma}.json`)
  let prefix = await db.fetch(`prefixos_${message.guild.id}`)
  if(! prefix) prefix = 'c!';
	if (!args[0]) {
		message.channel.send(lang.lim.limerro.replace("{prefix}",prefix))
		return;
	} else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
		message.channel.send(lang.per.all)
		return;
	}
	try{
		message.channel.bulkDelete(args[0]).then(messages => {
			message.channel.send(lang.lim.limsu.replace("{ms}",messages.size));
		});
	} catch (err) {
		message.channel.send(lang.Error);
	}
}