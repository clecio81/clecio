const Discord = require("discord.js");
const db = require("quick.db");
const quiz = [
  {
    q:
      "https://static.quizur.com/i/b/5991edb8f1b867.86218545Design%20sem%20nome%20(18).png ",
    p: "**quantas diferenças você encontrou?**",
    a: ["1"]
  },
  {
    q:
      "https://lh3.googleusercontent.com/XTw84aLo2OLAEWEIc66-grVPFmgcs8_-H171Q8bR0n7ZtzHH9FmIhFUy7mFAVxSwsT7mcCA3HOboLlOVykZODUG40Ka-MoSYuw=s320-l65",
    p: "**quantos erros você pode indentificar?**",
    a: ["3"]
  },
  {
    q:
      "https://static.quizur.com/i/b/5991f2a92fed24.01871764Design%20sem%20nome%20(19).png",
    p: " **quantos erros a nessa imagem?**",
    a: ["3"]
  },
  {
    q:
      "https://img.quizur.com/f/img5d2ea52c08b337.63680772.jpg?lastEdited=1563338051",
    p:
      "**Na maioria dos contos, é o fantasma de uma mulher que foi amaldiçoada por ter se envolvido com um padre.**",
    a: ["mula"],
    a: ["mula sem cabeça"]
  },
  {
    q:
      "https://img.quizur.com/f/img5da68d476d30c7.88918161.jpg?lastEdited=1571196305",
    p: "**qual o nome do vilão de monstros S.A?**",
    a: ["sid"],
    a: ["side"]
  },
  {
    q:
      "https://img.quizur.com/f/img5dacf3f906a2d8.26489296.jpg?lastEdited=1571615741",
    p: "**qual o nome do amor de Luíza?**",
    a: ["marcelo"]
  },
  {
    q:
      "https://img.quizur.com/f/img5dab4c404e6a69.51059493.jpg?lastEdited=1571507268",
    p:
      "**Qual a comida que Scrat, o esquilo, tenta comer em todos os filme de A Era de Gelo?**",
    a: ["nozes"],
    a: ["noz"]
  },
  {
    q:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSclnyFvp1XMm7powP5_5zVg_NvCsdQsEv9dPdM2_LTPHLjV7C2&usqp=CAU",
    p:
      "Há um pato entre dois patos, um pato atrás de um pato e um pato na frente de outro pato. De quantos patos estamos falando?",
    a: ["3 patos"],
    a: ["3"]
  }
];
const options = {
  max: 1,
  time: 30000,
  errors: ["time"]
};

exports.run = async (client, message, args) => {
  const item = quiz[Math.floor(Math.random() * quiz.length)];
  let pergunta = new Discord.MessageEmbed()
    .setTitle(`${item.p}`)
    .setImage(`${item.q}`)
    .setFooter("Você tem 30 segundos para responder");
  await message.channel.send(pergunta);
  let px = await db.fetch(`prefixos_${message.guild.id}`);
  if (px === null) px = "c!";

  try {
    const collected = await message.channel.awaitMessages(
      answer => item.a.includes(answer.content.toLowerCase()),
      options
    );
    const winnerMessage = collected.first();
    return message.channel.send({
      embed: new Discord.MessageEmbed()
        .setAuthor(
          `🎉ganhador(a)🎉: ${winnerMessage.author.tag}`,
          winnerMessage.author.displayAvatarURL
        )
        .setFooter(`digite ${px}quiz para iniciar uma nova rodada`)
        .setColor(message.guild.me.displayHexColor)
    });
  } catch (_) {
    return message.channel.send({
      embed: new Discord.MessageEmbed()
        .setAuthor("⏰tempo esgotado!⏰")
        .setTitle(`🙅`)
        .setFooter(`digite ${px}quiz para iniciar`)
    });
  }
};
