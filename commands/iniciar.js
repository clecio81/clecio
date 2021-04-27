const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async (client, message, args) => {

   var langg

 const idioma = await db.fetch(`idioma_${message.guild.id}`)

 if (idioma === null) langg = 'pt'

  else langg = idioma       

 const lang = require(`../idioma/${langg}.json`)
 
var nome = args.join(' ')
  var imagens = message.attachments.map(attachment => {

    return attachment;

  });

  let imagem;

  if (imagens[0]) 

    imagem = imagens[0].width= '250'.
                             height = '400'.url();

    let data = {
nome: nome,
      id: message.author.id,
      img: imagem


    
}
    message.channel.send(data.id + data.nome + data.img)
 db.push('vote-db', data);
    //db.delete('vote-db')


 }