const cheerio = require("cheerio");
const axios = require("axios");
const data = require("../../constants/recipeLink.json");
const db_connection = require('../../config/connection')
const pretty = require("pretty");

oliver = [];
const continent = "Europe"; 
const getRecipe = async (url) => {
  // make the request to the url
  const response = await axios(url);
  const body = await response.data;

  // load the page using cheerio
  const $ = cheerio.load(body);

  // target tags in the page and get the name, duration, diffculty and image
  $(".col-xs-12.col-lg-9").each((i, element) => {
    const recipe_details = {
      image: "",
      name: "",
      cooking_time: "",
      recipe_link: "",
      ingredients: ""
    };

    recipe_details.ingredients = $(element).find("ul.ingred-list>li").text().replace(/\s+/g, " ").trim()
   
    recipe_details.image = $(element)
      .find("div.hero-wrapper > img")
      .attr("src");

    recipe_details.name = $(element).find("h1.hidden-xs").text();

    recipe_details.cooking_time = $(element)
      .find("div.recipe-detail.time")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    recipe_details.recipe_link = url;

   

    // Add to the database 
    db_connection.query("INSERT INTO recipes (recipe_name, recipe_image,recipe_link, cooking_time, ingredients, continent) VALUES (?, ?,?,?,?,?)", 
    [recipe_details.name, recipe_details.image, recipe_details.recipe_link, recipe_details.cooking_time, recipe_details.ingredients, continent], 
    (error, rows)=> { 
      if(error){ 
        console.log(error)
      }else{ 
        console.log("Added")
      }
    }
    )

    // add the object to the array
    oliver.push(recipe_details);
 
  });
  // console.log(oliver);
};

var count = 0;

// console.log("file: recipes.js ~ line 21 ~ interval ~ data", data.length);

const interval = () => {
  setInterval(function () {
    url = data[count];
    getRecipe(url.recipe_link);
    ++count;
  }, 1000);
};

module.exports = interval;
