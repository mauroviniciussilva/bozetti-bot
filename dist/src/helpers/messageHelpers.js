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
  return message.content.replace("!", "").split(/ +/g);
}

function getCommand(message) {
  var args = extractArgsFromMessage(message);
  return args.shift().toLowerCase();
}