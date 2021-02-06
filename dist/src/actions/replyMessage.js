"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.replyMessage = replyMessage;

var _gifProvider = require("../providers/gifProvider");

var _gifProvider2 = _interopRequireDefault(_gifProvider);

var _setup = require("../../setup");

var _messageHelpers = require("../helpers/messageHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function replyMessage(client, message) {
  if ((0, _messageHelpers.isABotMessage)(message)) return;
  if ((0, _messageHelpers.isDirectMessage)(message)) return;

  var command = (0, _messageHelpers.getCommand)(message);
  if (command) {
    switch (command[0]) {
      case "ping":
        {
          message.react("🏓");
          var response = await message.channel.send("Ping?");
          response.edit("Pong! A Lat\xEAncia \xE9 " + (response.createdTimestamp - message.createdTimestamp) + "ms.");
          break;
        }
      case "iniciar":
        {
          message.react("👍");
          _setup.progress.setChannelId(message.channel.id);
          _setup.progress.setClient(client);
          _setup.progress.buildProgressAndSendImage();

          var job = _setup.cron.getJob();
          job.start();
          break;
        }
      case "parar":
        {
          message.react("👍");

          var _job = _setup.cron.getJob();
          _job.stop();

          var gif = await _gifProvider2.default.searchRandomGit("stopped");
          message.channel.send(gif);
          break;
        }
      case "errou":
        {
          message.react("🤦🏽");
          _setup.progress.restartProgress();

          var _gif = await _gifProvider2.default.searchRandomGit("disappointed");

          message.channel.send(_gif);
          message.channel.send("Contagem reiniciada com sucesso. Voltamos à estaca zero.");
          break;
        }
      case "progresso":
        {
          message.react("👍");
          _setup.progress.sendImage();
          break;
        }
      case "mudar-progresso":
        {
          var _command = _slicedToArray(command, 2),
              days = _command[1];

          if (Number.isInteger(parseInt(days))) {
            message.react("👍");
            _setup.progress.setProgress(command[1]);
            _setup.progress.buildProgressAndSendImage();
          } else {
            message.channel.send("Digite um número para que eu possa reconfigurar a contagem de dias!");
          }
          break;
        }
      case "mostrar-pronuncia":
        {
          message.react("🗣️");
          message.channel.send("É assim que se pronuncia!", {
            files: ["bozetti.mp3"]
          });
          break;
        }
      case "help":
        {
          message.react("ℹ️");
          message.channel.send("\n```\n!ping - Validar lat\xEAncia\n!iniciar - Inicia a contagem de dias\n!parar - Para a contagem de dias\n!errou - Reinicia a contagem\n!progresso - Visualizar dias da contagem\n!mudar-progresso - Recebe um argumento para modificar o progresso do contador\n!mostrar-pronuncia - Enviarei um arquivo de \xE1udio com a pron\xFAncia correta\n```\n        ");
          break;
        }
      default:
        {
          await message.channel.send("Eu não conheço esse comando!");
        }
    }
  }
}