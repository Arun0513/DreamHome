
const express = require('express');
const router = express.Router();
const userModels = require('../Models/userModels'); // Import your user model
const addproduct = require('../Models/addproduct'); // Import your addproduct model
let Razorpay = require('../Payments/Razorpay')

const session = require('express-session'); // Import session middleware

// Add session middleware setup
router.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', (req, res,) =>{
  
  if(req.session.employee)
  {
  let user = req.session.employee;
  console.log(user);
  res.render('user/home', { title: 'Express' ,user});
}else{
  res.render('user/home');
}
});
router.get('/login',(req,res)=>{
  res.render('user/login');
});
router.get('/cart', async (req,res)=>{
  try {
    let products = await addproduct.find(req.body);
    console.log(products);
    res.render('user/cart', { products });
  
  } catch (error) {
    console.log(error)
  }
});
router.get('/about',(req,res)=>{
  res.render('user/about');
});
router.get('/payment/:id', async (req,res)=>{
  let ProductId = req.params.id;
  try {
    let product = await addproduct.find({_id:ProductId});
    console.log(product);
    const subTotal = product[0].price;
    const tax = subTotal * .18 
    const grantTotal =parseInt(subTotal)  + parseInt(tax);
    const data = {
      subTotal,
      grantTotal,
      tax
    }
    var options = {
      amount: grantTotal,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    Razorpay.orders.create(options, function(err, order) {
      if(err)
      {
          console.log(err)
      }
      else{
      console.log(order);
      res.render('user/payment', { product,data,order });
      }
    });
  
  } catch (error) {
    console.log(error)
  }
});
router.get('/gallery',(req,res)=>{
  res.render('user/gallery');
});
router.post('/register',async (req,res)=>{
  console.log(req.body);
  try{
    let data = await userModels.create(req.body)
    console.log("data inserted")
    res.redirect('/login');
  }catch(error){
    console.log(error) 
  }
})

router.post('/login', async (req, res, next) => {
  try {
    let { email } = req.body;
    let {password } = req.body; 
    console.log(req.body, "req");

    // Find the user with the provided email

    let employee = await userModels.find({email:email,password:password})
      console.log(employee,"emloye");
      if(employee.length >0){
          req.session.employee = employee[0];
         // console.log( req.session.employee ,"session emp")
        res.redirect('/')
      }else{
        req.session.nouser = "Username or password incorrect";
        res.redirect('/login')
      }
  } catch (error) {
    console.log(error)
  }
})

        

module.exports = router;
