const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  routerRegister,
  routerLogin,
  updateUser,
} = require('./src/router/userApi');
const { routerCategories } = require('./src/router/categoryApi');
const {
  getProducts,
  getDetailProduct,
  getDetailImages,
  getAllProductByCategory,
  getAllProductByParams,
} = require('./src/router/productApi');

const {
  payMethod,
  orderDetails,
  getIdOrder,
  addToCart,
  getCarts,
  deleteCart,
  getOrdersUser,
  getOrderDetails,
  deleteOrderDetails,
} = require('./src/router/checkoutApi');

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use('/api', routerRegister);
app.use('/api', routerLogin);
app.use('/api', updateUser);

app.use('/api', routerCategories);

app.use('/api', getAllProductByCategory);
app.use('/api', getAllProductByParams);
app.use('/api', getProducts);
app.use('/api', getDetailProduct);
app.use('/api', getDetailImages);

// checkout
app.use('/api', payMethod);
app.use('/api', orderDetails);
app.use('/api', getIdOrder);
app.use('/api', addToCart);
app.use('/api', getCarts);
app.use('/api', deleteCart);
app.use('/api', getOrdersUser);
app.use('/api', getOrderDetails);
app.use('/api', deleteOrderDetails);

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.statusCode).json({
    message: err.message,
  });
});

const port = process.env.PORT || 9000;

console.log(process.env.PORT);

app.listen(5000, () => console.log('Server is running on port 5000'));
