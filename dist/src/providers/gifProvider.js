"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsFetchApi = require("@giphy/js-fetch-api");

var giphyFetch = new _jsFetchApi.GiphyFetch(process.env.GIPHY_API_TOKEN || "");

function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}

exports.default = {
  searchRandomGit: async function searchRandomGit(term) {
    var randomNumber = generateRandomNumber();

    var _ref = await giphyFetch.search(term, {
      limit: 1,
      offset: randomNumber
    }),
        gifResponse = _ref.data;

    return [gifResponse[0].url];
  }
};