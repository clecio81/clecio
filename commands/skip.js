const { Util, MessageEmbed } = require("discord.js");

const sendError = require("../musica/erro");

module.exports = {

  info: {

    name: "skip",

    description: "To skip the current music",

    usage: "",

    aliases: ["s"],

  },

  run: async function (client, message, args) {

    const channel = message.member.voice.channel

    if (!channel)return sendError("Sinto muito, mas você precisa estar em um canal de voz para tocar música!", message.channel);

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue)return sendError("Não há nada tocando que eu pudesse pular para você.", message.channel);

        if(!serverQueue.connection)return

if(!serverQueue.connection.dispatcher)return

     if (serverQueue && !serverQueue.playing) {

      serverQueue.playing = true;

      serverQueue.connection.dispatcher.resume();

      let xd = new MessageEmbed()

      .setDescription("▶ retomada para você")

      .setColor("YELLOW")

      .setTitle("A música foi retomada!")

       

   return message.channel.send(xd).catch(err => console.log(err));

      

    }

       try{

      serverQueue.connection.dispatcher.end()

      } catch (error) {

        serverQueue.voiceChannel.leave()

        message.client.queue.delete(message.guild.id);

        return sendError(`:notes: O player parou e a fila foi limpa.: ${error}`, message.channel);

      }

    message.react("✅")

  },

};

