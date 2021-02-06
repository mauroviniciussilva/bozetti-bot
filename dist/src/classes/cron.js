"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cron = require("cron");

var _cron2 = _interopRequireDefault(_cron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cron = function () {
  function Cron() {
    _classCallCheck(this, Cron);

    if (this.instance) {
      return this.instance;
    } else {
      this.job = null;
      Cron.prototype.instance = this;
    }
  }

  _createClass(Cron, [{
    key: "getJob",
    value: function getJob() {
      return this.job;
    }
  }, {
    key: "setJob",
    value: function setJob(cronTime, callback) {
      this.clearPreviousJob();
      this.job = new _cron2.default.CronJob(cronTime, callback);
    }
  }, {
    key: "clearPreviousJob",
    value: function clearPreviousJob() {
      if (this.job) this.job.stop();
    }
  }]);

  return Cron;
}();

exports.default = Cron;