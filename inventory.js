const express=require('express');
const inventory=express();
const routes=require('./route/auth');
const dishes=require('./route/main');
inventory.use(express.json());
inventory.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //So that all can access this.
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'); //what kind of methods i would like to allow on this server
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //client can send the data whose type is authorization
    next();
});
inventory.use(routes);
inventory.use(dishes);
inventory.listen(2000);
