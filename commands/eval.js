const config = require('../config.json')
const Discord = require ('discord.js');

exports.run = async (client, message, args) => {
   if (!(message.author.id == '693208785929371748' || message.author.id == '693208785929371748')) return message.channel.send(` Apenas donos do bot podem usar este comando!`)
     try {
    var codec = args.join(" ");
    let code = eval(codec);
    if (typeof code !== 'string')
      code = require('util').inspect(code, { depth: 0 });
      code = `${code.replace(new RegExp(`${client.token}`, 'g'), `tokenpica!`)}`
      let embed = new Discord.MessageEmbed()
      .setColor("#36393e")
      
      .setTitle(`Executado.`)
      .addField('📤 Entrada', `\`\`\`js\n${codec}\`\`\``)
      .addField('📥 Saída', `\`\`\`js\n${code}\n\`\`\``)
      .addField('❓ Tipo', `\`\`\`js\n${typeof code}\n\`\`\``)
      message.channel.send(embed)
  } catch (e) {
    let embedt = new Discord.MessageEmbed()
    .setColor("#36393e")
    .setTitle(`Erro.`)
    .addField("📤 Entrada", `\`\`\`js\n${codec}\n\`\`\``)
    .addField(`Erro`, `\`\`\`js\n${e}\n\`\`\``)
      message.channel.send(embedt);
  }        
}
exports.config = {
    name: 'eval',
    aliases: ['ev'],
    usage: 'eval',
    desc: 'Comando de eval'
}