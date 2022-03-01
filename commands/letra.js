const { MessageEmbed } = require("discord.js");

const lyricsFinder = require("lyrics-finder");

const sendError = require("../musica/erro");

module.exports = {

  info: {

    name: "lyrics",

    description: "Get lyrics for the currently playing song",

    usage: "[lyrics]",

    aliases: ["ly"],

  },

  run: async function (client, message, args) {

    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return sendError("Não há nada tocando.",message.channel).catch(console.error);

    let lyrics = null;

    try {

      lyrics = await lyricsFinder(queue.songs[0].title, "");

      if (!lyrics) lyrics = ` Nenhuma letra encontrada para ${queue.songs[0].title}.`;

    } catch (error) {

      lyrics = `Nenhuma letra encontrada para ${queue.songs[0].title}.`;

    }

    let lyricsEmbed = new MessageEmbed()

      .setAuthor(`${queue.songs[0].title} — Letra da música`)

                 .setThumbnail(queue.songs[0].img)

      .setColor("RANDOM")

      .setDescription(lyrics)

      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)

      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;

    return message.channel.send(lyricsEmbed).catch(console.error);

  },

};

