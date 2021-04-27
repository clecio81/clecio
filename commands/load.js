const Discord = require('discord.js');

const backup = require('discord-backup');


exports.run = async (bot,message,args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')){

        return message.channel.send(":x: Você precisa ter permissão de administrador para criar um backup!");

    }

    const backup_id = args[0];

    backup.fetch(backup_id).then(async () => {

        // If the backup exists, request for confirmation

        const confirm_embed = new Discord.MessageEmbed()

            .setColor("#ff0015")

            
            .setDescription("\\⚠️ Quando o backup for executado, todos os canais, cargos, etc, vão ser substituidos! Digite `confirm` para confirmar!\n Algumas mensagens tais como: regras, diretrizes, registro etc... poderam ser restauradas")

       
            .setFooter(message.author.username,message.author.avatarURL() || message.author.defaultAvatarURL)

            .setTimestamp();

        message.channel.send(confirm_embed);

        await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm"), {

            max: 1,

            time: 20000,

            errors: ["time"]

        }).catch(async (err) => {

            // if the author of the commands does not confirm the backup loading

            const unconfirmed_embed = new Discord.MessageEmbed()

                .setColor("#ff0015")

            
                .setDescription("\\❌ O tempo expirou, backup cancelado!")

             
                .setFooter(message.author.username,message.author.avatarURL() || message.author.defaultAvatarURL)

                .setTimestamp();

            return message.channel.send(unconfirmed_embed);

        });

        // When the author of the command has confirmed that he wants to load the backup on his server

        const confirmed_embed = new Discord.MessageEmbed()

            .setColor("#ff0015")

          
            .setDescription("\\✅ Iniciando carregamento do backup!")

        
            .setFooter(message.author.username,message.author.avatarURL() || message.author.defaultAvatarURL)

            .setTimestamp();

        message.author.send(confirmed_embed);

        // Load the backup

        backup.load(backup_id, message.guild).then(async () => {

            const loaded_embed = new Discord.MessageEmbed()

                .setColor("#ff0015")

           
                .setDescription("\\✅ Backup carregado com sucesso!")

           
                .setFooter(message.author.username,message.author.avatarURL() || message.author.defaultAvatarURL)

                .setTimestamp();

            return message.author.send(loaded_embed);

        }).catch(async (err) => {

            const load_err_embed = new Discord.MessageEmbed()

                .setColor("#ff0015")

           
                .setDescription("\\❌ Erro ao carregar o backup, verifique se tenho permissão de administrador!")

          
                .setFooter(message.author.username,message.author.avatarURL() || message.author.defaultAvatarURL)

                .setTimestamp();

            return message.author.send(load_err_embed);

        });

    }).catch(async (err) => {

        const find_err_embed = new Discord.MessageEmbed()

            .setColor("#ff0015")

       
            .setDescription(`❌ Nenhum backup encontrado por ${backup_id}!`)

           
            .setTimestamp();

        return message.channel.send(find_err_embed);

    });

};