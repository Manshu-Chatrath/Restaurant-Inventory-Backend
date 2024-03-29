const db = require("../database/database");
module.exports = class dish {
  constructor(title, price, url, recepie, category) {
    (this.title = title), (this.price = price), (this.url = url);
    (this.recepie = recepie), (this.categoryy = category);
  }
  save() {
    return db.execute(
      "insert into dishes(title,price,url,active,recepie,Category) values(?,?,?,?,?,?)",
      [this.title, this.price, this.url, "true", this.recepie, this.categoryy]
    );
  }
  static allcat() {
    return db.execute(
      "select distinct Category from dishes order by Category ASC"
    );
  }
  static alldishes() {
    return db.execute("select * from dishes order by Category ASC ");
  }
  static view(id) {
    return db.execute(
      "select id,title, ROUND(price, 2) as price,url,recepie,Category from dishes where id=(?)",
      [id]
    );
  }
  static category(title) {
    return db.execute("insert into category(title) values(?)", [title]);
  }
  update(id) {
    return db.execute(
      "UPDATE dishes SET title=(?),price=(?),url=(?),recepie=(?),category=(?) WHERE id=(?)",
      [this.title, this.price, this.url, this.recepie, this.categoryy, id]
    );
  }
  static delete(id) {
    return db.execute("delete from dishes where id=(?)", [id]);
  }
  static realcategories() {
    return db.execute("select * from category");
  }
  static search(title) {
    return db.execute("select * from dishes where title like (?)", [
      title + "%",
    ]);
  }
  static extras(id, title, price, category) {
    return db.execute(
      "insert into extras(dishId,title,price,category) values(?,?,?,?)",
      [id, title, price, category]
    );
  }
  static extrascat(id) {
    return db.execute(
      "select distinct category,dishId from extras where dishId=(?)",
      [+id]
    );
  }
  static fetchextras(id) {
    return db.execute("select * from extras where dishId=(?)", [id]);
  }
  static extra(id) {
    return db.execute(
      "SELECT * FROM dishes LEFT JOIN extras ON dishes.id = extras.dishId where extras.dishId=(?) UNION SELECT * FROM dishes RIGHT JOIN extras ON extras.dishId = dishes.id WHERE extras.dishId=(?)",
      [id, id]
    );
  }
  static deleteextra(id) {
    return db.execute("delete from extras where id=(?)", [id]);
  }
  static update2(title, price, category, id) {
    return db.execute(
      "UPDATE extras SET title=(?),price=(?),category=(?) WHERE id=(?)",
      [title, price, category, id]
    );
  }
  static biewcat(id) {
    return db.execute(
      "select id,dishId,title,ROUND(extras.price, 2) as price,category from extras where id=(?)",
      [id]
    );
  }
  static disable(id) {
    return db.execute("update dishes set active=(?) where id=(?)", [
      "false",
      id,
    ]);
  }
  static enable(id) {
    return db.execute("update dishes set active=(?) where id=(?)", [
      "true",
      id,
    ]);
  }
  static addcart(dishid, cartid) {
    return db.execute(
      "insert into dishes_has_cart(dishes_id,cart_id) values(?,?)",
      [dishid, cartid]
    );
  }
  static recentid() {
    return db.execute(
      "select id from dishes_has_cart order by id desc limit 1"
    );
  }
  static realcart(id, cartid, dishid, extrasid) {
    return db.execute(
      "insert into dishes_cart_extras(id,cart_id,dishes_id,extras_id) values(?,?,?,?)",
      [id, cartid, dishid, extrasid]
    );
  }
  static allcartitems(cartId) {
    return db.execute(
      "SELECT distinct id,title,price,url, active FROM dishes LEFT JOIN dishes_cart_extras ON dishes_cart_extras.dishes_id = dishes.id where dishes_cart_extras.dishes_id=dishes.id and dishes_cart_extras.cart_id=(?)",
      [cartId]
    );
  }
  static allextras(id) {
    return db.execute(
      "SELECT * FROM extras LEFT JOIN dishes_cart_extras ON extras.id = dishes_cart_extras.extras_id where dishes_cart_extras.extras_id=extras.id and cart_id=(?)",
      [id]
    );
  }
  static total(cartId) {
    return db.execute("select * from dishes_has_cart where cart_id=(?)", [
      cartId,
    ]);
  }
  static delete22(id) {
    return db.execute("delete from dishes_has_cart where id=(?)", [id]);
  }
  static deletecart(id) {
    return db.execute("delete from dishes_has_cart where cart_id=(?)", [id]);
  }
};
