const express = require("express");
const router = express.Router();
const db = require("../configs/dbConnection");

const routerCategories = router.get("/category", (req, res, next) => {
  db.query("SELECT * FROM category", (err, result) => {
    // user does not exists
    if (err) {
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    if (!result.length) {
      return res.status(401).send({
        msg: "Data category is incorrect!",
      });
    } else {
      return res.status(200).send({
        msg: "Get category in successfully!",
        category: result,
      });
    }

  });
});

module.exports = {
   routerCategories
};
