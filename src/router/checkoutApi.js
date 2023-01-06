const express = require('express');
const router = express.Router();
const db = require('../configs/dbConnection');

const payMethod = router.post('/checkout', (req, res, next) => {
  const orderDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
  db.query(
    `INSERT INTO orders (orderDate, idUser, totalPrice, address) VALUES ("${orderDate}", ${req.body.params.userId}, ${req.body.params.totalPrice}, "${req.body.params.address}")`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Order completed successfully',
        result: result,
      });
    }
  );
});

const orderDetails = router.post('/orders/details', (req, res, next) => {
  const { idOrder, cartList } = req.body.params;
  var querys =
    'INSERT INTO orderdetails(idOrder, idProduct, unitPrice, quantity) VALUES';
  for (const item of cartList) {
    const unitPrice = item.product.price * item.quantity;
    querys += `(${idOrder}, ${item.id},${unitPrice}, ${item.quantity}),`;
  }
  console.log(querys.substring(0, querys.length - 1));
  db.query(querys.substring(0, querys.length - 1), (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({ msg: err });
    }
    return res.status(200).send({
      msg: 'Order completed successfully',
    });
  });
});

const getIdOrder = router.get('/orders/getIdOrder', (req, res, next) => {
  db.query(
    'SELECT idOrder from orders ORDER BY idOrder DESC LIMIT 1',
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Order completed successfully',
        result: result,
      });
    }
  );
});

const getCarts = router.get('/get-carts/:idUser', (req, res, next) => {
  const { idUser } = req.params;
  db.query(
    `SELECT * from carts, product, productimages
    where product.idProduct = carts.idProduct and product.idProduct = productimages.idProduct and idUser = '${idUser}'`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get Carts completed successfully',
        result: result,
      });
    }
  );
});

const addToCart = router.post('/add-to-cart', (req, res, next) => {
  const { idUser, idProduct, quantity } = req.body;

  db.query(
    `INSERT INTO carts(idUser, idProduct, quantity) VALUES(${idUser}, ${idProduct}, ${quantity})`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({ msg: 'Add to cart feild' });
      }
      return res.status(200).send({
        msg: 'Add to cart completed successfully',
      });
    }
  );
});

module.exports = {
  payMethod,
  orderDetails,
  getIdOrder,
  addToCart,
  getCarts,
};
