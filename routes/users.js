
const express = require('express');
const router = express.Router();
const userModels = require('../Models/userModels'); // Import your user model
const session = require('express-session'); // Import session middleware

// Add session middleware setup
router.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/home', (req, res, next) =>{
  res.render('user/home', { title: 'Express' });
});
router.get('/login',(req,res)=>{
  res.render('user/login');
});
router.get('/cart',(req,res)=>{
  res.render('user/cart');
});
router.get('/about',(req,res)=>{
  res.render('user/about');
});
router.get('/payment',(req,res)=>{
  res.render('user/payment');
});
router.get('/gallery',(req,res)=>{
  res.render('user/gallery');
});
router.post('/register',async (req,res)=>{
  console.log(req.body)
  try{
    let data = await usermodel.create(req.body)
    console.log("data inserted")
    res.redirect('/users/login');
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
          console.log( req.session.employee ,"session emp")
        res.redirect('/users/home')
      }else{
        req.session.nouser = "Username or password incorrect";
        res.redirect('/users/login')
      }
  } catch (error) {
    console.log(error)
  }
})

        

module.exports = router;
