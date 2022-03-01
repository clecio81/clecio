var Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!user) return message.reply("**Mencione alguém para abraçar!**");
  let gifs = [
    "https://i.pinimg.com/originals/27/17/c2/2717c20388f9550f612a2175799d8f0a.gif"
  ];
  let random = Math.round(Math.random() * gifs.length);
  let embed = new Discord.MessageEmbed()
    .setDescription(
      `**:blue_heart: <@${message.author.id}>** **abraçou** **<@${user.id}>**!`
    )
    .setImage(
      gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1]
    )
    .setColor("RANDOM")
    
  message.delete().catch(O_o => {});
  message.channel.send(embed);
};

module.exports.help = {
  name: "abraço"
};
