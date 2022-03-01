

module.exports.run = async(client,message,args) =>{
   if (!(message.author.id == '693208785929371748' || message.author.id == '693208785929371748')) return message.channel.send(` Apenas donos do bot podem usar este comando!`)

     let nome = args.join(' ')
if(!nome) return message.channel.send("id ou nome não definidos")
        const guild = client.guilds.cache.get(nome)

        message.channel.send(`saindo do server ${guild.name}...`)

        guild.leave()

        message.channel.send(`saí do server ${guild.name} com sucesso!`)

    }

