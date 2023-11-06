const express = require("express");
const inventory = express();
const routes = require("./route/auth");
const cors = require("cors");
const dishes = require("./route/main");
inventory.use(express.json());
inventory.use(cors());
inventory.use(routes);
inventory.use(dishes);
inventory.listen(process.env.PORT || 2000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    inventory.settings.env
  );
});
