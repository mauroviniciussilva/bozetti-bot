import './setup';

import Discord from 'discord.js';

import { replyMessage } from './src/actions/replyMessage';

const client = new Discord.Client();

client.on('ready', () => {
	console.log(
		`O bot foi iniciado, com ${client.users.cache.size} usuários e em ${client.guilds.cache.size} servidores.`
	);
	client.user.setActivity('É Bozêtti, não Bozétti');
});

client.on('message', async (message) => {
	replyMessage(client, message, args);
});

client.login(process.env.DISCORD_TOKEN);
