const Dishes=require('../models/main');
const db=require('../database/database');
const { body } = require('express-validator');
const stripe = require("stripe")('');
let sgMail=require('@sendgrid/mail');
let nodemailer=require('nodemailer');
let sendmailer=require('nodemailer-sendgrid-transport');
var d=new Date();
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
exports.addtocart=(req,res,next)=>{
        Dishes.addcart(+req.params.dishId,+req.params.cartId).then(result=>{
           // console.log(req.body.extras)
            return Dishes.recentid().then(result23=>{
 //[result23[0][0].id,req.params.cartId,req.params.dishId,req.body.extras[i]]     
 console.log(result23[0][0])         
              res.json({id: result23[0][0].id})
            })
        })
}
exports.addtoextras=(req,res,next)=>{

    if(req.params.extraid!=='false')
    {   console.log("I m inside")
        db.execute('insert into dishes_cart_extras(real_id,cart_id,dishes_id,extras_id) values(?,?,?,?)',[req.params.id,req.params.cartId,req.params.dishId,req.params.extraid]).then(success=>{
            res.json({items: success})     
       }).catch(err=>{
               console.log(err)
           })  
    } 
    else
    { db.execute('insert into dishes_cart_extras(real_id,cart_id,dishes_id,extras_id) values(?,?,?,?)',[req.params.id,req.params.cartId,req.params.dishId,null]).then(success=>{
      return res.json({items: success})
        }).catch(err=>{
            console.log(err);
        })
    }
}
exports.allcartItems=(req,res,next)=>{
    Dishes.allcartitems(req.params.cartId).then(result=>{
       return res.json({items: result[0]})
    }).catch(err=>{
        console.log(err);
    })
}
exports.allextras=(req,res,next)=>{
    Dishes.allextras(req.params.cartId).then(result=>{
        return res.json({items: result[0]})
    }).catch(err=>{
        console.log(err);
    })
}
exports.total=(req,res,next)=>{
    Dishes.total(req.params.cartId).then(result=>{
       return res.json({items: result[0]})
    })
}
exports.delete22=(req,res,next)=>{
    console.log("So id is "+req.params.id)
    Dishes.delete22(req.params.id).then(result=>{
        console.log(result);
        return res.json({items: result[0]});
    })
}
exports.checkout=async (req,res,next)=>{ 
    console.log(req.body)
    let ordernumber=d.getTime()
    let  amount2  = +req.body.amount;
    console.log(amount2*100);
    let amount=Math.round(amount2*100);
    let id=req.body.id.paymentMethod.id;
 let items22=req.body.products.map(item=>{return `<li>${item.title}-${item.price}$-${item.extras}</li>`});
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "CAD",
			payment_method: id,
			confirm: true
		})
        Dishes.deletecart(req.body.cartid).then(result=>{
            sgMail.setApiKey('')
            const msg = {
                to: req.body.email, // Change to your recipient
                from: 'manshuchatrath20@gmail.com', // Change to your verified sender
                subject: 'Order Confirmation',
                html: `<p>Hello, Thankyou for placing your order with us</p><p>So your order number is <strong>${ordernumber}</strong> and the total of your order is <strong>${req.body.amount}$</strong> which includes following items
                please show your order number in order to collect it.</p>
                <p>Items in your orders are <ul>${items22}</ul></p>
                <p>Thank you</p>`
                ,
              }
              sgMail.send(msg).then(()=>{
                  console.log("jsjsj")
                res.json({
                    message: "Payment successful, You will recieve an email with your order number in few minutes",
                    success: true
                })
            })
        })
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
}
exports.booking=(req,res,next)=>{
    console.log(req.body)
    sgMail.setApiKey('')
    const msg = {
        to: req.body.email, // Change to your recipient
        from: 'manshuchatrath20@gmail.com', // Change to your verified sender
        subject: 'Booking Confirmation',
        html: `<p>So table has been booked for ${req.body.people} at ${req.body.time} on ${req.body.date}</p>`
      }
      sgMail.send(msg).then(()=>{
          console.log("jsjsj")
        res.json({
            message: "Confirmation email has been sent for booking",
            booking: true
        })
    })
}