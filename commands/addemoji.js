const Discord = require('discord.js');

exports.run =async(client, message, args) =>{
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`você não tem permissão para isso.`);
  let nome =  args.join('')
  let guild = message.guild
  var imagens = message.attachments.map(attachment => {
    return attachment;
  });
  let imagem;

  if (imagens[0]) {
    imagem = imagens[0].url;
  } else {
    imagem = args.join(" ");
  }

  if (!imagem) {
    message.channel.send(
      "Você precisa colocar um  upload de uma imagem!"
    );
    
  if (!nome) return message.channel.send(`adicione um nome para o emiji comum espaço.`)
  
  guild.createEmoji(imagem, nome)
    .then(emoji => message.channel.send(`${emoji.name} adicionado com sucesso. (${emoji})`))
    .catch(console.error);
  
};
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emoji-add'],
  permLevel: 3
};
