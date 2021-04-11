const Auth=require('../models/auth');
const bcrypt=require('bcrypt');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
exports.signup=(req,res,next)=>{
let email=req.body.email;
let password=req.body.password
const error=validationResult(req);
console.log("So body is ");
console.log(req.body);
if(!error.isEmpty())
{   console.log(error)
    return res.json({
        message: 'Something is wrong',
        error: error.array()[0]
    })
}
bcrypt.hash(req.body.password,1).then(encodedpass=>{
    const auth= new Auth(email,encodedpass);
    auth.verify().then(result=>{
        console.log("SO result is ");
        console.log(result[0]);
         if(result[0][0])
        {   console.log("its not empty")
           return res.json({message: 'The user already exists'});
        }
        console.log("yoyoy");
        auth.save().then(result1=>{
            console.log(result1);
            return res.json({result: result1})
       }).catch(err=>{
           console.log(err);
           return 
       })
    })
  
}).catch(err=>{
    console.log(err);
})
}
exports.login=(req,res,next)=>{
    const auth=new Auth(req.body.email,req.body.password);
    auth.verify().then(result=>{
        console.log(result[0][0].id);
        if(result[0][0])
        {
        bcrypt.compare(req.body.password,result[0][0].password).then(result1=>{
            console.log(result1);
            if(result1)
            {   const token=jwt.sign({email: result[0][0].email,userId: result[0][0].id},'secret',{expiresIn: '1h'})
                return res.json({token: token,userId: result[0][0].id,credentials: true})
            }
            else
            {
                return res.json({message: 'Invalid Password'});
            }
        })
    }
    else
    {
        return res.status(201).json({message: 'Invalid email'})
    }
    })
}