const express = require("express");

const passport = require("passport");

const session = require("express-session");

const Strategy = require("passport-discord").Strategy;

const config = require("../config.json");

const db = require("quick.db");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const Discord = require("discord.js");

const app = express();

const MemoryStore = require("memorystore")(session);

module.exports = async client => {
  const anúncios = passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((obj, done) => done(null, obj));

  passport.use(
    new Strategy(
      {
        clientID: config.id,

        clientSecret: config.clientSecret,

        callbackURL: `${config.domain}/authorize/callback`,

        scope: ["identify", "guilds"]
      },
      (_accessToken, _refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
      }
    )
  );

  app.use(
    session({
      store: new MemoryStore({ checkPeriod: 86400000 }),

      secret: "81223844edi",

      resave: false,

      saveUninitialized: false
    })
  );

  app.use(passport.initialize());

  app.use(passport.session());

  app.locals.domain = config.domain.split("//")[1];

  app.set("view engine", "ejs");

  app.set("views", `${__dirname}/views`);

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  const renderizar = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,

      path: req.path,

      user: req.isAuthenticated() ? req.user : null
    };

    res.render(`${__dirname}/${template}`, Object.assign(baseData, data));
  };

  const checkAuth = async (req, res, next) => {
    if (req.isAuthenticated()) return next();

    req.session.backURL = req.url;

    res.redirect("/authorize");
  };

  app.get("/", async (req, res) => {
    async function getIP(req) {
      const IP = req.connection.remoteAddress.slice(7);

      const country = await fetch(`http://api.db-ip.com/v2/free/${IP}`).then(
        info => info.json()
      );

      if (IP != "86.25.177.233") {
        return country;
      }
    }

    const country = await getIP(req);

    console.log(
      `IP Conectado: ${country.ipAddress}, Location:${country.city}, ${country.countryName}.`,
      "website"
    );

    renderizar(res, req, "index.ejs", {
      bot: client,
      id: client.id
    });
  });

  app.get("/dashboard", checkAuth, (req, res) =>
    renderizar(res, req, "dashboard.ejs", {
      perms: Discord.Permissions,
      bot: client
    })
  );
  app.get("/leaderboard", checkAuth, (req, res) =>
    renderizar(res, req, "leaderboard.ejs")
  );

  app.get("/comandos", (req, res) => renderizar(res, req, "comandos"));

  app.get("/daily-sucess", (req, res) => res.redirect("/daily"));

  app.get("/policy", (req, res) => renderizar(res, req, "policy"));

  app.get("/authorize", (_req, res) =>
    res.redirect(
      `https://discord.com/oauth2/authorize?response_type=code&&client_id=${config.id}&redirect_uri=${config.domain}/authorize/callback&scope=identify guilds`
    )
  );

  app.get("/invite", (_req, res) =>
    res.redirect(
      `https://discord.com/oauth2/authorize?client_id=${config.id}&scope=bot&permissions=8`
    )
  );

  app.get(
    "/authorize/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    (req, res) => {
      if (req.session.backURL) {
        const url = req.session.backURL;

        req.session.backURL = null;

        res.redirect(url);
      } else {
        res.redirect("/");
      }
    }
  );

  app.get("/logout", (req, res) => {
    req.session.destroy(() => {
      req.logout();

      res.redirect("/");
    });
  });

  app.get("/vote", async (req, res) => {
    let database = (await db.get("vote-db")) || "Não encontrado";
    let nome = [];
    for (let obj of database) nome.push(obj.name) || "não encontrado";
    let img = [];

    for (let obj of database) img.push(obj.img) || "não encontrado";

    let id = [];

    for (let obj of database) id.push(obj.id) || "não encontrado";
    renderizar(res, req, "vote", {
      nome: nome,
      imagens: img,
      id: id
    });
  });

  app.get("/vote/:ID", async (req, res) => {
    let database = (await db.get("vote-db")) || "Não encontrado";
    let nome = [];
    for (let obj of database) nome.push(obj.name) || "não encontrado";
    let img = [];

    for (let obj of database) img.push(obj.img) || "não encontrado";

    let id = [];

    for (let obj of database) id.push(obj.id) || "não encontrado";
    renderizar(res, req, "vote", {
      user: nome,
      imagens: img,
      id: id
    });
  });
  app.post("/vote", async (req, res) => {
    renderizar(res, req, "vote", {});
  });
  app.get("/dashboard/:guildID/welcome", checkAuth, async (req, res) => {
    var verificado = "";
    var vl = "";
    var emit = "";
    const guild = client.guilds.cache.get(req.params.guildID);

    if (!guild) return res.redirect("/dashboard");
    let id_cargo = await db.fetch(`cargos_${guild.id}`);
    let cargos = guild.roles.cache.get(id_cargo) || null;
    let idurl = guild.id;
    const member = guild.members.cache.get(req.user.id) || null;

    if (!member) return res.redirect("/dashboard");

    if (!member.permissions.has("MANAGE_GUILD"))
      return res.redirect("/dashboard");

    let levellock = await db.fetch(`locklevel_${guild.id}`);

    if (!levellock || "não") vl = "checked";

    var prefixo = await db.get(`prefixos_${guild.id}`);

    if (prefixo === null) prefixo = config.dprefix;

    let cmdx = db.get(`cmd_${guild.id}`) || "não encontrado";

    let arr = [];

    for (let obj of cmdx) arr.push(obj.name) || "não encontrado";
    let id2 = (await db.fetch(`exite_${member.guild.id}`)) || null;

    let id = (await db.fetch(`canal_${member.guild.id}`)) || null;

    var canall = guild.channels.cache.get(id) || null;

    let texto = await db.fetch(`texto2_${member.guild.id}`);

    if (!texto)
      texto = `{user} seja bem vindo(a) {space} agora temos {members} membros`;

    var canal2 = guild.channels.cache.get(id2) || null;

    let texto2 = await db.fetch(`entrada_${member.guild.id}`);

    if (!texto2)
      texto2 = `{user} saiu do servidor {space} agora temos {members} membros`;

    const guildx = client.guilds.cache.get(guild);

    renderizar(res, req, "welcome.ejs", {
      canal: canall,
      canal2: canal2,
      guild,
      mensagem_entrada: texto,
      mensagem_saida: texto2,
      listacmd: arr,
      cargo: cargos,
      alert: null,
      vl: vl,
      emit: emit
    });
  });

  app.post("/dashboard/:guildID/welcome", async (req, res) => {
    let emit = "";
    const guild = client.guilds.cache.get(req.params.guildID);
if(req.params.guildID) res.send(req.params.guildID)
    if (req.body.emit === "sim") {
      emit = "sim";
      let alerts = "Mensagem de teste enviada";

      client.emit(`guildMemberRemove`, req.user.member);
    } else {
      let alerts = "Suas configurações foram atualizadas";
      const {
        mensagem_entrada,
        mensagem_saida,
        canal_entrada,
        canal_saida,
        cargo
      } = req.body;
      let id = await db.fetch(`canal_${req.params.guildID}`)|| null;
      let id2 = await db.fetch(`exite_${req.params.guildID}`) || null;


      let texto = await db.fetch(`texto2_${req.params.guildID}`);

      if (!texto)
        texto = `{user} seja bem vindo(a) {space} agora temos {members} membros`;


      let texto2 = await db.fetch(`entrada_${req.params.guildID}`);

      if (!texto2)
        texto2 = `{user} saiu do servidor {space} agora temos {members} membros `;

      const guildx = client.guilds.cache.get(req.params.guildID);

      db.set(`canal_${req.params.guildID}`, canal_entrada);

      db.set(`exite_${req.params.guildID}`, canal_saida);

   //   db.set(`entrada_${req.params.guildID}`, mensagem_saida);
      db.set(`cargos_${req.params.guildID}`, cargo);
    //  db.set(`texto2_${req.params.guildID}`, mensagem_entrada);
      
    }
  });

  app.get("/dashboard/:guildID/level", checkAuth, async (req, res) => {
    var verificado = "";
    var vl = "";
    const guild = client.guilds.cache.get(req.params.guildID);

    if (!guild) return res.redirect("/dashboard");
    let id = (await db.fetch(`lv_canal_${guild.id}`)) || null;
    var canall = guild.channels.cache.get(id) || null;
    let msg_lv = await db.fetch(`lv_menssagem_${guild.id}`);
    var level = await db.fetch(`locklevel_${guild.id}`);

    if (!msg_lv) msg_lv = `Você subiu para o level {level}`;
    var leveloption = "";

    if (canall) {
      leveloption = 2;
    } else if (level === "sim") {
      leveloption = 0;
    } else if (!canall) {
      leveloption = 1;
    }

    renderizar(res, req, "level.ejs", {
      msg: msg_lv,
      guild,
      alert: null,
      canal: canall,
      LevelOption: leveloption,
      vl: vl
    });
  });

  app.post("/dashboard/:guildID/level", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);

    if (!guild) return res.redirect("/dashboard");

    const member = guild.members.cache.get(req.user.id);

    if (!member) return res.redirect("/dashboard");

    var vl = "";
    var canal = req.body;
    let id = (await db.fetch(`lv_canal_${guild.id}`)) || null;
    var level = await db.fetch(`locklevel_${guild.id}`);
    var canall = guild.channels.cache.get(id) || null;
    let msg_lv = await db.fetch(`lv_menssagem_${guild.id}`);

    if (!msg_lv) msg_lv = `Você subiu para o level {level}`;
    let leveloption = "";
    if (req.body.LevelAnnouncement == "Canal customizado") {
      db.set(`lv_canal_${guild.id}`, req.body.lv_canal);
      if (level == "sim") {
        db.set(`locklevel_${guild.id}`, "não");
      } else {
        return;
      }
      if (canall) leveloption = 2;
    } else if (req.body.LevelAnnouncement == "Desabilitado") {
      if (level === "sim") leveloption = 0;

      db.delete(`lv_canal_${guild.id}`);

      db.set(`locklevel_${guild.id}`, "sim");
    } else {
      if (!canall) leveloption = 1;
      db.delete(`lv_canal_${guild.id}`);

      db.delete(`lv_menssagem_${guild.id}`);
    }
    db.set(`lv_menssagem_${guild.id}`, req.body.lv_mensagem);

    renderizar(res, req, "level.ejs", {
      msg: msg_lv,

      guild,

      alert: "Suas configurações foram salvas",

      canal: canall,

      LevelOption: leveloption,

      vl: vl
    });
  });

  app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);

    if (!guild) return res.redirect("/dashboard");

    const member = guild.members.cache.get(req.user.id);

    if (!member) return res.redirect("/dashboard");

    if (!member.permissions.has("MANAGE_GUILD"))
      return res.redirect("/dashboard");

    var storedSettings = await db.get(`prefixos_${guild.id}`);

    if (storedSettings === null) storedSettings = config.dprefix;

    let cmdx = db.get(`cmd_${guild.id}`) || "não encontrado";

    let arr = [];

    for (let obj of cmdx) arr.push(obj.name) || "não encontrado";

    renderizar(res, req, "settings", {
      guild,

      prefix: storedSettings,

      listacmd: arr,

      alert: null
    });
  });
  app.post("/dashboard/:guildID", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);

    if (!guild) return res.redirect("/dashboard");

    const member = guild.members.cache.get(req.user.id);

    if (!member) return res.redirect("/dashboard");

    if (!member.permissions.has("MANAGE_GUILD"))
      return res.redirect("/dashboard");

    var storedSettings = await db.get(`prefixos_${guild.id}`);

    if (storedSettings === null) storedSettings = config.dprefix;

    db.set(`prefixos_${guild.id}`, req.body.prefix);

    let data = {
      name: req.body.cmdname,

      responce: req.body.cmdresponce
    };

    db.push(`cmd_${guild.id}`, data);

    renderizar(res, req, "settings.ejs", {
      guild,

      prefix: req.body.prefix,

      listacmd: null,

      alert: "Suas configurações foram salvas."
    });
  });

  app.get("/daily", checkAuth, async (req, res) => {
    const ms = require("parse-ms");

    var dinheiro = 1500;

    let timeout = 86400000;

    let atual = await db.fetch(`cls_${req.user.id}`);

    let daily = (await db.fetch(`tempos_${req.user.id}`)) || null;

    if (daily !== null && timeout - (Date.now() - daily) > 0)
      var time = ms(timeout - (Date.now() - daily)) || null;

    if (!time) time = 0;

    renderizar(res, req, "daily", {
      time: time,

      horas: null,

      minutos: null,

      segundos: null,

      atual: atual,

      dinheiro: 1500,

      alert: null
    });
  });

  app.post("/daily", checkAuth, async (req, res) => {
    const ms = require("parse-ms");

    let atual = await db.fetch(`cls_${req.user.id}`);

    let timeout = 86400000;

    let amount = 500;

    let ganhar = Math.floor(Math.random() * 10000);

    let daily = await db.fetch(`tempos_${req.user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0)
      var time = ms(timeout - (Date.now() - daily)) || null;

    db.add(`cls_${req.user.id}`, req.body.dinheiro);

    db.set(`tempos_${req.user.id}`, Date.now());

    renderizar(res, req, "daily", {
      time: time,
      atual: atual,

      dinheiro: ganhar,

      alert: `Você acaba de resgatar ${ganhar} cl's`
    });
  });
};
app.listen(config.port, () => {
  console.log(`site on na porta: ${config.port}.`);
});
