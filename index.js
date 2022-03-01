const { Discord, Collection, Client, MessageEmbed } = require("discord.js");
const Constants = require("discord.js/src/util/Constants.js");

Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;
const client = new Client();

const talkedRecently = new Set();

//menssagem aleatória

const fs = require("fs");

const jimp = require("jimp");

const config = require("./config.json");

//const messages = require("./messages/messages.json");

const db = require("quick.db");

const cooldown = require("./cooldown.js");

const utils = require("./utils.js");

fs.readdir("./events/", (err, evtFiles) => {
  console.log(`[LOG] Carregando ${evtFiles.length} eventos.[CARREGAMENTO]`);

  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];

    const event = require(`./events/${file}`);

    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./commands/", (err, evtFiles) => {
  console.log(`[LOG] Carregando ${evtFiles.length} Comandos.[CARREGAMENTO]`);
});

//site.

const http = require("http");

const express = require("express");
const session = require("express-session");
const app = express();
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", __dirname + "/public");
require("./dashboard/dashboard")(client);
client.on("message", async message => {
  let levellock = await db.fetch(`locklevel_${message.guild.id}`);

  if (levellock === "sim") return undefined;

  let msg = message.content.toLowerCase();

  if (message.author.bot) return undefined;

  let user = message.author;

  let xp = await db.fetch(`xp__${message.guild.id}_${user.id}`);

  if (xp === null) xp = 0;

  let level = await db.fetch(`level_${user.id}_${message.guild.id}`);

  if (level === null) level = 0;

  let total_points = await db.fetch(
    `total_points_${message.guild.id}_${user.id}`
  );

  if (total_points === null) total_points = 0;

  if (!cooldown.is(user.id)) {
    cooldown.add(user.id);

    var add = Math.floor(Math.random() * 15) + 10;

    let total = xp + level;

    db.add(`xp__${message.guild.id}_${user.id}`, add);

    db.add(`total_points_${message.guild.id}_${user.id}`, add);

    setTimeout(() => {
      cooldown.remove(user.id);
    }, 1000 * 60);
  }

  while (xp >= utils.need(level + 1)) {
    if (xp >= utils.need(level + 1)) {
      db.subtract(`xp__${message.guild.id}_${user.id}`, utils.need(level + 1));

      db.add(`level_${user.id}_${message.guild.id}`, 1);

      xp = await db.fetch(`xp__${message.guild.id}_${user.id}`);

      level = await db.fetch(`level_${user.id}_${message.guild.id}`);
      let msg_lv = await db.fetch(`lv_menssagem_${message.guild.id}`);
      if (!msg_lv) msg_lv = `Você subiu para o level {level}`;
let need = utils.need(level+1);
      let gg = db.all().filter(i => i.ID.startsWith(`total_points_${message.guild.id}_`)).sort((a, b) => b.data - a.data);


    let place = gg.map(m => m.ID).indexOf(`total_points_${message.guild.id}_${message.author.id}`) + 1 || "0";

    gg.length = 10;

  
      let canal_lv = await db.fetch(`lv_canal_${message.guild.id}`);

  const canal = message.guild.channels.cache.find(ch => ch.id === canal_lv);

  let mensagem = msg_lv

    .replace("{user}", user.tag)

    .replace("{guild}", message.guild.name)

    .replace("{level}",level)

.replace("{need}", need)
    .replace("{xp}",xp)

    .replace("{username}", user.username)
      .replace("{rank}",place);

      if(canal){
canal.send(mensagem) 
        }else{
          

       message.channel.send(mensagem)
          }
    }
  }
});

let cluster = Math.floor(Math.random() * 1000);

let n = Math.floor(Math.random() * 20);

client.on("ready", () => {
  let activities = [
      `Utilize c!help para obter ajuda`,

      `Estou atualmente conectado no cluster ${n} [${cluster}]`,

      `${client.guilds.cache.size} servidores!`,

      `Nunca pare de sonhar 😊💕 cluster ${n} [${cluster}]`,

      `${client.channels.cache.size} canais!`,

      `Estou atualmente conectado no cluster ${n} [${cluster}]`,

      `${client.users.cache.size} usuários!`,

      `utilize c!bug para reportar algum bug que você encontrou`
    ],
    i = 0;

  setInterval(
    () =>
      client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }),

    20 * 20
  );
});
client.on(`message`, message => {

  if (message.content === `testar_entrada`)

    client.emit(`guildMemberAdd`, message.member);

});

client.on(`message`, message => {

  if (message.content === `testar_saida`)

    client.emit(`guildMemberRemove`, message.member);

});
client.on("guildMemberAdd", async member => {
  let id = await db.fetch(`cargos_${member.guild.id}`);

  let cargo = member.guild.roles.cache.get(id);

  if (!cargo) return;

  await member.roles.add(cargo);
});

client.on("message", async message => {
  let id = await db.fetch(`idioma_${message.guild.id}`);

  if (id === null) id = "pt";

  const lang = require(`./idioma/${id}.json`);

  let gg = await db.fetch(`prefixos_${message.guild.id}`);

  if (gg === null) gg = "c!";

  if (
    message.content.includes("@here") ||
    message.content.includes("@everyone")
  )
    return false;
  if (message.content === `<@${client.user.id}>`)
    return client.api.channels(message.channel.id).messages.post({
      data: {
        content: lang.pref.replace("{prefixo}", gg).replace("{prefixo2}", gg),

        message_reference: {
          message_id: message.id,

          guild_id: message.guild.id,

          channel_id: message.channel.id
        }
      }
    });

  let msg = message.content.toLowerCase();

  if (message.author.bot) return undefined;

  if (message.channel.type === "dm") return;

  const setFixedT = function(translate) {
    const t = translate;
  };

  if (message.content.indexOf(gg) !== 0) return;

  const talkedRecently = new Set();
});
//comandos personalizado
client.on("message", async message => {
  if (message.author.bot) return;

  let prefix = await db.get(`prefixos_${message.guild.id}`);

  if (prefix === null) prefix = "c!";

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let cmdx = db.get(`cmd_${message.guild.id}`);

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd);

    if (cmdy) message.channel.send(cmdy.responce);
  }
});

client.on("message", async message => {
  let id = await db.fetch(`idioma_${message.guild.id}`);

  if (id === null) id = "pt";

  const lang = require(`./idioma/${id}.json`);

  if (message.author.bot) return;

  let prefixos = await db.fetch(`prefixos_${message.guild.id}`);

  if (prefixos === null) prefixos = "c!";

  let black = await db.fetch(`black_${message.author.id}`);

  if (black === "sim")
    return message.channel.send(lang.banido.replace("{{prefix}}", prefixos));

  if (talkedRecently.has(message.author.id)) {
    client.api.channels(message.channel.id).messages.post({
      data: {
        content: `${lang.cool}`,

        message_reference: {
          message_id: message.id,

          guild_id: message.guild.id,

          channel_id: message.channel.id
        }
      }
    });

    // message.channel.send(`${message.author.username} Calma ai,aguarde 3s altes de usar outro comando`)
  } else {
    if (message.channel.type == "dm") return;
    if (message.content === prefixos) return;
    let command = message.content.split(" ")[0];

    command = command.slice(prefixos.length);

    let args = message.content

      .slice(prefixos.length)

      .trim()

      .split(" ");

    let cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(prefixos)) return;

    try {
      delete require.cache[require.resolve(`./commands/${command}.js`)];

      let prefixes = {
        prefixos: prefixos
      };

      let commandFile = require(`./commands/${command}.js`);

      if (commandFile) {
        commandFile.run(client, message, args);

        db.add(`executados_${client.id}`, +1);
        

        let servidores = await db.fetch(`servidores`,`${message.guild.id}`)

        if(servidores){
          db.set(`servidores`,`${message.guild.id}`)
          }else{
            return;
            }


      }
    } catch (e) {
      console.log(e.stack);
    }
  }

  talkedRecently.add(message.author.id);

  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 5000);
});

client.login(process.env.TOKEN);
