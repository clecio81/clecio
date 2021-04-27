const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message) => {

  
const isStaff = msg => {
  let permissions = msg.permissions.serialize();
  return (
    permissions.KICK_MEMBERS ||
    permissions.BAN_MEMBERS ||
    permissions.ADMINISTRATOR ||
    permissions.MANAGE_CHANNELS ||
    permissions.MANAGE_GUILD
  );
};

const statusMap = {
  online: "<:emoji_2:702221834635968520>",
  streaming: "<:emoji_6:702224573411622933>",
  idle: "🌕",
  dnd: "<:emoji_3:702224499206127667>",
  offline: "<:emoji_4:702224550775095377>"
};

const sortMap = { online: 1, idle: 2, streaming: 3, dnd: 4, offline: 5 };

const getStatus = (msg, map = true) => {
  let status = msg.guild.presences.cache.get(msg.user.id)
    ? msg.guild.presences.cache.get(msg.user.id).status
    : "online";
  return map ? statusMap[status] : status;
};

let ido = await db.fetch(`idioma_${message.guild.id}`);
  if (ido === null) ido = "pt";
  const lang = require(`../idioma/${ido}.json`);
  var text = lang.adm;
  let name = message.guild.name;
  let mods = message.guild.members.cache
    .array()
    .filter(msg => isStaff(msg) && !msg.user.bot)
    .sort((a, b) => sortMap[getStatus(a, false)] > sortMap[getStatus(b, false)]);
  mods = mods.map(
    msg =>
      `${getStatus(msg)} **${msg.user.username}#${msg.user.discriminator}**`
  );
  const embed = new Discord.MessageEmbed().setDescription(
    [`${text} ${message.guild.name}`].concat(mods)
  );
  message.channel.send(embed);
};
