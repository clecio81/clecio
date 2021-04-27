const { MessageEmbed } = require("discord.js");
const  db = require ('quick.db')
const ms = require("ms");

module.exports = {

  name: "giveaway",

  description: "Create a simple giveaway",

  usage: "<time> <channel> <prize>",

  category: "fun",

  run: async (bot, message, args) => {
    //var langg

 const langg = await db.fetch(`idioma_${message.guild.id}`)

if(langg === null) langg = 'pt'

 // else langg = idioma       

 const lang = require(`../idioma/${langg}.json`) 

 if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(lang.per.all);

    if (!args[0]) return message.channel.send(lang.sorteio.sempremio);

    if (

      !args[0].endsWith("d") &&

      !args[0].endsWith("h") &&

      !args[0].endsWith("m")

    )

      return message.channel.send(

        lang.sorteio.nunero2 

      );

    if (isNaN(args[0][0])) return message.channel.send(lang.sorteio.numero);

    let channel = message.mentions.channels.first();

   if (!channel)

      return message.channel.send(lang.sorteio.mcanal)

     

    let prize = args.slice(2).join(" ");

    if (!prize) return message.channel.send(lang.sorteio.sempremio);

    message.channel.send(lang.sorteio.scriado.replace('{{canal}}',channel))

    let Embed = new MessageEmbed()

      .setTitle(`New giveaway!`)

      .addField(lang.sorteio.descri.replace('{{criador}}',message.author.tag),
                lang.sorteio.descri2.replace('{{premio}}',prize))
     .addField(lang.sorteio.tempo.replace('{{tempo}}',args[0]),
               message.guild.name
               )
               
      .setTimestamp(Date.now() + ms(args[0]))

      .setColor(`BLUE`);

    let m = await channel.send(Embed);

    m.react("🎉");

    setTimeout(() => {

      if (m.reactions.cache.get("🎉").count <= 1) {

       return message.channel.send(

          lang.sorteio.semvencedor

        );

      }

      let winner = m.reactions.cache

        .get("🎉")

        .users.cache.filter((u) => !u.bot)

        .random();

      channel.send(

        lang.sorteio.parabens.replace('{{vencedor}}',winner)

      );

    }, ms(args[0]));

  },

};

