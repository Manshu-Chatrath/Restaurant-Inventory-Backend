const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    console.log(req);
    let auth=req.get('Authorization');
    console.log(auth);
    const token=auth;
    let decoded; 
    try{
        console.log("So token is "+token);
        decoded=jwt.verify(token,'secret');
        console.log(decoded);
        req.userId=decoded.userId;
        next();
    }
    catch(err){
        err.StatusCode=500;
        throw err;
    }
 
}