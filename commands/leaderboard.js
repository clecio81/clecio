 const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let user = message.author;
  let guild = message.guild;
  
  let embed = new Discord.MessageEmbed().setColor([54, 57, 63]).setTimestamp();
  
  embed.setAuthor("LEADERBOARD | " + guild.name, guild.iconURL);
  let gg = db.all().filter(i => i.ID.startsWith(`total_points_${guild.id}_`)).sort((a, b) => b.data - a.data);
    if (gg.length < 1) return message.channel.send("No leaderboard");
    let place = gg.map(m => m.ID).indexOf(`total_points_${guild.id}_${message.author.id}`) + 1 || "0";
    gg.length = 10;
    let xp, level;
    
    let a = 1;
    for (var i in gg) {
      let id = gg[i].ID.split("_")[3];

        let name = await client.users.fetch(id);

       name = name ? name.tag : "User#0000";
      let total = await db.fetch(`level_${id}_${guild.id}`);
      level = await db.fetch(`level_${id}_${guild.id}`);
      if (level === null) level = 0;
      xp = await db.fetch(`xp__${guild.id}_${id}`);
      if (xp === null) xp = 0;
      if (total === null) total = 0;
      embed.addField(`[${a}] ${name}`, `Level: ${level} [XP: ${xp}]`, false);
      a++;
    }
    
  
  
  embed.setDescription(`:clipboard: Top 10`);
  
  embed.setFooter(`Vocé esta em: #${place} no top 10`, user.avatarURL);
  
  //embed.setThumbnail(url);
  
  message.channel.send(embed);
  
}
          