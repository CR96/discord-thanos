const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./auth.json");

client.on("message", async message => {
	if (message.author.bot) return;

	if(message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	
	const snapTrigger = `snap ${message.channel.name}`;

	if (command == 'snap') {
		if (args == message.channel.name) {
			message.channel.send("*snap*");
		}else{
			message.channel.send(`**You didn't type the channel name correctly.**`);
			message.channel.send(`I need to be sure you know what you're about to do.`);
			message.channel.send(`Type \`${config.prefix} ${snapTrigger}\` to snap this channel.`);
			message.channel.send(`**This will DELETE all unpinned messages in this channel. You have been warned.**`);
		}
	}else{
		message.channel.send("Fun isn't something one considers when balancing a Discord server.");
		message.channel.send(`Type \`${config.prefix} ${snapTrigger}\`. When I'm done, all pinned messages on this channel will still exist.`);
		message.channel.send(`**This will DELETE all unpinned messages in this channel. You have been warned.**`);
	}
});

client.login(config.token);
