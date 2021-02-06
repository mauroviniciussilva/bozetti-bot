import gifProvider from "../providers/gifProvider";

import { progress, cron } from "../../setup";
import {
  isABotMessage,
  isDirectMessage,
  getCommand,
} from "../helpers/messageHelpers";

export async function replyMessage(client, message) {
  if (isABotMessage(message)) return;
  if (isDirectMessage(message)) return;

  const command = getCommand(message);

  switch (command) {
    case "ping": {
      const response = await message.channel.send("Ping?");
      response.edit(
        `Pong! A Latência é ${
          response.createdTimestamp - message.createdTimestamp
        }ms.`
      );
      break;
    }
    case "iniciar": {
      progress.setChannelId(message.channel.id);
      progress.setClient(client);

      const job = cron.getJob();
      job.start();
      break;
    }
    case "parar": {
      const job = cron.getJob();
      job.stop();
      break;
    }
    case "errou": {
      progress.restartProgress();

      const gif = await gifProvider.searchRandomGit("disappointed");

      message.channel.send(gif);
      message.channel.send(
        "Contagem reiniciada com sucesso. Voltamos à estaca zero."
      );
      break;
    }
    default: {
      await message.channel.send("Eu não conheço esse comando!");
    }
  }
}
