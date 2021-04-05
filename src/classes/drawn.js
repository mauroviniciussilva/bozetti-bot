class DrawnResponsabilities {
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

	getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	drawn() {
		const people = ['Matheus Silvério', 'Maique Almeida', 'Gabriel Naville'];
	}
}

export default DrawnResponsabilities;
