const Discord = require('discord.js');
const db = require('quick.db');
const Canvas = require('canvas');
const snekfetch = require('node-superfetch');

exports.run = async (client, message, args) => {
  
  let texto = args.join(` `)
  if(!texto) return message.channel.send("escreva uma frase")
  if(texto.length > 20) {
    message.channel.send('Você excedeu o limite de caracteres...')
  } else {
  const canvas = Canvas.createCanvas(476, 491);
  const ctx = canvas.getContext('2d');
  const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/696466356039581709/701159813719130202/edit666.png');
  ctx.drawImage(avatar,0,0,476,491);
  ctx.font = "36px Arial";
  ctx.fillText(`${texto}`, 7, 299)
  const attach = new Discord.MessageAttachment(canvas.toBuffer(), 'clecio/1palavras.png');
  message.channel.send(attach);
  
}
}