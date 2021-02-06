import cron from "cron";

class Cron {
  constructor() {
    if (this.instance) {
      return this.instance;
    } else {
      this.job = null;
      Cron.prototype.instance = this;
    }
  }

  getJob() {
    return this.job;
  }

  setJob(cronTime, callback) {
    this.clearPreviousJob();
    this.job = new cron.CronJob(cronTime, callback);
  }

  clearPreviousJob() {
    if (this.job) this.job.stop();
  }
}

export default Cron;
