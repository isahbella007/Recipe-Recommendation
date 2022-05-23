const express = require("express");
const router = require("./routes/index")
const cors = require("cors")
const env = require('dotenv')

const app = express();
app.use(express.json())
app.use(cors({ 
    origin: "*"
}))

app.use("/api/v1/recipes",router)

env.config({path: './.env'})
const port = process.env.PORT
app.listen(port, () => console.log("server running on port ",port));

module.exports = app;