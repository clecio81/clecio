const Discord = require("discord.js");

const Canvas = require("canvas");

exports.run = async (bot,message,args) => {
  

  let user = message.mentions.users.first()

    ? message.mentions.users.first()

    : message.author;

    const canvas = Canvas.createCanvas(700,450);

    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://cdn.glitch.com/c579bbc5-db8d-4eb5-a18a-3b1b8a8a69da%2Fbolsonaro2.jpeg?v=1612209427518');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    const imagem = await 
  Canvas.loadImage(user.displayAvatarURL({ format: "png" }));

  

  

  

    ctx.drawImage(imagem, 188, 21, 479, 306);
  

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'bolsonaro2.png');

    message.channel.send(attachment);

};