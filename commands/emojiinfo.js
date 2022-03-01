const { MessageEmbed, Util } = require('discord.js')
const moment = require('moment')

moment.locale('pt-br')
exports.run = async (client, message, args) => {
//s.client.util = Util
if (!args.length) return message.channel.send(`${message.author}, coloque um emoji ou o nome dele para ver as informações sobre tal emoji.`)
        const emoji = await message.guild.emojis.cache.get(args[0]) || message.guild.emojis.cache.filter(e => e.name.toLowerCase().includes(args.join(' ').toLowerCase())).find(em => em.name) || Util.parseEmoji(args[0]) || message.guild.emojis.find(args[0]);

		(args[0])
  	
		
        if (emoji.id === null) return message.channel.send(`${message.author}, eu não consegui encontrar o emoji \`${args.join(' ')}\`.`)

        let emojiImage = `https://cdn.discordapp.com/emojis/${emoji.id}.png`
        let emojiMention = `<:${emoji.name}:${emoji.id}>`

        if (emoji.animated) {
            emojiImage = `https://cdn.discordapp.com/emojis/${emoji.id}.gif`
            emojiMention = `<a:${emoji.name}:${emoji.id}>`
        }

        const emojiInfo = new MessageEmbed()
            .setColor('#f5c60c')
            .setThumbnail(emojiImage)
            .setTitle(`Emojiinfo`, true)
            .addField('Nome', emoji.name, true)
            .addField('Id', emoji.id, true)
            .addField('Menção', `\`${emojiMention}\``, true)
            .addField('Animado?', emoji.animated ? 'Sim' : 'Não', true)
            .addField('URL', emojiImage, true)
            .addField('Criado em ', moment(emoji.createdAt).format('LLLL'), true)

        message.channel.send(emojiInfo)
    }
