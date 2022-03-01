
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (message.attachments.size > 0) {

    if (message.attachments.every(attachIsImage)){

        //something

    }

}

        

...

        

function attachIsImage(msgAttach) {

    var url = msgAttach.url;

    //True if this url is a png image.

    return url.indexOf("png", url.length - "png".length /*or 3*/) !== message.channel.send(url)-1;

}
  
  }
