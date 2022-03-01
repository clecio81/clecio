const Discord = require("discord.js");

const Jimp = require("jimp");

const db = require("quick.db");

const client = new Discord.Client();

module.exports.run = async (client, message, args) => {

var langs = await db.fetch(`idioma_${message.guild.id}`)

if(!langs) langs = 'pt';

  var lang = require (`../idioma/${langs}.json`)

  // let user   = message.mentions.users.first() || message.author;

  let user = message.mentions.users.first()

    ? message.mentions.users.first()

    : message.author;

  let ig = await user.displayAvatarURL({ format: "png" });

  let vips = await db.fetch(`bronze_${user.id}`);

  if (vips === null) vips = "";

  //let user2 = message.guild.member.name || message.author.user

  let fonte = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  let fonte2 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  let im = await db.fetch(`im_${user.id}`);

  if (im === null)

    im =

      "https://cdn.discordapp.com/attachments/793293336797904940/794195999005868062/images_5.png";

  let level = await db.fetch(`level_${user.id}_${message.guild.id}`);

  if (level === null) level = "0";

  let xp = await db.fetch(`xp__${message.guild.id}_${user.id}`);

  if (xp === null) xp = "0";

  let mo = await db.fetch(`cls_${user.id}`);

  if (mo === null) mo = "0";

  

    var dinheiro = mo;

    if (mo >= 1000) {

        var suffixes = ["", "k", "m", "b","t"];

        var suffixNum = Math.floor( (""+mo).length/3 );

        var shortValue = '';

        for (var precision = 2; precision >= 1; precision--) {

            shortValue = parseFloat( (suffixNum != 0 ? (mo/ Math.pow(1000,suffixNum) ) : mo).toPrecision(precision));

            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');

            if (dotLessShortValue.length <= 2) { break; }

        }

        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);

        dinheiro = shortValue+suffixes[suffixNum];

    }

  

  let sobre = await db.fetch(`sobre_${user.id}`);

  if (sobre === null) sobre = "";

  if (im === null)

    im =

      "https://cdn.discordapp.com/attachments/702653256773533777/702663850062774292/desconhecido.gif";

  let background = await Jimp.read(im);

  let vip = await Jimp.read(

    "https://cdn.discordapp.com/attachments/467390020920147978/487778059315838987/emote.png"

  );

  let fundo = await Jimp.read(

    "https://cdn.discordapp.com/attachments/464270386943623188/495551967461113877/Sem_Titulo-1.png"

  );

  let perfil = await Jimp.read(

    "https://cdn.discordapp.com/attachments/464270386943623188/518807327114264577/Camada_1.png"

  );

  let mascara = await Jimp.read(

    "https://cdn.discordapp.com/attachments/464270386943623188/495569487395946496/mask_exagonal.png"

  );

  let img = await Jimp.read(

    "https://cdn.discordapp.com/attachments/464270386943623188/518807328053657610/Camada_2.png"

  );

  let iconvip = await Jimp.read(

    "https://cdn.discordapp.com/attachments/464270386943623188/501865675346935818/Vip_Borda_-_Bronze_1.png"

  );

  let staff = await Jimp.read(

    "https://images.emojiterra.com/twitter/v12/512px/1f6e0.png"

  );

  message.channel

    .send(lang.profile.loading.replace("{{user}}",user.username))

			setTimeout(() => { client.user.lastMessage.delete() }, 2025);

      Jimp.read(ig).then(avatar => {

        avatar.resize(212, 212);

        mascara.resize(212, 212);

        vip.resize(90, 80);

        avatar.mask(mascara, 0, 0);

        background.resize(564, 284);

        iconvip.resize(212, 212);

        staff.resize(90, 80);

        img.resize(701, 463);

        img.composite(background, 0, 0).write("profile.png");

        img.composite(perfil, 0, 0).write("profile.png");

        img.composite(avatar, 430, 118).write("profil.png");

        img.print(fonte, 93, 240, user.username).write("profile.png");

        img.print(fonte2, 582, 50, `${level}`);

        img.print(fonte, 389, 389, xp);

        img.print(fonte, 40, 345, sobre);

        img.print(fonte, 389, 330, dinheiro);

        let dvl = "693208785929371748";

        if (vips.includes(user.id)) {

          img.composite(vip, 590, 390).write("profile.png");

        }

        let gg = "693208785929371748";

        if (gg.includes(user.id)) {

          img.composite(staff, 588, 300).write("profile.png");

        }

        img.print(fonte, 93, 240, `${user.username}`).write("profile.png");

        message.channel.send(``, { files: ["profile.png"] });

      

      console.log("Imagem enviada para o Discord");

    })

    

.catch(err => {

      console.log(err);

      let embed = new Discord.MessageEmbed()

        .setColor("f0000")

        .setDescription(

lang.profile.erro

        );

      message.channel.send(embed);

    })

  

};