const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const getSeonkyoungRecipes = async () => {
  try {
    let headers = {
      "user-agent": 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Mobile Safari/537.36',
      Referer: "https://google.com",
      DNT: "1",
    };
    const url = "https://www.yummly.com/page/seonkyounglongest";

    // Make the request to the page
    request = await axios(url, headers);
    const body = await request.data;
    // Load the page using cheerio

    const $ = cheerio.load(body)
    console.log(pretty(($.html())))
    // get the links

    // save them in the file
  } catch (error) {
    console.log(error);
  }
};

module.exports = getSeonkyoungRecipes;
