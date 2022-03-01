var req = require("request")
const Discord = require('discord.js');
const moment = require('moment');
const db = require ('quick.db')
exports.run = async (client, message, args) => {
  
  var langg = await db.fetch(`idioma_${message.guild.id}`)    
  const lang = require(`../idioma/${langg}.json`) 
  
let name = args[0]
	req('https://api.github.com/users/' + name, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0' }}, (e, r, b)=> {
		let contenu = JSON.parse(b)
		if(contenu.message === "Not Found") {
		return	message.channel.send(lang.Github.nE)
		} if (!name) {
			message.channel.send(lang.Github.args)
		} else {
      console.log(contenu)
	const embed = new Discord.RichEmbed()
		//.setAuthor(client.user.username, client.user.avatarURL())
		.setColor(0x00AE86)
		.addField(contenu.login + " (" + contenu.type + ")", contenu.bio || 'não informadal')     
		.addField(lang.Github.infoEmbed.f, contenu.followers , true)
		.addField(lang.Github.infoEmbed.F, contenu.following, true)
    .addField(lang.Github.infoEmbed.C , moment(contenu.created_at).format("D MMMM Y"), true)
    .addField(lang.Github.infoEmbed.L , contenu.location || 'não informada', true)
    .addField(lang.Github.infoEmbed.Com , contenu.company || 'nenhuma', true)  
    .addField(`${contenu.public_repos} ${lang.Github.infoEmbed.rP}` , "[Verifique-os](https://github.com/" + name + "?tab=repositories)", true)	
		.addField("Links", `${contenu.blog === null ?lang.Github.infoEmbed.WebN : '[Website](' + contenu.blog  + ')'} | [Github](https://github.com/${contenu.login}) `)	
		.setThumbnail(contenu.avatar_url)
		.setTimestamp()
		message.channel.send({embed});
		}
	})
}