import gifProvider from '../providers/gifProvider';
import Discord from 'discord.js';

import { progress, cron } from '../../setup';
import {
	isABotMessage,
	isDirectMessage,
	getCommand,
} from '../helpers/messageHelpers';

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function replyMessage(client, message) {
	if (isABotMessage(message)) return;
	if (isDirectMessage(message)) return;

	const role = message.guild.roles.cache.find((r) => r.name === 'Engineering');
	const membersFromRole = message.guild.roles.cache.get(role.id).members;
	console.log(membersFromRole.map((member) => member.user).length);

	const list = client.guilds.cache.get();
	list.members.forEach((member) => console.log(member.user.username));

	const command = getCommand(message);
	if (command) {
		switch (command[0]) {
			case 'ping': {
				message.react('🏓');
				const response = await message.channel.send('Ping?');
				response.edit(
					`Pong! A Latência é ${
						response.createdTimestamp - message.createdTimestamp
					}ms.`
				);
				break;
			}
			case 'iniciar': {
				message.react('👍');

				const job = cron.getJob();
				if (job.running) {
					message.channel.send('Já estou contando os dias!');
				} else {
					progress.setChannelId(message.channel.id);
					progress.setClient(client);
					progress.restartProgress();
					progress.buildProgressAndSendImage();
					job.start();
				}
				break;
			}
			case 'parar': {
				message.react('👍');

				const job = cron.getJob();
				if (job.running) {
					job.stop();
					progress.restartProgress();
					const gif = await gifProvider.searchRandomGit('stopped');
					message.channel.send(gif);
				} else {
					message.channel.send(
						'Eu ainda nem comecei a contar os dias e você já está pedindo para eu parar?'
					);
				}
				break;
			}
			case 'errou': {
				message.react('🤦🏽');

				const job = cron.getJob();

				if (job.running) {
					progress.restartProgress();

					const gif = await gifProvider.searchRandomGit('disappointed');

					message.channel.send(gif);
					message.channel.send(
						'Contagem reiniciada com sucesso. Voltamos à estaca zero.'
					);
				} else {
					message.channel.send(
						'Ainda bem que eu não tinha começado a contagem ainda, não é mesmo?'
					);
				}
				break;
			}
			case 'progresso': {
				message.react('👍');
				progress.sendImage();
				break;
			}
			case 'mudar-progresso': {
				const [, days] = command;
				if (Number.isInteger(parseInt(days))) {
					message.react('👍');
					progress.setProgress(command[1]);
					progress.buildProgressAndSendImage();
				} else {
					message.channel.send(
						'Digite um número para que eu possa reconfigurar a contagem de dias!'
					);
				}
				break;
			}
			case 'mostrar-pronuncia': {
				message.react('🗣️');
				message.channel.send('É assim que se pronuncia!', {
					files: ['bozetti.mp3'],
				});
				break;
			}
			case 'sortear-responsabilidades': {
				const haveExclude = command[1] === '-not';
				const membersNotIncluded = ['Felipe Mulhbaier', 'mauroV'];

				if (haveExclude) {
					const membersToExclude = command[2].split(',');
					membersToExclude.forEach((member) => {
						membersNotIncluded.push(member);
					});
				}

				const role = message.guild.roles.cache.find(
					(r) => r.name === 'Engineering'
				);

				const membersFromRole = message.guild.roles.cache.get(role.id).members;
				const members = membersFromRole
					.map((member) => member.user)
					.filter((user) => !membersNotIncluded.includes(user.username));

				const membersCount = members.length;
				const maxIndex = membersCount - 1;

				const luckyIndexForCodeReview = getRandomInt(0, maxIndex);
				const luckyIndexForTest = getRandomInt(0, maxIndex);

				const drawnMemberCodeReview = members[luckyIndexForCodeReview];
				const drawnMemberTest = members[luckyIndexForTest];

				message.channel.send(
					`Fala <@${drawnMemberCodeReview.id}>! Você é o escolhido da semana para ser responsável pela coluna de **Revisão** no Board!`
				);

				message.channel.send(
					`Fala <@${drawnMemberTest.id}>! Você é o escolhido da semana para ser responsável pela coluna de **Teste** no Board!`
				);
				break;
			}

			case 'help': {
				message.react('ℹ️');
				message.channel.send(`
\`\`\`
!ping - Validar latência
!iniciar - Inicia a contagem de dias
!parar - Para a contagem de dias
!errou - Reinicia a contagem
!progresso - Visualizar dias da contagem
!mudar-progresso - Recebe um argumento para modificar o progresso do contador
!mostrar-pronuncia - Enviarei um arquivo de áudio com a pronúncia correta
!sortear-responsabilidades - Faz um sorteio entre os membros da role 'Engineering' para distribuir responsabilidades do Board
!sortear-responsabilidades -not Usuario1,Usuario2 - Faz um sorteio entre os membros da role 'Engineering' para distribuir responsabilidades do Board, excluindo os usuários informados
\`\`\`
        `);
				break;
			}
			default: {
				await message.channel.send('Eu não conheço esse comando!');
			}
		}
	}
}
