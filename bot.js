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
			let count = 0;
			let deleteUnpinned = () => {
				message.channel.fetchMessages({limit: 100 })
					.then(messages => {
						let messagesArray = messages.array();
						for (i = 0; i < messagesArray.length; i++) {
							if (!messagesArray[i].pinned) {
								messagesArray[i].delete()
									.then(function() {
										count++;
										if (count >= 100) {
											deleteUnpinned();
										}
									})
									.catch(function() {
										count++;
										if (count >= 100) {
											deleteUnpinned();
										}
									})
							}
						}
					})
					.catch(console.error);
			}
			deleteUnpinned();
			message.channel.send(":fire:");
			message.channel.send(":boxing_glove:");
			message.channel.send("Balance achieved.");
		}else{
			message.channel.send("**Confirm the channel you're on.**");
			message.channel.send("I need to be sure you know what you're about to do.");
			message.channel.send(`Type \`${config.prefix} ${snapTrigger}\` to snap this channel.`);
			message.channel.send("**This will DELETE all unpinned messages in this channel. You have been warned.**");
		}
	}else{
		message.channel.send("Fun isn't something one considers when balancing a Discord server.");
		message.channel.send(`Type \`${config.prefix} ${snapTrigger}\`. When I'm done, all pinned messages on this channel will still exist.`);
		message.channel.send("**This will DELETE all unpinned messages in this channel. You have been warned.**");
	}
});

client.login(config.token);
