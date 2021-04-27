const Discord = require('discord.js')
const moment = require("moment")
const db = require('quick.db')
moment.locale("pt-BR")
exports.run = async (client,message,args)=>{
        let idiomas = await db.fetch(`idioma_${message.guild.id}`)   
 if(idiomas === null) idiomas = 'pt';
 const lang = require(`../idioma/${idiomas}.json`) 
 let format = ""
 if(idiomas === 'pt')format = 'LLLL' || 'YYYY HH:mm:ss'
        if (!message.guild.available) return;
    
    
        let guild;
    
        if (args[0]) {
            guild = client.guilds.get(args[0]);
        } else {
            guild = message.guild;
        }
    
        let serverRegion = {
            'amsterdam': ':flag_nl: Amsterdã',
            'brazil': ':flag_br: Brasil',
            'eu-central': ':flag_eu: Europa Central',
            'eu-west': ':flag_eu: Europa Ocidental',
            'frankfurt': ':flag_de: Frankfurt',
            'hongkong': ':flag_hk: Hong Kong',
            'japan': ':flag_jp: Japão',
            'london': ':flag_gb: Londres',
            'russia': ':flag_ru: Russia',
            'singapore': ':flag_sg: Singapura',
            'sydney': ':flag_au: Sydney',
            'us-central': ':flag_us: EUA Central',
            'us-east': ':flag_us: EUA Oriental',
            'us-west': ':flag_us: EUA Ocidental',
            'us-south': ':flag_us: EUA Sul',
        }[guild.region];

        let online = message.guild.members.cache.filter(a => a.presence.status == "online").size;
        let ocupado = message.guild.members.cache.filter(a => a.presence.status == "dnd").size;
        let stream = message.guild.members.cache.filter(a => a.presence.status == "stream").size;
        let ausente = message.guild.members.cache.filter(a => a.presence.status == "idle").size;
        let offline = message.guild.members.cache.filter(a => a.presence.status == "offline").size;
        let bot = message.guild.members.cache.filter(a => a.user.bot).size;
        let totalmembros = message.guild.memberCount;
       let dono = message.guild.owner.user.username
       let canaistexto = message.guild.channels.cache.filter(a => a.type === "text").size;
        let canaisvoz = message.guild.channels.cache.filter(a => a.type === "voice").size;
        let msgembed = {
            embed: {
                title: "Informações do Servidor:",
                fields: [
                    {
                        name: "",
                        value: "",
                        inline: true,
                    },
                ]
            }};
        let embed = new Discord.MessageEmbed()
            .setTitle(lang.about.t)
            .addField(":globe_with_meridians: *ID:* ", `${message.guild.id}`, true)
            .addField(":earth_americas: *Região*:", `${serverRegion}`, true)
            .addField("💻 *Nome do servidor*", `${message.guild.name}`, true)
          .addField(`${lang.about.owner}`, `${dono}`, true)
            .addField("😝  Emojis", `\`\`\`${message.guild.emojis.cache.size}\`\`\``, true)
            .addField(":diamond_shape_with_a_dot_inside:  Cargos", `\`\`\`${message.guild.roles.cache.size}\`\`\``, true)
            .addField(` 💠 ${lang.about.Ca}`, `\`\`\`${canaistexto+canaisvoz}\`\`\``, true)
            .addField(` 📝 ${lang.about.Ca}`, `\`\`\`${canaistexto}\`\`\``, true)
            .addField(`:speaking_head: ${lang.about.Ca}`, `\`\`\`${canaisvoz}\`\`\``, true)
            .addField(` ${lang.about.Mem}`, `\`\`\`${totalmembros}\`\`\``, true)
            .addField(":information_desk_person: Pessoas" ,`\`\`\`${message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot).size}\`\`\``, true)
            .addField("🤖 *Bots*", `\`\`\`${bot}\`\`\``, true)
            .addField("💚 online", `\`\`\`${online}\`\`\``, true)
            .addField(` ⏳ ${lang.about.a}`, `\`\`\`${ausente}\`\`\``, true)
            .addField(`💤 ${lang.about.o}`, `\`\`\`${ocupado}\`\`\``, true)
            .addField(`🎥${lang.about.s}`, `\`\`\`${stream}\`\`\``, true)
            .addField("⚪ *Offline:*", `\`\`\`${offline}\`\`\``)
            .addField(`:watch: ${lang.about.time}`, `${moment(message.guild.createdAt).format(format)}`)
            //.setThumbnail(`${message.guild.iconURL}`)
            .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
            .setColor("#ff0022")
            .setTimestamp();

    message.channel.send(embed)    
}