"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isABotMessage = isABotMessage;
exports.isDirectMessage = isDirectMessage;
exports.extractArgsFromMessage = extractArgsFromMessage;
exports.getCommand = getCommand;
function isABotMessage(message) {
  return message.author.bot;
}

function isDirectMessage(message) {
  return message.channel.type === "dm";
}

function extractArgsFromMessage(message) {
  if (!message.content.startsWith(process.env.DISCORD_PREFIX)) return null;
  return message.content.replace(process.env.DISCORD_PREFIX, "").split(/ +/g);
}

function getCommand(message) {
  var args = extractArgsFromMessage(message);
  if (args) {
    return args.map(function (arg) {
      if (typeof arg === "string") arg.toLowerCase();
      return arg;
    });
  }
}