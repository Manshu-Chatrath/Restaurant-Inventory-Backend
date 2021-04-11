const auth=require('../controllers/auth');
const express=require('express');
const route=express();
const {body}=require('express-validator');
route.post('/signup',[body('email').isEmail().withMessage('Please enter a valid email'),body('password').isLength({min: 5}).withMessage
('The length of the password is less than 5'),body('confirmpassword').custom((value,{req})=>{
    console.log(req.body.password);
    if(value!==req.body.password)
{   console.log("yes here it is ")
    throw new Error("Password don't match");
}
return true;
})],auth.signup);
route.post('/',auth.login);
module.exports=route;