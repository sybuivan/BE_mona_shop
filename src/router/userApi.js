const express = require('express');
const router = express.Router();
const db = require('../configs/dbConnection');
const {
  signupValidation,
  loginValidation,
} = require('../validation/validation');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const routerRegister = router.post('/register', (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      console.log(result);
      if (result.length) {
        return res.status(401).send({
          msg: 'This email is already in use!',
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          console.log(err);
          if (err) {
            return res.status(500).send({
              msg: 'Error',
            });
          } else {
            // has hashed pw => add to database
            console.log('ne');
            db.query(
              `INSERT INTO users (fullName, email, password) VALUES ('${
                req.body.fullName
              }', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({ msg: 'Error' });
                }
                return res.status(200).send({
                  msg: 'The user has been registerd with us!',
                });
              }
            );
          }
        });
      }
    }
  );
});

const routerLogin = router.post('/login', loginValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      console.log(req.body);
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect!',
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Email or password is incorrect!',
            });
          }
          if (bResult) {
            const token = jwt.sign(
              { id: result[0].id },
              'the-super-strong-secrect',
              { expiresIn: '1h' }
            );
            // db.query(
            //   `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            // );
            return res.status(200).send({
              msg: 'Logged in successfully!',
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!',
          });
        }
      );
    }
  );
});

const updateUser = router.put('/update-user', (req, res, next) => {
  const { address, phone, idUser } = req.body;

  if (idUser) {
    console.log(req.body);
    db.query(
      `UPDATE users SET address='${address}', phone='${phone}' where idUser=${idUser}`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: 'LOI',
          });
        } else {
          db.query(
            `SELECT * FROM users WHERE idUser = ${idUser};`,
            (err, result) => {
              return res.status(200).send({
                msg: 'Update user successfully',
                user: result[0],
              });
            }
          );
        }
      }
    );
  } else {
    return res.status(400).send({
      msg: 'Id user khong dc bo trong',
    });
  }
});

module.exports = {
  routerRegister,
  routerLogin,
  updateUser,
};
