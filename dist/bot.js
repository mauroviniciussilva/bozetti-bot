"use strict";

require("./setup");

var _discord = require("discord.js");

var _discord2 = _interopRequireDefault(_discord);

var _replyMessage = require("./src/actions/replyMessage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _discord2.default.Client();

client.on("ready", function () {
  console.log("O bot foi iniciado, com " + client.users.cache.size + " usu\xE1rios e em " + client.guilds.cache.size + " servidores.");
  client.user.setActivity("É Bozêtti, não Bozétti");
});

client.on("message", async function (message) {
  (0, _replyMessage.replyMessage)(client, message);
});

client.login(process.env.DISCORD_TOKEN);