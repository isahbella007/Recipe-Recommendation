const cheerio = require("cheerio");
const axios = require("axios");
const data = require("./recipeLink.json");

const getRecipe = async (url) => {
        console.log(url)
};

// for every recipe link in the file, make a request
// for (let i = 0; i < data.length; i++) {
//   url = data[i];
//   getRecipe(url)
//   setTimeout(()=>{ 
//       getRecipe(url);
//     }, 4000)
// }

var count = 0
console.log("file: recipes.js ~ line 21 ~ interval ~ data", data.length)
const interval = setInterval(function(){
    url = data[count];
    getRecipe(url.recipe_link)
    ++count;
 }, 1000);
