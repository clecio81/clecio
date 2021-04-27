const db = require("quick.db");
const discord = require("discord.js");
const { resolveImage } = require("canvas-constructor");

const fetch = require("node-fetch");
const superagent = require("node-superfetch");
const Canvas = require("canvas");

module.exports.run = async (client, message, args) => {
  const { renderizar } = require("node-canvas-with-twemoji-and-discord-emoji");
  const renderEmoji = require("../renderEmoji/index.js");
  let user = message.mentions.users.first()
    ? message.mentions.users.first()
    : message.author;
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
    var suffixes = ["", "k", "m", "b", "t"];

    var suffixNum = Math.floor(("" + mo).length / 3);

    var shortValue = "";

    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0 ? mo / Math.pow(1000, suffixNum) : mo).toPrecision(
          precision
        )
      );

      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");

      if (dotLessShortValue.length <= 2) {
        break;
      }
    }

    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);

    dinheiro = shortValue + suffixes[suffixNum];
  }

  let sobre = await db.fetch(`sobre_${user.id}`);

  if (sobre === null) sobre = "";
  const canvas = Canvas.createCanvas(1280, 720);
  const ctx = canvas.getContext("2d");

  //========================// Import Background //========================//

  const background = await Canvas.loadImage(im);
  ctx.drawImage(background, 0, 0, 1280, 720);
  const background2 = await Canvas.loadImage(
    "https://cdn.glitch.com/c579bbc5-db8d-4eb5-a18a-3b1b8a8a69da%2F3%20Sem%20T%C3%ADtulo_20210321004142.png?v=1616298211653"
  );

  ctx.drawImage(background2, 0, 0, 1280, 720);

  //========================// Import BreakLines //========================//

  function addBreakLines(str, max) {
    max = max + 1;
    for (let i = 0; i < str.length / max; i++) {
      str =
        str.substring(0, max * i) + `\n` + str.substring(max * i, str.length);
    }
    return str;
  }

  //========================// Texts //========================//

  // Username
  ctx.textAlign = "left";
  ctx.font = '50px Segoe UI Black';
  ctx.fillStyle = "rgb(253, 255, 252)";
  ctx.fillText(
    user.username.length > 20
      ? user.username.slice(0, 20) + "..."
      : user.username,
    180,
    50
  );
  // Titles

  ctx.textAlign = "left";
  ctx.font = '30px Segoe UI Black';
  ctx.fillStyle = "rgb(253, 255, 252)";
  ctx.fillText("Cl's", 190, 90);

  ctx.fillText(message.guild.name, 190, 155);
  // Coins/XP

  ctx.textAlign = "left";
  ctx.font = '30px Segoe UI';
  ctx.fillStyle = "rgb(253, 255, 252)";
  ctx.fillText(dinheiro, 190, 120);
  ctx.fillText(
    `#${level} | ${xp} XP`,

    190,
    185
  );
let font = '';
  // Sobre
if(sobre.length <= 25){ font = '50px Segoe UI Black'
                       
}else
if(sobre.length > 25){ font = '30px Segoe UI Black'
                      
  }else{
    

if(sobre.length <= 20 ) font = '55px Segoe UI Black'
    }
  
  ctx.textAlign = "left";
  ctx.font = font
  

  ctx.fillStyle = "rgb(253, 255, 252)";
  ctx.fillText(
    addBreakLines(
      sobre,

      60
    ),

    20,

    490
  );

  /*
      ctx.font = '25px "Montserrat"';

      ctx.fillText(

        addBreakLines(

          String(

            user.about == "null"

              ? `Use ${prefix}sobremim <msg> para alterar essa mensagem`

              : user.about

          ),

          60

        ),

        20,

        490

      );
      */

  //========================// Import Avatar //========================//

  ctx.arc(100, 100, 85, 0, Math.PI * 2, true);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#faf5f5";
  ctx.stroke();
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    user.displayAvatarURL({ format: "jpeg" })
  );
  ctx.drawImage(avatar, 15, 10, 175, 175);

  //========================// Create Image //========================//

  const attach = new discord.MessageAttachment(
    canvas.toBuffer(),
    `Profile_${user.tag}_.png`
  );

  message.channel.send(attach);
};
