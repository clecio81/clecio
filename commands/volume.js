const { MessageEmbed } = require("discord.js");
const db = require ("quick.db");

const sendError = require("../musica/erro");

module.exports = {

  info: {

    name: "volume",

    description: "To change the server song queue volume",

    usage: "[volume]",

    aliases: ["v", "vol"],

  },

  run: async function (client, message, args) {
    var langg = await db.fetch(`idiomas_${message.guild.id}`)
 if (langg === null) langg = "pt";

    // else langg = idioma

    var lang = require(`../idioma/${langg}.json`);


    const channel = message.member.voice.channel;

    if (!channel)return sendError(lang.música.entrarerro, message.channel);

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) return sendError("Não há nada tocando neste servidor.", message.channel);

    if (!args[0])return message.channel.send(`${lang.música.volume} **${serverQueue.volume}**`);

     if(isNaN(args[0])) return message.channel.send(':notes: apenas números!').catch(err => console.log(err));

    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('Você não pode definir o volume para mais de 150. ou menor que 0',message.channel).catch(err => console.log(err));

    serverQueue.volume = args[0]; 

    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    let xd = new MessageEmbed()

    .setDescription(`${lang.música.volumepara}**${args[0]/1}/100**`)

    .setAuthor("🎤 Volume 🎤")
    .setColor("BLUE")

    return message.channel.send(xd);

  },

};