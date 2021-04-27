const translate = require('translate-google')
client.on('message', message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const command = args.shift().toLowerCase();
if (command === 'tl') {
    client.commands.get('translate2').execute(message, args, client);
  }
  })