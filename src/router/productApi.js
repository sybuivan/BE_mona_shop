const express = require("express");
const router = express.Router();
const db = require("../configs/dbConnection");

const getProducts = router.get("/product/:idCategory", (req, res, next) => {
  db.query(
    `SELECT product.idProduct,product.name,category.name as categoryName,path,
    price, productimages.thumbnailUrl 
    FROM product, productimages, category
    WHERE product.idProduct = productimages.idProduct 
    and category.idCategory = product.idCategory
    and product.idCategory = ${req.params.idCategory}
    GROUP BY product.idProduct`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Data product is incorrect!",
        });
      } else {
        return res.status(200).send({
          msg: "Get product in successfully!",
          products: result,
        });
      }
    }
  );
});

const getAllProductByParams = router.get("/products/", (req, res, next) => {
  console.log(req.query.sortByPrice);
  let query = "";
  if (req.query.idCategory && req.query.sortByPrice) {
    query = `SELECT product.idProduct,product.name, price, productimages.thumbnailUrl ,
      category.name as categoryName
    FROM product, productimages, category
    WHERE product.idProduct = productimages.idProduct 
    and category.idCategory = product.idCategory
    and category.idCategory = '${req.query.idCategory}'
    GROUP BY product.idProduct
    ORDER BY product.price ${req.query.sortByPrice} `;
  } else if (req.query.idCategory && req.query.sortBySale) {
    query = `SELECT product.idProduct,product.name, price, productimages.thumbnailUrl ,
      category.name as categoryName
    FROM product, productimages, category
    WHERE product.idProduct = productimages.idProduct 
    and category.idCategory = product.idCategory
    and category.idCategory = '${req.query.idCategory}'
    GROUP BY product.idProduct
    ORDER BY product.date_product ${req.query.sortBySale}`;
  } else if (req.query.idCategory) {
    query = `SELECT product.idProduct,product.name, price, productimages.thumbnailUrl ,
      category.name as categoryName
    FROM product, productimages, category
    WHERE product.idProduct = productimages.idProduct 
    and category.idCategory = product.idCategory
    and category.idCategory = '${req.query.idCategory}'
    GROUP BY product.idProduct`;
  }

  console.log(query);
  db.query(query, (err, result) => {
    // user does not exists
    if (err) {
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    if (!result.length) {
      return res.status(401).send({
        msg: "Data product is incorrect!",
      });
    } else {
      return res.status(200).send({
        msg: "Get product in successfully!",
        products: result,
      });
    }
  });
});

const getAllProductByCategory = router.get(
  "/products/:idCategory",
  (req, res, next) => {
    // console.log(req.query.idCategory)
    db.query(
      `SELECT product.idProduct,product.name, price, productimages.thumbnailUrl ,
      category.name as categoryName
    FROM product, productimages, category
    WHERE product.idProduct = productimages.idProduct 
    and category.idCategory = product.idCategory
    and category.idCategory = '${req.params.idCategory}'
    GROUP BY product.idProduct`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: "Data product is incorrect!",
          });
        } else {
          return res.status(200).send({
            msg: "Get product in successfully!",
            products: result,
          });
        }
      }
    );
  }
);

const getDetailProduct = router.get(
  "/product-detail/:productId",
  (req, res, next) => {
    db.query(
      `SELECT * FROM product, productimages
    WHERE product.idProduct = ${req.params.productId} and 
    productimages.idProduct = product.idProduct GROUP BY product.idProduct`,

      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: "Data product is incorrect!",
          });
        } else {
          return res.status(200).send({
            msg: "Get detail product in successfully!",
            productDetail: result,
          });
          // db.query(
          //   `SELECT thumbnailUrl FROM productimages
          //   WHERE productimages.idProduct = ${req.params.productId}`,
          //   (err, result_images) => {
          //     if (err) {
          //       throw err;
          //       return res.status(400).send({ msg: err });
          //     }
          //     return res.status(401).send({
          //       msg: "Get detail product in successfully!",
          //       detailImages: result_images,
          //       detailProduct: result
          //     });
          //   }
          // );
        }
      }
    );
  }
);

const getDetailImages = router.get(
  "/product-detail-images/:productId",
  (req, res, next) => {
    db.query(
      `SELECT thumbnailUrl,idImage FROM productimages 
       WHERE productimages.idProduct = ${req.params.productId}`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: "Data product is incorrect!",
          });
        } else {
          return res.status(200).send({
            msg: "Get detail product in successfully!",
            detailImages: result,
          });
        }
      }
    );
  }
);

module.exports = {
  getProducts,
  getDetailProduct,
  getDetailImages,
  getAllProductByParams,
  getAllProductByCategory,
};
