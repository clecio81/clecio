const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  if (!message.author.id == "762459626125393920")
    return message.channel.send(
      "apelas staffs do bot podem utilizar este comando"
    );
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!user) return message.channel.send("mencione um usuário");
  let black = await db.fetch(`black_${user.id}`);
  if (black === "não") {
    db.set(`black_${user.id}`, "sim");
    message.channel.send(`${user.username} banido de usar os meus comandos`);
  } else if (black === "sim"){
     message.channel.send(`${user.username} foi removido da lista negra`);
  db.set(`black_${user.id}`,"não")
    }else {
      db.set(`black_${user.id}`,"não")
      message.channel.send(`definir dados  para ${user.username} `)
      }
};

