  const Discord = require("discord.js");

module.exports.run = async (client, message) => {
    
    var user = message.mentions.users.first();

    if (!user) user = message.author;

    var targetInvites = await message.guild.fetchInvites();

    var invitesUses = 0;

    targetInvites.forEach(invite => {
        if (invite.inviter.id === user.id) {
            invitesUses += invite.uses;
          }
    });

    var embed = new Discord.MessageEmbed()
    .setThumbnail(user.displayAvatarURL)
    .setTitle(` ${user.tag}`)
    .addField("<a:div:796038127197880380> Membros Recrutados", `\`\`\`md\n# ${invitesUses} Membros\`\`\``)
    .setColor('#020202')
    .setFooter(`ID : ${user.id}`)
    
    .setTimestamp();
    message.channel.send(embed)
};
module.exports.help = {
    name: "divulgador"
}