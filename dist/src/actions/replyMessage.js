'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.replyMessage = replyMessage;

var _gifProvider = require('../providers/gifProvider');

var _gifProvider2 = _interopRequireDefault(_gifProvider);

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _setup = require('../../setup');

var _messageHelpers = require('../helpers/messageHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function replyMessage(client, message) {
	if ((0, _messageHelpers.isABotMessage)(message)) return;
	if ((0, _messageHelpers.isDirectMessage)(message)) return;

	var role = message.guild.roles.cache.find(function (r) {
		return r.name === 'Engineering';
	});
	var membersFromRole = message.guild.roles.cache.get(role.id).members;
	console.log(membersFromRole.map(function (member) {
		return member.user;
	}).length);

	var command = (0, _messageHelpers.getCommand)(message);
	if (command) {
		switch (command[0]) {
			case 'ping':
				{
					message.react('🏓');
					var response = await message.channel.send('Ping?');
					response.edit('Pong! A Lat\xEAncia \xE9 ' + (response.createdTimestamp - message.createdTimestamp) + 'ms.');
					break;
				}
			case 'iniciar':
				{
					message.react('👍');

					var job = _setup.cron.getJob();
					if (job.running) {
						message.channel.send('Já estou contando os dias!');
					} else {
						_setup.progress.setChannelId(message.channel.id);
						_setup.progress.setClient(client);
						_setup.progress.restartProgress();
						_setup.progress.buildProgressAndSendImage();
						job.start();
					}
					break;
				}
			case 'parar':
				{
					message.react('👍');

					var _job = _setup.cron.getJob();
					if (_job.running) {
						_job.stop();
						_setup.progress.restartProgress();
						var gif = await _gifProvider2.default.searchRandomGit('stopped');
						message.channel.send(gif);
					} else {
						message.channel.send('Eu ainda nem comecei a contar os dias e você já está pedindo para eu parar?');
					}
					break;
				}
			case 'errou':
				{
					message.react('🤦🏽');

					var _job2 = _setup.cron.getJob();

					if (_job2.running) {
						_setup.progress.restartProgress();

						var _gif = await _gifProvider2.default.searchRandomGit('disappointed');

						message.channel.send(_gif);
						message.channel.send('Contagem reiniciada com sucesso. Voltamos à estaca zero.');
					} else {
						message.channel.send('Ainda bem que eu não tinha começado a contagem ainda, não é mesmo?');
					}
					break;
				}
			case 'progresso':
				{
					message.react('👍');
					_setup.progress.sendImage();
					break;
				}
			case 'mudar-progresso':
				{
					var _command = _slicedToArray(command, 2),
					    days = _command[1];

					if (Number.isInteger(parseInt(days))) {
						message.react('👍');
						_setup.progress.setProgress(command[1]);
						_setup.progress.buildProgressAndSendImage();
					} else {
						message.channel.send('Digite um número para que eu possa reconfigurar a contagem de dias!');
					}
					break;
				}
			case 'mostrar-pronuncia':
				{
					message.react('🗣️');
					message.channel.send('É assim que se pronuncia!', {
						files: ['bozetti.mp3']
					});
					break;
				}
			case 'sortear-responsabilidades':
				{
					var haveExclude = command[1] === '-not';
					var membersNotIncluded = ['Felipe Mulhbaier', 'mauroV'];

					if (haveExclude) {
						var membersToExclude = command[2].split(',');
						membersToExclude.forEach(function (member) {
							membersNotIncluded.push(member);
						});
					}

					var _role = message.guild.roles.cache.find(function (r) {
						return r.name === 'Engineering';
					});

					var _membersFromRole = message.guild.roles.cache.get(_role.id).members;
					var members = _membersFromRole.map(function (member) {
						return member.user;
					}).filter(function (user) {
						return !membersNotIncluded.includes(user.username);
					});

					var membersCount = members.length;
					var maxIndex = membersCount - 1;

					var luckyIndexForCodeReview = getRandomInt(0, maxIndex);
					var luckyIndexForTest = getRandomInt(0, maxIndex);

					var drawnMemberCodeReview = members[luckyIndexForCodeReview];
					var drawnMemberTest = members[luckyIndexForTest];

					message.channel.send('Fala <@' + drawnMemberCodeReview.id + '>! Voc\xEA \xE9 o escolhido da semana para ser respons\xE1vel pela coluna de **Revis\xE3o** no Board!');

					message.channel.send('Fala <@' + drawnMemberTest.id + '>! Voc\xEA \xE9 o escolhido da semana para ser respons\xE1vel pela coluna de **Teste** no Board!');
					break;
				}

			case 'help':
				{
					message.react('ℹ️');
					message.channel.send('\n```\n!ping - Validar lat\xEAncia\n!iniciar - Inicia a contagem de dias\n!parar - Para a contagem de dias\n!errou - Reinicia a contagem\n!progresso - Visualizar dias da contagem\n!mudar-progresso - Recebe um argumento para modificar o progresso do contador\n!mostrar-pronuncia - Enviarei um arquivo de \xE1udio com a pron\xFAncia correta\n!sortear-responsabilidades - Faz um sorteio entre os membros da role \'Engineering\' para distribuir responsabilidades do Board\n!sortear-responsabilidades -not Usuario1,Usuario2 - Faz um sorteio entre os membros da role \'Engineering\' para distribuir responsabilidades do Board, excluindo os usu\xE1rios informados\n```\n        ');
					break;
				}
			default:
				{
					await message.channel.send('Eu não conheço esse comando!');
				}
		}
	}
}