import { GiphyFetch } from "@giphy/js-fetch-api";
import { GIPHY_API_TOKEN } from "@env";

const giphyFetch = new GiphyFetch(GIPHY_API_TOKEN || "");

function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}

export default {
  async searchRandomGit(term) {
    const randomNumber = generateRandomNumber();

    const { data: gifResponse } = await giphyFetch.search(term, {
      limit: 1,
      offset: randomNumber,
    });

    return [gifResponse[0].url];
  },
};
