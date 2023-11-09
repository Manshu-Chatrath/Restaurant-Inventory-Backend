const db = require("../database/database");
module.exports = class auth {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  verify() {
    return db.execute("select * from managers where email=(?)", [this.email]);
  }
  save() {
    return db.execute("insert into managers(email,password) values (?,?)", [
      this.email,
      this.password,
    ]);
  }
  verify2() {
    return db.execute("select * from clients where email=(?)", [this.email]);
  }
  save2() {
    return db.execute("insert into clients(email,password) values (?,?)", [
      this.email,
      this.password,
    ]);
  }
  give() {
    return db.execute("select id from clients where email=(?)", [this.email]);
  }
  cart(id) {
    return db.execute("insert into cart(c_id) values(?)", [id]);
  }
  cartId(id) {
    return db.execute("select id from cart where c_id=(?)", [id]);
  }
};
