exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Você não possui permissão.");
  message.channel.send('**enviei as configurações de segurança em suas mensagens diretas (DM)**')
    message.author.send({
        "embed": {
            "title": `Defesa`,
            "color": 123406,
            "timestamp": new Date(),
            "footer": {
                "icon_url": message.author.displayAvatarURL,
                "text": message.author.username
            },
            "fields": [
                {
                  "name": `📖 - Mostra a defesa atual`,
                  "value": `*Nivel de proteção atual*`
                },
                {
                  "name": `🔐 - Altera para a recomandada (2)`,
                  "value": `*Alterar para nivel 2 de proteção (Recomendado)*`,
                  "inline": false
                },
                {
                  "name": `🔓 - Remove a segurança (NENHUM)`,
                  "value": `*Remover toda a segurança do servidor.*`,
                  "inline": false
                }
            
            

]
}

    }).then(help => {
  
        setTimeout(() => {
            help.react('📖');
        }, 500);
        setTimeout(() => {
            help.react('🔐');
        }, 600);
        setTimeout(() => {
            help.
            react('🔓');
        }, 600);
  
        const collector = help.createReactionCollector((r, u) => (r.emoji.name === '📖' || r.emoji.name === `🔓` || r.emoji.name === '🔐') && u.id !== client.user.id);
  
        collector.on('collect', r => {
            switch(r.emoji.name) {
  
            case '📖':


            let level = message.guild.verificationLevel;
            if(level === 0) level = 'nenhum'
            if(level === 2) level = 'baixo (recomendo)'
              message.channel.send(`0 nivel da desefa é **${level}**`)           
                            
                
              break;

              case '🔐':
                let level2 = message.guild.verificationLevel
                if(level2 === 2) level2 = 'baixo (recomendo)'
              message.guild.setVerificationLevel(2)
              message.channel.send(`${message.author.tag} mudou a segurança do servidor para ${level2} `)
             message.channel.send(`**segurança alterada para ${level2}**`)
              break;

              case '🔓':
                let level0 = message.guild.verificationLevel
                if(level0 === 0) level0 = 'nenhum'
              message.guild.setVerificationLevel(0)
              message.channel.send(`${message.author.tag} mudou a segurança do servidor para **${level0}**`);
              message.channel.send(`**segurança alterada para ${level0}**`)
       setTimeout(() => {
            help.delete();
        }, 1 * 60 * 1000);
  
    }



})
    })

}