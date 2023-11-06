const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
exports.signup = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json({
      message: "Something is wrong",
      error: error.array()[0],
    });
  }
  bcrypt
    .hash(req.body.password, 1)
    .then((encodedpass) => {
      const auth = new Auth(email, encodedpass);
      auth.verify().then((result) => {
        if (result[0][0]) {
          return res.json({ message: "The user already exists" });
        }
        auth
          .save()
          .then((result1) => {
            return res.json({ result: result1 });
          })
          .catch((err) => {
            return;
          });
      });
    })
    .catch((err) => {
      return;
    });
};
exports.login = (req, res, next) => {
  const auth = new Auth(req.body.email, req.body.password);
  auth.verify().then((result) => {
    if (result[0][0]) {
      bcrypt
        .compare(req.body.password, result[0][0].password)
        .then((result1) => {
          if (result1) {
            const token = jwt.sign(
              { email: result[0][0].email, userId: result[0][0].id },
              "secret",
              { expiresIn: "1h" }
            );
            return res.json({
              token: token,
              userId: result[0][0].id,
              credentials: true,
            });
          } else {
            return res.json({ message: "Invalid Password" });
          }
        });
    } else {
      return res.status(201).json({ message: "Invalid email" });
    }
  });
};
exports.signup2 = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({
      message: "Something is wrong",
      error: error.array()[0],
    });
  }
  bcrypt
    .hash(req.body.password, 1)
    .then((encodedpass) => {
      const auth = new Auth(email, encodedpass);
      auth.verify2().then((result) => {
        if (result[0][0]) {
          return res.json({ message: "The user already exists" });
        }
        auth
          .save2()
          .then((result1) => {
            auth
              .give()
              .then((reslt) => {
                auth
                  .cart(reslt[0][0].id)
                  .then((result22) => {
                    return res.json({ result: result22 });
                  })
                  .catch((err) => {
                    return;
                  });
              })
              .catch((err) => {
                return;
              });
          })
          .catch((err) => {
            return;
          });
      });
    })
    .catch((err) => {});
};
exports.login2 = (req, res, next) => {
  const auth = new Auth(req.body.email, req.body.password);
  auth.verify2().then((result) => {
    if (result[0][0]) {
      bcrypt
        .compare(req.body.password, result[0][0].password)
        .then((result1) => {
          if (result1) {
            auth.cartId(result[0][0].id).then((result44) => {
              const token = jwt.sign(
                { email: result[0][0].email, userId: result[0][0].id },
                "secret",
                { expiresIn: "1h" }
              );
              return res.json({
                token: token,
                userId: result[0][0].id,
                credentials: true,
                cartId: result44[0][0].id,
              });
            });
          } else {
            return res.json({ message: "Invalid Password" });
          }
        });
    } else {
      return res.status(201).json({ message: "Invalid email" });
    }
  });
};
