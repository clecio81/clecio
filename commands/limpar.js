if (mention)
      messages = messages.cache.filter(
        m => m.author.id === mention.id || m.content === message.content
      )
    
let pruned = messages.size;
    if (pruned < 2)
      
      return message.channel.send(
        "Nenhuma mensagem removível foi encontrada ."
      );
    await message.channel.bulkDelete(messages);

    message.channel
      .send(
        `:wastebasket:  |  Sucesso foram removidas ${
          pruned === amount ? pruned - 1 : pruned
         } Mensagens .`
      )
  } catch (e) {
    message.channel.send(`Falha na remoção das mensagens : ${e.message}`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pru"],
  permLevel: 0
};

exports.help = {
  name: "limpar",
  description: "Gives you a random response to a question.",
  usage: "8ball [question]"
};
