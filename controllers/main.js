const Dishes = require("../models/main");
const db = require("../database/database");
const { key } = require("../key");
const stripe = require("stripe")(key.stripe_key);
var d = new Date();
let nodemailer = require("nodemailer");

exports.dishes = (req, res, next) => {
  const dishes = new Dishes(
    req.body.title,
    +req.body.price,
    req.body.url,
    req.body.recepie,
    req.body.category
  );
  dishes
    .save()
    .then((result) => {
      return res.json({ dishes: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.allcategory = (req, res, next) => {
  Dishes.allcat().then((result) => {
    return res.json({ categories: result });
  });
};
exports.menu = (req, res, next) => {
  Dishes.alldishes().then((result) => {
    return res.json({ items: result[0] });
  });
};
exports.view = (req, res, next) => {
  Dishes.view(req.params.id).then((result) => {
    return res.json({ items: result[0] });
  });
};

exports.edit = (req, res, next) => {
  let update = new Dishes(
    req.body.title,
    req.body.price,
    req.body.url,
    req.body.recepie,
    req.body.category
  );
  update.update(req.params.id).then((result) => {
    return res.json({ items: result[0] });
  });
};
exports.delete = (req, res, next) => {
  Dishes.delete(req.params.id).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.realcategory = (req, res, next) => {
  Dishes.realcategories().then((result) => {
    res.json({ items: result[0] });
  });
};
exports.search = (req, res, next) => {
  Dishes.search(req.params.title).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.extras = (req, res, next) => {
  Dishes.extras(
    req.params.id,
    req.body.title,
    req.body.price,
    req.body.category
  ).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.extracat = (req, res, next) => {
  Dishes.extrascat(req.params.id).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.fetchextras = (req, res, next) => {
  Dishes.fetchextras(req.params.id).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.extra = (req, res, next) => {
  Dishes.extra(req.params.id).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.deleteextra = (req, res, next) => {
  Dishes.deleteextra(req.params.id).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.update2 = (req, res, next) => {
  Dishes.update2(
    req.body.title,
    req.body.price,
    req.body.category,
    req.params.id
  ).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.viewcat = (req, res, next) => {
  Dishes.biewcat(req.params.id).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.disable = (req, res, next) => {
  Dishes.disable(req.params.id).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.enable = (req, res, next) => {
  Dishes.enable(req.params.id).then((result) => {
    res.json({ items: result[0] });
  });
};
exports.addtocart = (req, res, next) => {
  Dishes.addcart(+req.params.dishId, +req.params.cartId).then((result) => {
    return Dishes.recentid().then((result23) => {
      res.json({ id: result23[0][0].id });
    });
  });
};
exports.addtoextras = (req, res, next) => {
  if (req.params.extraid !== "false") {
    db.execute(
      "insert into dishes_cart_extras(real_id,cart_id,dishes_id,extras_id) values(?,?,?,?)",
      [req.params.id, req.params.cartId, req.params.dishId, req.params.extraid]
    )
      .then((success) => {
        res.json({ items: success });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    db.execute(
      "insert into dishes_cart_extras(real_id,cart_id,dishes_id,extras_id) values(?,?,?,?)",
      [req.params.id, req.params.cartId, req.params.dishId, null]
    )
      .then((success) => {
        return res.json({ items: success });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
exports.allcartItems = (req, res, next) => {
  Dishes.allcartitems(req.params.cartId)
    .then((result) => {
      return res.json({ items: result[0] });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.allextras = (req, res, next) => {
  Dishes.allextras(req.params.cartId)
    .then((result) => {
      return res.json({ items: result[0] });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.total = (req, res, next) => {
  Dishes.total(req.params.cartId).then((result) => {
    return res.json({ items: result[0] });
  });
};
exports.delete22 = (req, res, next) => {
  Dishes.delete22(req.params.id).then((result) => {
    return res.json({ items: result[0] });
  });
};
exports.checkout = async (req, res, next) => {
  let ordernumber = d.getTime();
  let amount2 = +req.body.amount;
  let amount = Math.round(amount2 * 100);
  let id = req.body.id.paymentMethod.id;
  let items22 = req.body.products.map((item) => {
    return `<li>${item.title}-${item.price}$-${item.extras}</li>`;
  });
  try {
    await stripe.paymentIntents.create({
      amount,
      currency: "CAD",
      payment_method: id,
      confirm: true,
    });
    Dishes.deletecart(req.body.cartid).then(async (result) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: key.email,
          pass: key.password,
        },
      });
      await transporter.sendMail({
        to: req.body.email,
        from: "jack.germanshepherd@gmail.com",
        subject: "Order Confirmation",
        html: `<p>Hello, Thankyou for placing your order with us</p><p>So your order number is <strong>${ordernumber}</strong> and the total of your order is <strong>${req.body.amount}$</strong> which includes following items
                please show your order number in order to collect it.</p>
                <p>Items in your orders are <ul>${items22}</ul></p>
                <p>Thank you</p>`,
      });

      res.json({
        message:
          "Payment successful, You will recieve an email with your order number in few minutes",
        success: true,
      });
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

exports.booking = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: key.email,
        pass: key.password,
      },
    });
    await transporter.sendMail({
      from: "jack.germanshepherd@gmail.com",
      to: req.body.email,
      subject: "Booking Confirmation",
      html: `<p>So table has been booked for ${req.body.people} at ${req.body.time} on ${req.body.date}</p> 
       <p>Thank you</p>`,
    });
    return res.json({
      message: "Confirmation email has been sent for booking",
      booking: true,
    });
  } catch (err) {
    console.log(err);
  }
};
