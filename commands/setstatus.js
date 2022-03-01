exports.run = (client, message, args) => {
    const setStatus = message.content.split(' ');

    if (!message.member.hasPermission("ADMINISTRATOR")){
      return message.channel.send(`você não tem permissão para isso.`);
    }

    else if(setStatus[1] === 'ausente'){
        client.user.setStatus('idle')
            .then(message.channel.send("meu status agora é: "+setStatus[1]))
            .catch(console.error);
    } 

    else if(setStatus[1] === 'online'){
        client.user.setStatus('online')
            .then(message.channel.send("meu status agora é: "+ setStatus[1]))
            .catch(console.error);
    }


    else if(setStatus[1] === 'dnd'){
        client.user.setStatus('invisible')
            .then(message.channel.send("meu status agora é: "+ setStatus[1] +  "(não pertube)"))
            .catch(console.error);
    }

    else{
        return message.channel.send("por favor defina meu status:, online, dnd (não pertube)");
    }
}