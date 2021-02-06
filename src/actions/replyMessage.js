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
  if (command) {
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
        progress.buildProgressAndSendImage();

        const job = cron.getJob();
        job.start();
        break;
      }
      case "parar": {
        const job = cron.getJob();
        job.stop();

        const gif = await gifProvider.searchRandomGit("stopped");
        message.channel.send(gif);
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
      case "progresso": {
        progress.sendImage();
        break;
      }
      case "help": {
        message.channel.send(`
          \`\`\`
            !ping - Validar latência
            !iniciar - Inicia a contagem de dias
            !parar - Para a contagem de dias
            !errou - Reinicia a contagem
            !progresso - Visualizar dias da contagem
          \`\`\`
        `);
        break;
      }
      default: {
        await message.channel.send("Eu não conheço esse comando!");
      }
    }
  }
}
