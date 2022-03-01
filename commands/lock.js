const { MessageEmbed } = require("discord.js")

module.exports = {

    name: 'lockchannel',

    description: "Locks a channels and disallows everyone to send messages!",

    usage: "?lockchannel <#channel> <reason>",

    aliases: ['lockc'],

    run: async(client, message, args) => {

        if(!message.member.hasPermission('MANAGE_CHANNELS')) {

            const lockchannelError = new MessageEmbed()

            .setDescription('Você não tem permissão para isso')

            .setColor("RED")

            return message.channel.send(lockchannelError)

        }

        let channel = message.mentions.channels.first();

        let reason = args.join(" ") || ' Não especificado'

        if(channel) {

            reason = args.join(" ").slice(22) || ' Não especificado'

        } else (

            channel = message.channel

        )

        if(channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {

            const lockchannelError2 = new MessageEmbed()

            .setDescription(`${channel} Já está bloqueado`)

            .setColor("RED")

            return message.channel.send(lockchannelError2)

        }

        channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: false })

        const embed = new MessageEmbed()

        .setTitle(`Canal fechado!`)

        .setDescription(`**canal:** ${channel} \n **motivo:** ${reason}`)

        .setColor("BLUE")

        message.channel.send(embed)

    }

}