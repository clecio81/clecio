const { MessageAttachment } = require("discord.js");
const db = require ('quick.db');
const utils = require("../utils.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  
  let level = db.get(`level_${user.id}_${message.guild.id}`) || 0;
let im = await db.fetch(`im_${user.id}`)
if(im === null) im = 'https://cdn.discordapp.com/attachments/793293336797904940/794195999005868062/images_5.png'
  let exp = db.get(`xp__${message.guild.id}_${user.id}`) || 0;
let need = utils.need(level+1);
 let total = await db.fetch(
    `total_points_${message.author.id}_${message.guild.id}`
  );

  if (total === null) total = 0;
 
 // total = await db.add(`total_${message.guild.id}`)
  let every = db.all().filter(i => i.ID.startsWith(`total_points_${message.guild.id}_`)).sort((a, b) => b.data - a.data);

  let rank = every.map(x => x.ID).indexOf(`total_points_${message.guild.id}_${user.id}`)+1;

  const card = new canvacord.Rank()

    .setUsername(user.username)

    .setDiscriminator(user.discriminator)

    .setRank(rank)
    .setBackground("IMAGE",im)
    .setLevel(level)
    .setCurrentXP(exp)
   .setRequiredXP(need)

    .setStatus(user.presence.status)

    .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));

  const img = await card.build();

  

  return message.channel.send(new MessageAttachment(img, "rank.png"));

};

module.exports.help = {

  name: "rank"

};