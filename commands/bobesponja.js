const Discord = require("discord.js");

const Canvas = require("canvas");

exports.run = async (bot,message,args) => {

    const text = args.join(' ');

    const canvas = Canvas.createCanvas(460,650);

    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://cdn.glitch.com/c579bbc5-db8d-4eb5-a18a-3b1b8a8a69da%2Fbobesponja.png?v=1612209407937');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '26px sans-serif';

    ctx.fillStyle = '#000';

    ctx.fillText(text, 50, 100);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'bobe.png');

    message.channel.send(attachment);

};