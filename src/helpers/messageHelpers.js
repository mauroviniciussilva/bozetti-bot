export function isABotMessage(message) {
  return message.author.bot;
}

export function isDirectMessage(message) {
  return message.channel.type === "dm";
}

export function extractArgsFromMessage(message) {
  if (!message.content.startsWith(process.env.DISCORD_PREFIX)) return null;
  return message.content.replace(process.env.DISCORD_PREFIX, "").split(/ +/g);
}

export function getCommand(message) {
  const args = extractArgsFromMessage(message);
  if (args) {
    return args.map((arg) => {
      if (typeof arg === "string") arg.toLowerCase();
      return arg;
    });
  }
}
