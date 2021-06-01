const controller=require('../controllers/main');
const express=require('express');
const router=express();
const isAuth=require('../middleware/isauth');
router.get('/',(req,res,next)=>{
    res.json({message: 'yes it works'})
})
router.post('/save-dishes',isAuth,controller.dishes);
router.get('/categories',isAuth,controller.allcategory);
router.get('/menu',isAuth,controller.menu);
router.get('/view/:id',isAuth,controller.view);
router.put('/edit-dish/:id',isAuth,controller.edit);
router.delete('/delete/:id',isAuth,controller.delete);
router.get('/allcategories',isAuth,controller.realcategory);
router.get('/search/:title',isAuth,controller.search);
router.post('/extras/:id',isAuth,controller.extras);
router.get('/extracat/:id',isAuth,controller.extracat);
router.get('/fetchextras/:id',isAuth,controller.fetchextras);
router.get('/extra/:id',isAuth,controller.extra);
router.delete('/deletecat/:id',isAuth,controller.deleteextra);
router.put('/edit-cat/:id',isAuth,controller.update2);
router.get('/viewcat/:id',isAuth,controller.viewcat);
router.post('/disable/:id',isAuth,controller.disable);
router.post('/enable/:id',isAuth,controller.enable); 
router.get('/resto-menu',controller.menu);
router.get('/allcategory',controller.allcategory);
router.get('/addcart/:id',controller.extra);
router.get('/cat/:id',controller.extracat);
router.get('/searching/:title',controller.search);
router.post('/addcart/:dishId/:cartId',controller.addtocart);
router.post('/addtoextras/:dishId/:cartId/:id/:extraid',controller.addtoextras)
router.get('/allcart/:cartId',controller.allcartItems);
router.get('/extras/:cartId',controller.allextras);
router.get('/totalcart/:cartId',controller.total);
router.delete('/deletecart/:id',controller.delete22);
router.post('/checkout',controller.checkout);
router.post('/booking',controller.booking);
module.exports=router;      