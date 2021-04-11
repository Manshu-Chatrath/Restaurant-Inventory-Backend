const Dishes=require('../models/main');
exports.dishes=(req,res,next)=>{
const dishes=new Dishes(req.body.title,+req.body.price,req.body.url,req.body.recepie,req.body.category)
dishes.save().then(result=>{
    return res.json({dishes: result})
}).catch(err=>{
 console.log(err);
})
}
exports.allcategory=(req,res,next)=>{
    Dishes.allcat().then(result=>{
        return res.json({categories: result})
    })    
}   
exports.menu=(req,res,next)=>{  
    Dishes.alldishes().then(result=>{
        return res.json({items: result[0]})
    }) 
}
exports.view=(req,res,next)=>{
    Dishes.view(req.params.id).then(result=>{
        return res.json({items: result[0]})
    })
}

exports.edit=(req,res,next)=>{
console.log(req.body);
let update=new Dishes(req.body.title,req.body.price,req.body.url,req.body.recepie,req.body.category);
update.update(req.params.id).then(result=>{
    return res.json({items: result[0]});
})
}
exports.delete=(req,res,next)=>{
    Dishes.delete(req.params.id).then(result=>{
  
        res.json({items: result[0]})
    })
}   
exports.realcategory=(req,res,next)=>{
    Dishes.realcategories().then(result=>{

        res.json({items: result[0]})
    })
}
exports.search=(req,res,next)=>{

    Dishes.search(req.params.title).then(result=>{
        res.json({items: result[0]})
    })
}     
exports.extras=(req,res,next)=>{

    Dishes.extras(req.params.id,req.body.title,req.body.price,req.body.category).then(result=>{
        res.json({items: result[0]})
    })
}
exports.extracat=(req,res,next)=>{

    Dishes.extrascat(req.params.id).then(result=>{
          res.json({items: result[0]})
    })   
}
exports.fetchextras=(req,res,next)=>{
  
    Dishes.fetchextras(req.params.id).then(result=>{
        res.json({items: result[0]})
    })
}
exports.extra=(req,res,next)=>{
    Dishes.extra(req.params.id).then(result=>{
     
        res.json({items: result[0]})
    })
}
exports.deleteextra=(req,res,next)=>{
Dishes.deleteextra(req.params.id).then(result=>{
    res.json({items: result[0]});
})
}
exports.update2=(req,res,next)=>{
    Dishes.update2(req.body.title,req.body.price,req.body.category,req.params.id).then(result=>{
        res.json({items: result[0]})
    })
}
exports.viewcat=(req,res,next)=>{
    Dishes.biewcat(req.params.id).then(result=>{
        res.json({items: result[0]})
    })
}
exports.disable=(req,res,next)=>{
    Dishes.disable(req.params.id).then(result=>{
        res.json({items: result[0]})
    })
}
exports.enable=(req,res,next)=>{
    Dishes.enable(req.params.id).then(result=>{
        res.json({items: result[0]})
    })
}