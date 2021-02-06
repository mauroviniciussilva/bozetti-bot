export function isABotMessage(message) {
  return message.author.bot;
}

export function isDirectMessage(message) {
  return message.channel.type === "dm";
}

export function extractArgsFromMessage(message) {
  return message.content.replace(process.env.DISCORD_PREFIX, "").split(/ +/g);
}

export function getCommand(message) {
  const args = extractArgsFromMessage(message);
  return args.shift().toLowerCase();
}
