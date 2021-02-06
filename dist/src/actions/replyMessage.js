"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    switch (command) {
      case "ping":
        {
          var response = await message.channel.send("Ping?");
          response.edit("Pong! A Lat\xEAncia \xE9 " + (response.createdTimestamp - message.createdTimestamp) + "ms.");
          break;
        }
      case "iniciar":
        {
          _setup.progress.setChannelId(message.channel.id);
          _setup.progress.setClient(client);

          var job = _setup.cron.getJob();
          job.start();
          break;
        }
      case "parar":
        {
          var _job = _setup.cron.getJob();
          _job.stop();
          break;
        }
      case "errou":
        {
          _setup.progress.restartProgress();

          var gif = await _gifProvider2.default.searchRandomGit("disappointed");

          message.channel.send(gif);
          message.channel.send("Contagem reiniciada com sucesso. Voltamos à estaca zero.");
          break;
        }
      case "progresso":
        {
          _setup.progress.sendImage();
        }
      case "help":
        {
          message.channel.send("\n          ```\n          !ping - Validar lat\xEAncia\n          !iniciar - Inicia a contagem de dias\n          !parar - Para a contagem de dias\n          !errou - Reinicia a contagem\n          !progresso - Visualizar dias da contagem\n          ```\n        ");
        }
      default:
        {
          await message.channel.send("Eu não conheço esse comando!");
        }
    }
  }
}