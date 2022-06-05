/* Setup

   1. Create a .env file (click add file then remane it to .env)

   2. Put "token=" (without quotes) into the .env file followed by your Discord Bot token (No spaces!)

*/

/* If you use uptimerobot to ping, delete this line and line 20

const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});

*/

const Discord = require('discord.js');
const client = new Discord.Client();
const ping = require('minecraft-server-util')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const PREFIX = '!'
client.on('message', message =>{


  
    let args = message.content.substring(PREFIX.length).split(' ')

    switch(args[0]){
        case 'mc':

            if(!args[1]) return message.channel.send('You must type a minecraft server ip')
            if(!args[2]) return message.channel.send('You must type a minecraft server port')

           ping.status(args[1], parseInt(args[2]))
         .then((reponse) =>{
           
              const Embed = new Discord.RichEmbed()
                .setTitle('Server Status')
                	  
           .setThumbnail('https://accessapi.cf/pics/bot.png')
                .setColor('#33FFDA')
               
                .addField('Server IP',args[1])
                .addField('Server Version', reponse.version.name)
                 .addField('Server Motd', reponse.motd.clean)
                .addField('Online Players', reponse.players.online)
                .addField('Max Players', reponse.players.max)
                
                message.channel.send(Embed)
            })
    .catch((error) => console.error(error))

    }

})


client.login(process.env.token);

const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.get('/', (req, res) => {
  res.send(new Date());})