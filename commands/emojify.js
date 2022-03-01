const Discord = require("discord.js");
const specialCodes = {
  "0": ":zero:",
  "1": ":one:",
  "2": ":two:",
  "3": ":three:",
  "4": ":four:",
  "5": ":five:",
  "6": ":six:",
  "7": ":seven:",
  "8": ":eight:",
  "9": ":nine:",
  "#": ":hash:",
  "*": ":asterisk:",
  "?": ":question:",
  "!": ":exclamation:",
  " ": "   ",
  "/": ":heavy_division_sign:",
  "+": ":heavy_plus_sign:",
  é: ":regional_indicator_e:",
  "-": ":heavy_minus_sign:",
  $: ":heavy_dollar_sign:"
};

module.exports.run = async (client, message, args) => {
//  if(message.author.id !== "592045792391594061") return message.channel.send("🛠️| Oops! Esse comando foi temporariamente desativado!").then(msg => msg.delete(10000));

  if (!args[0]) return message.channel.send(`>  **»** utilize: \`c!emojify\` **<mensagem>**`).then(msg => msg.delete(10000));

  const emojied = args
    .join(" ")
    .toLowerCase()
    .split("")
    .map(letter => {
      if (/[a-z]/g.test(letter)) {
        return `:regional_indicator_${letter.toLowerCase()}:`;
      } else if (specialCodes[letter]) {
        return `${specialCodes[letter]}`;
      }
    })
    .join("");
  message.channel.send(emojied).then(() => message.delete());
};

module.exports.help = {
  categoria: 'diversão',
  name: 'emojify'
}
