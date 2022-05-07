const express = require("express");
const router = require("./routes/index")

const app = express();
app.use(router)
app.listen(8000, () => console.log("server running on port 8000"));

module.exports = app;