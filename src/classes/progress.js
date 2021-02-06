import jimp from "jimp";

class Progress {
  constructor() {
    if (this.instance) {
      return this.instance;
    } else {
      this.counter = 0;
      this.client = null;
      this.channelId = null;
      Progress.prototype.instance = this;
    }
  }

  setChannelId(channelId) {
    this.channelId = channelId;
  }

  setClient(client) {
    this.client = client;
  }

  getChannel() {
    return this.client.channels.cache.get(this.channelId);
  }

  restartProgress() {
    this.setProgress(0);
    this.buildProgress();
  }

  setProgress(days) {
    this.counter = days;
  }

  async buildProgress() {
    let fontSize = jimp.FONT_SANS_32_BLACK;
    let position = { left: 287, top: 49 };
    if (this.counter > 9) {
      fontSize = jimp.FONT_SANS_16_BLACK;
      position = { left: 287, top: 57 };
    }

    const font = await jimp.loadFont(fontSize);
    const image = await jimp.read("images/image.png");

    image
      .print(font, position.left, position.top, `${this.counter}`)
      .write("images/progress.png");

    this.counter++;
  }

  async sendImage() {
    if (!this.client || !this.channelId) return;

    const channel = this.getChannel();
    channel.send(``, { files: ["images/progress.png"] });
  }

  async buildProgressAndSendImage() {
    await this.buildProgress();
    this.sendImage();
  }
}

export default Progress;
