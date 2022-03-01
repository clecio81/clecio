
const { MessageEmbed } = require("discord.js");

  module.exports = {
    config: {
      name: 'uptime',
      aliases: ['timeup'],
      usage: '^uptime',
      description: 'Displays the bot\'s uptime',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    function dur(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
  return `${days.padStart(3, '0')} dia(s) ${hrs.padStart(2, '0')} hora(s) ${min.padStart(2, '0')} minuto(s) ${sec.padStart(2, '0')} segundo(s)`
      }
    let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setThumbnail(client.user.displayAvatarURL)
      .addField('[**__Uptime:__**]', `\`${dur(client.uptime)}\``)
      .addField('[**__Client ID__**]', `\`${client.user.id}\``)
     .setTitle('ira resetar quando eu me reiniciar') 
    message.channel.send(embed)
    }
  }