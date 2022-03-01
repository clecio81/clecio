const Discord = require('discord.js')

const db = require('quick.db')
exports.run = async (client, message, args) => {
  if(message.guild.id =! 739275317344206921) {
    return;
}else {
 let ip = args[0]
 let stts = args.slice(1).join(" ");
 if(!ip) return message.channel.send("indique o ip do servidor");
 if(!stts) return message.channel.send("indique o ip do servidor");
  db.set(`ip_739275317344206921`,ip)
  db.set(`stts_739275317344206921`,stts)
  message.channel.send(`Ip: ${ip}, status: ${stts}`)
  }
  }
