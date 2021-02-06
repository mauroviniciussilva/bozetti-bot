"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.progress = exports.cron = undefined;

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cron = require("./src/classes/cron");

var _cron2 = _interopRequireDefault(_cron);

var _progress = require("./src/classes/progress");

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

global.fetch = require("node-fetch");

var cron = exports.cron = new _cron2.default();
var progress = exports.progress = new _progress2.default();

cron.setJob("0 0 10 * * 1-5", progress.sendImage.bind(progress));