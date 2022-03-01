const db = require ("quick.db");
const Discord = require ('discord.js');
                    
module.exports = async (guild, member) => {
  
try{
        db.push(`servidores,${guild.id}`).then

 console.log(`servidor ${guild.name} adicionado`)
  
}catch(e){
  console.log(e)
  }
  }
  
