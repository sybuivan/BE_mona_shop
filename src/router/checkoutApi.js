const express = require("express");
const router = express.Router();
const db = require("../configs/dbConnection");

const payMethod = router.post("/checkout", (req, res, next) => {
  const orderDate = new Date().toISOString().replace("T", " ").substring(0, 19);
  // console.log(req.body);
  db.query(
    `INSERT INTO orders (orderDate, idUser, totalPrice, address) VALUES ("${orderDate}", ${req.body.params.userId}, ${req.body.params.totalPrice}, "${req.body.params.address}")`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({ msg: err });
      }
      // return res.status(401).send({
      //   msg: "Order completed successfully",
      // });
    }
  );
});

const orderDetails = router.post("/orders/details", (req, res, next) => {
  for (const order in req.params) {
    console.log("orders", order);

    //  db.query(
    //    `INSERT INTO orderdetails (idOrder, idProduct, unitPrice, quantity, discount) VALUES ("${1}", ${req.params[order]}, ${req.body.totalPrice}, "${req.body.address}")`,
    //    (err, result) => {
    //      if (err) {
    //        throw err;
    //        return res.status(400).send({ msg: err });
    //      }
    //      return res.status(401).send({
    //        msg: "Order completed successfully",
    //      });
    //    }
    //  );
  }
});

module.exports = {
  payMethod,
  orderDetails,
};
