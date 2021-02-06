import dotenv from "dotenv";
import Cron from "./src/classes/cron";
import Progress from "./src/classes/progress";

dotenv.config();

global.fetch = require("node-fetch");

export const cron = new Cron();
export const progress = new Progress();

cron.setJob(
  "0 0 10 * * 1-5",
  progress.buildProgressAndSendImage.bind(progress)
);
