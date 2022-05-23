const express = require("express");
const db_connection = require("../config/connection.js");
const router = express.Router();

router.get("/", (req, res) => {
  let { q } = req.query;
  let newString = q.replace(/\s+/g, "%")
    console.log(newString)
  db_connection.query(
    `select * from recipes where ingredients LIKE '%${newString}%' ` ,
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send((rows))
      }
    }
  );
});

module.exports = router;
