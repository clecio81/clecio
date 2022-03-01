const Discord = require ('discord.js')
const db = require ('quick.db')
exports.run = async(client, member, args) =>{
   // const langg = await db.fetch(`idioma_${member.guild.id}`)
/*
if(langg === null) langg = 'pt'
*/
 // else langg = idioma       

//onst lang = require(`../idioma/${langg}.json`) 

 if(!member.member.hasPermission('MANAGE_CHANNELS')) return member.reply("sem permissão");

 
  let texto = args.slice(0).join(' ');
  if(!texto){
    let gg = new Discord.MessageEmbed()
    // .settitle(`variaveis`)
    .addField('variáveis', "```css\n{user) menciona o usuário.\n{guild} fala o nome do servidor.\n{members} fala o total usuários no servidor.\n{space} pular de linha no texto.\n{tab}pular 2 linhas no texto.\n{name} Falar o nome do usuário```")
     return member.channel.send(gg)
    
  }else{
    db.set(`texto2_${member.guild.id}`,`${texto}`)
  
   let mensagem = texto.replace("{user}", member.author.tag).replace("{guild}", member.guild.name).replace("{members}", member.guild.members.cache.size).replace("{space}","\n").replace("{tab}", "\n\n").replace("{name}",member.author.username);    
    // texto.replace('{member}',mem
  let gg = await db.fetch(`saidas_${member.guild.id}`)
   let embed = new Discord.MessageEmbed()
   .setTitle(member.guild.name)
   .addField(`Alterado para:`, mensagem)
   member.channel.send(embed)
   // db.add(`leave_${message.guild.id}`,args[0])
}
}