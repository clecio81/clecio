const Discord = require ('discord.js')
exports.run =(cleint, message,arga) =>{
  
let  guild = message.guild;
   let ling = {
        'amsterdam': 'https://www.reddit.com/r/memes/random/.json',
     'eu-central':'https://www.reddit.com/r/memes/random/.json',
   
     'brazil':'https://www.reddit.com/r/memesbr/random/.json',
            'frankfurt': 'https://www.reddit.com/r/memes/random/.json',
            'hongkong': 'https://www.reddit.com/r/memes/random/.json',
            'japan': 'https://www.reddit.com/r/memes/random/.json',
            'london': 'https://www.reddit.com/r/memes/random/.json',
            'russia': 'https://www.reddit.com/r/memes/random/.json',
            'singapore': 'https://www.reddit.com/r/memes/random/.json',
            'sydney': 'https://www.reddit.com/r/memes/random/.json',
            'us-central': 'https://www.reddit.com/r/memes/random/.json',
            'us-east': 'https://www.reddit.com/r/memes/random/.json',
            'us-west': 'https://www.reddit.com/r/memes/random/.json',
            'us-south': 'https://www.reddit.com/r/memes/random/.json',
        }[guild.region];
  let lings = new Discord.RichEmbed()
  .setDescription(ling)
  .setThumbnail('https://cdn.discordapp.com/attachments/695761742344749127/699726881297006741/langclecio.png')
  .setTimestamp()
  message.channel.send(lings)
}