const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require('fs')


const getRecipe = async () => {
  const url = "https://www.jamieoliver.com/recipes/category/course/mains/";
  try {
    let headers = {
      "User-Agent":
        "	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://google.com",
      DNT: "1",
    };
    response = await axios(url, headers);
    const body = await response.data;
    const $ = cheerio.load(body);
    recipesLink = [];
    $(".recipe-block").each((i, element) => {
      const recipe = {
        recipe_link: "",
      };
      recipe.recipe_link = "https://www.jamieoliver.com" + $(element).find("a").attr("href");
      recipesLink.push(recipe);
    });
    console.log(recipesLink);
    
    // write the recipeLink array into recipelink.json file
    fs.writeFile("recipeLink.json", JSON.stringify(recipesLink,null,2), (error)=>{
        if(error){
            console.log(error)
            return
        }
        console.log("Successfully written data to file")
    })
    // insert into the database like this
    // for(let i = 0; i<recipes.length; i++){
    //     console.log(recipes[i].name)
    // }
  } catch (err) {
    console.log("There is an error");
    console.log(err);
  }
};

getRecipe()

