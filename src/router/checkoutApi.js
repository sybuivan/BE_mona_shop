const express = require('express');
const router = express.Router();
const db = require('../configs/dbConnection');
const uniqid = require('uniqid');

const payMethod = router.post('/checkout', (req, res, next) => {
  const orderDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const statusOrder = 0;
  db.query(
    `INSERT INTO orders (orderDate,statusOrder, idUser, totalPrice, address) VALUES ("${orderDate}",${statusOrder}, ${req.body.params.userId}, ${req.body.params.totalPrice}, "${req.body.params.address}")`,
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
  const { idOrder, cartList, idUser } = req.body.params;
  const discount = 0;
  var querys =
    'INSERT INTO orderdetails(idOrder, idProduct, unitPrice, quantity, discount, idDetails) VALUES';
  for (const item of cartList) {
    const unitPrice = item.price * item.quantity;
    const id = uniqid();
    querys += `(${idOrder}, ${item.idProduct},${unitPrice}, ${item.quantity},${discount},'${id}'),`;
  }
  console.log(querys.substring(0, querys.length - 1));
  db.query(querys.substring(0, querys.length - 1), (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({ msg: err });
    }

    db.query(`Delete from carts where idUser = ${idUser}`, (err) => {
      if (err) {
        throw err;
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Order completed successfully',
      });
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
  const id = uniqid();

  db.query(
    `INSERT INTO carts(codeCart, idUser, idProduct, quantity) VALUES('${id}',${idUser}, ${idProduct}, ${quantity})`,
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

const deleteCart = router.delete('/delete-cart', (req, res) => {
  const { idUser, idProduct } = req.query;
  db.query(
    `Delete from carts where idUser = ${idUser} and idProduct = ${idProduct}`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({ msg: 'Delete to cart feild' });
      }
      return res.status(200).send({
        msg: 'Delete cart completed successfully',
      });
    }
  );
});

const getOrdersUser = router.get('/get-order-user/:idUser', (req, res) => {
  const { idUser } = req.params;
  const { statusOrder } = req.query;
  if (Number(statusOrder) === -1) {
    db.query(`select * from orders where idUser = ${idUser}`, (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({ msg: 'Delete to cart feild' });
      }
      return res.status(200).send({
        msg: 'Get order completed successfully',
        orders: result,
      });
    });
  } else {
    db.query(
      `select * from orders where idUser = ${idUser} and statusOrder=${statusOrder}`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({ msg: 'Delete to cart feild' });
        }
        return res.status(200).send({
          msg: 'Get order completed successfully',
          orders: result,
        });
      }
    );
  }
});

const getOrderDetails = router.get(
  '/get-order-details/:idOrder',
  (req, res) => {
    const { idOrder } = req.params;
    db.query(
      `select * from orderdetails, product, productimages where
      orderdetails.idProduct = product.idProduct and product.idProduct = productimages.idProduct and idOrder=${idOrder}`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({ msg: 'Delete to cart feild' });
        }
        return res.status(200).send({
          msg: 'Get order completed successfully',
          orders: result,
        });
      }
    );
  }
);
const deleteOrderDetails = router.delete(
  '/get-order-details/:idOrder',
  (req, res) => {
    const { idOrder } = req.params;
    db.query(
      `DELETE from orderdetails where idOrder=${idOrder}`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({ msg: 'Delete to cart feild' });
        }
        db.query(
          `DELETE from orders where idOrder=${idOrder}`,
          (err, result) => {
            return res.status(200).send({
              msg: 'Delete order completed successfully',
            });
          }
        );
      }
    );
  }
);
module.exports = {
  payMethod,
  orderDetails,
  getIdOrder,
  addToCart,
  getCarts,
  deleteCart,
  getOrdersUser,
  getOrderDetails,
  deleteOrderDetails,
};
