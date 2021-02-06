import gifProvider from "../providers/gifProvider";

import { progress, cron } from "../../setup";
import {
  isABotMessage,
  isDirectMessage,
  getCommand,
  findEmoji,
} from "../helpers/messageHelpers";

export async function replyMessage(client, message) {
  if (isABotMessage(message)) return;
  if (isDirectMessage(message)) return;

  const command = getCommand(message);
  if (command) {
    switch (command[0]) {
      case "ping": {
        message.react("🏓");
        const response = await message.channel.send("Ping?");
        response.edit(
          `Pong! A Latência é ${
            response.createdTimestamp - message.createdTimestamp
          }ms.`
        );
        break;
      }
      case "iniciar": {
        message.react("👍");

        const job = cron.getJob();
        if (job.running()) {
          message.channel.send("Já estou contando os dias!");
        } else {
          progress.setChannelId(message.channel.id);
          progress.setClient(client);
          progress.buildProgressAndSendImage();
          job.start();
        }
        break;
      }
      case "parar": {
        message.react("👍");

        const job = cron.getJob();
        if (!job.running()) {
          job.stop();
          const gif = await gifProvider.searchRandomGit("stopped");
          message.channel.send(gif);
        } else {
          message.channel.send(
            "Eu ainda nem comecei a contar os dias e você já está pedindo para eu parar?"
          );
        }
        break;
      }
      case "errou": {
        message.react("🤦🏽");

        const job = cron.getJob();
        const isRunning = job.running();

        console.log(isRunning);

        if (!isRunning) {
          message.channel.send(
            "Ainda bem que eu não tinha começado a contagem ainda, não é mesmo?"
          );
        } else {
          progress.restartProgress();

          const gif = await gifProvider.searchRandomGit("disappointed");

          message.channel.send(gif);
          message.channel.send(
            "Contagem reiniciada com sucesso. Voltamos à estaca zero."
          );
        }
        break;
      }
      case "progresso": {
        message.react("👍");
        progress.sendImage();
        break;
      }
      case "mudar-progresso": {
        const [, days] = command;
        if (Number.isInteger(parseInt(days))) {
          message.react("👍");
          progress.setProgress(command[1]);
          progress.buildProgressAndSendImage();
        } else {
          message.channel.send(
            "Digite um número para que eu possa reconfigurar a contagem de dias!"
          );
        }
        break;
      }
      case "mostrar-pronuncia": {
        message.react("🗣️");
        message.channel.send("É assim que se pronuncia!", {
          files: ["bozetti.mp3"],
        });
        break;
      }
      case "help": {
        message.react("ℹ️");
        message.channel.send(`
\`\`\`
!ping - Validar latência
!iniciar - Inicia a contagem de dias
!parar - Para a contagem de dias
!errou - Reinicia a contagem
!progresso - Visualizar dias da contagem
!mudar-progresso - Recebe um argumento para modificar o progresso do contador
!mostrar-pronuncia - Enviarei um arquivo de áudio com a pronúncia correta
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
