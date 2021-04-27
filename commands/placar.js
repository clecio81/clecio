
    const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "leaderboard",
    description: "Check the sever's leaderboard",

    async run (client, message, args) {
        let money = db.has(`prefixos_${message.guild.id}`, { sort: '.data' })

        let content = "";

        for (let i = 0; i < money.length; i++){
            let user = client.guilds.cache.get(money[i].ID.split('_')[2]).name

            content += `${i+1}. ${user} - ${money[i].data} \n`;

            const embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}'s Leaderboard`)
            .setDescription(`${content}`)
            .setColor("RANDOM")
            .setTimestamp()

            message.channel.send(embed);
        }
    }
}