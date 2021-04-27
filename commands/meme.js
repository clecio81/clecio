const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const Color = `RANDOM`;
const db = require("quick.db");
const Fetch = require("node-fetch"); //Install Node-fetch - npm i node-fetch

module.exports.run = async (client, message, args) => {
  let id;
  let idioma = await db.fetch(`idioma_${message.guild.id}`);

  if (idioma === "pt") {
    id = "https://www.reddit.com/r/memesbr/random/.json";
  } else if (idioma === "en") {
    id = "https://www.reddit.com/r/memes/random/.json";
  } else {
    id = "https://www.reddit.com/r/memesbr/random/.json";
  }
  let res = await Fetch(id);
  const json = await res.json();

  if (!json[0]) return message.channel.send(`erro`);

  const data = json[0].data.children[0].data;

  const Embed = new MessageEmbed()

    .setColor(Color)

    .setURL(`https://reddit.com${data.permalink}`)

    .setTitle(data.title)

    .setDescription(`Author : ${data.author}`)

    .setImage(data.url)

    .setFooter(
      `${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments ||
        0} 💬`
    )

    .setTimestamp();

  return message.channel.send(Embed);
};
