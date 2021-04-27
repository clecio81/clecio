const Discord = require("discord.js");
const db = require("quick.db");
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};


module.exports = async (client, member, user) => {
  let im =   'https://cdn.discordapp.com/attachments/688478065826857037/807381740392808478/Emma_Papel_de_Parede_HD___Plano_de_Fundo___1920x1080___ID_983492.png'
  let prefixo = await db.fetch(`prefixos_${member.guild.id}`);

  if (prefixo === null) prefixo = "c!";

  let id = await db.fetch(`canal_${member.guild.id}`);

  let texto = await db.fetch(`texto2_${member.guild.id}`);

  if (texto == null)

    texto = `{user} seja bem vindo(a) {space} agora temos {members} membros `;

  let mensagem = texto

    .replace("{user}", member.user.tag)

    .replace("{guild}", member.guild.name)

    .replace("{members}", member.guild.members.cache.size)

    .replace("{space}", "\n")

    .replace("{tab}", "\n\n")

    .replace("{username}", member.user.username);

  if (id === null) return;

  let Canvas = require("canvas");

  const channel = member.guild.channels.cache.find(ch => ch.id === id);

  if (!channel) return;
	const canvas = Canvas.createCanvas(700, 250);

	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage(im)
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';

	ctx.strokeRect(0, 0, canvas.width, canvas.height);


	ctx.font = '28px sans-serif';

	ctx.fillStyle = '#ffffff';

	ctx.fillText(`bem-vindo(a)`, canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);

	ctx.fillStyle = '#ffffff';

	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();

	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));

	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.jpg');


  channel.send(mensagem, attachment);
  
}





