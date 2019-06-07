/*
		DiscordJS Beginners Guide for making Bots 
			By Paradise
			
		{!} This guide assumes you are using Visual Studio Code
										*/
								
// So for starters make sure you have the following files in your workspace (directory)

/* 
	- index.js (could be anything you want really)
	- config.json (config to store prefix, token etc.)
	- package.json (this is where your packages go)
								*/
								
// Lets start with `config.json`

/*
	{
		"token" : "tokenHere",
		"prefix" : "whateverPrefix"
	}
	
	And save it
						*/
						
// So now that we got the config out of the way open the terminal if it's closed Terminal > Open Terminal

// In the terminal type `npm i discord.js --save` and wait for it to extract the package

// Now go into your index.js file or whatever you named it

const Discord = require('discord.js'); // This is the discord.js package you downloaded
const bot = new Discord.Client({disableEveryone: true}); // This basically tells that the bot can be called by using `bot` you can name it client too (as some people do)
const config = require('./config.json'); // Remember the config you made earlier? Yeah now it's in your bot file and knows what to look for when you refer to config

// Keep in mind you can name it whatever you like either `config` or `cfg` whatever you like as long as you know what it is

// To make the bot login is pretty simple
bot.login(config.token); // If you named config `cfg` it would be `cfg.token`


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online.`); // This prints in the terminal that your bot is online
        bot.user.setPresence({
            game: {
                name: `with discord.js`,
                type: "PLAYING", // Activities are PLAYING, LISTENING, WATCHING & STREAMING
                url: "https://www.twitch.tv/YouCanPutYourTwitchHere"
            }
        });
  });
  
bot.on("message", async message => {

    if(message.author.bot) return; // Doesn't execute the command if the author is a bot
    if(message.channel.type === "dm") return; // Doesn't execute if the command was sent in dms
 
    let prefix = config.prefix; // Your prefix
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0]; // This allows you to use if(cmd === `${prefix}blabla`)
    let args = messageArray.slice(1); // Args are like [prefix]slap args[0] args[1] args[2] etc. So args[0] could be like the user you mentioned (That is how a slap command is made or anything that has to do with mentioning users)

    if(cmd === `${prefix}ping`) {
	message.channel.send('Pong!');
    } 
	// This is a basic ping command
	
    /*if(cmd === `${prefix}ping`){ 
        return message.channel.send(bot.ping + "ms") && message.react('🏓');
    }*/
    // This is a more cool ping command as it sends the bots ping and reacts with the ping pong emoji
    // The way you get emojis is like \:wink: and it gives you the unicode version of the wink emoji 
    // '\' is just used to escape it
    
    
    
    // To give you a basic idea of how args in commands work along with mentioning a user I will make a simple kick command with random messages
    
    
    if(cmd === `${prefix}kick`) {
	let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); // This gets the user you mentioned as args[0]
	if(!kickUser) return message.channel.send('Give me someone to kick.'); // This just returns if you didn't mention anyone
	const msgs = [" kicks ${kickUser} in the nuts.", " kicks ${kickUser} in the stomach leaving him with no air.", " whips out a Bruce Lee kick to ${kickUser}'s head K.O.'ing him."]; // This is just an array of messages
	var randmsg = msgs[Math.floor(Math.random() * msgs.length)]; // This is what makes it return a random msg from the array
	message.channel.send(message.author.id + randmsg);
    }
    
    // And that is basically it for the basics
    // I hope this helped you :)
    // If you require any additional assistance you can join my bot's support server and ask me anything you like! Or even just to chill and talk *shrugs*
    // https://discord.gg/Z5XVSGz
});