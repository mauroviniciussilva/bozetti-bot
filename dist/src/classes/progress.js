"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jimp = require("jimp");

var _jimp2 = _interopRequireDefault(_jimp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Progress = function () {
  function Progress() {
    _classCallCheck(this, Progress);

    if (this.instance) {
      return this.instance;
    } else {
      this.counter = 0;
      this.client = null;
      this.channelId = null;
      Progress.prototype.instance = this;
    }
  }

  _createClass(Progress, [{
    key: "setChannelId",
    value: function setChannelId(channelId) {
      this.channelId = channelId;
    }
  }, {
    key: "setClient",
    value: function setClient(client) {
      this.client = client;
    }
  }, {
    key: "getChannel",
    value: function getChannel() {
      return this.client.channels.cache.get(this.channelId);
    }
  }, {
    key: "restartProgress",
    value: function restartProgress() {
      this.counter = 0;
    }
  }, {
    key: "buildProgress",
    value: async function buildProgress() {
      var fontSize = _jimp2.default.FONT_SANS_32_BLACK;
      var position = { left: 287, top: 49 };
      if (this.counter > 9) {
        fontSize = _jimp2.default.FONT_SANS_16_BLACK;
        position = { left: 287, top: 57 };
      }

      var font = await _jimp2.default.loadFont(fontSize);
      var image = await _jimp2.default.read("images/image.png");

      image.print(font, position.left, position.top, "" + this.counter).write("images/progress.png");

      this.counter++;
    }
  }, {
    key: "sendImage",
    value: async function sendImage() {
      if (!this.client || !this.channelId) return;

      var channel = this.getChannel();
      channel.send("", { files: ["images/progress.png"] });
    }
  }, {
    key: "buildProgressAndSendImage",
    value: async function buildProgressAndSendImage() {
      await this.buildProgress();
      this.sendImage();
    }
  }]);

  return Progress;
}();

exports.default = Progress;