const { MessageEmbed } = require("discord.js");
const sendError = require("../musica/erro");

module.exports = {
  info: {
    name: "loop",
    description: "Toggle music loop",
    usage: "loop",
    aliases: ["l"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `🔁  **|**  Loop está **\`${serverQueue.loop === true?"ativo" : "desativado"}\`**`
                }
            });
        };
    return sendError("Não há nada tocando neste servidor.", message.channel);
  },
};
