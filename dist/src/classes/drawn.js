'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawnResponsabilities = function () {
	function DrawnResponsabilities() {
		_classCallCheck(this, DrawnResponsabilities);

		if (this.instance) {
			return this.instance;
		} else {
			this.counter = 0;
			this.client = null;
			this.channelId = null;
			Progress.prototype.instance = this;
		}
	}

	_createClass(DrawnResponsabilities, [{
		key: 'setChannelId',
		value: function setChannelId(channelId) {
			this.channelId = channelId;
		}
	}, {
		key: 'setClient',
		value: function setClient(client) {
			this.client = client;
		}
	}, {
		key: 'getChannel',
		value: function getChannel() {
			return this.client.channels.cache.get(this.channelId);
		}
	}, {
		key: 'getRandomIntInclusive',
		value: function getRandomIntInclusive(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}, {
		key: 'drawn',
		value: function drawn() {
			var people = ['Matheus Silvério', 'Maique Almeida', 'Gabriel Naville'];
		}
	}]);

	return DrawnResponsabilities;
}();

exports.default = DrawnResponsabilities;