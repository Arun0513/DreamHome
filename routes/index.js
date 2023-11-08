var express = require('express');
var router = express.Router();
const productmodel = require('../Models/addproduct'); // Import your user model

/* GET home page. */


module.exports = router;
router.get('/adminlogin',(req,res)=>{
  res.render('admin/adminlogin');
});

router.get('/addproduct',(req,res)=>{
  res.render('admin/addproduct');
});
router.get('/adminhome',(req,res)=>{
  res.render('admin/adminhome');
});
router.post('/adminlogin',(req,res)=>{
  let email ="admin";
  let password = "admin";
  if(req.body.email ==email && req.body.password==password){
          res.redirect('admin/adminhome')
  }else{
          res.redirect('admin/adminlogin')
  }
})
router.post('/addproduct', async (req,res) => {
  console.log(req.body);
  console.log(req.files);

  try {
    // Create the product record
    let product = await productmodel.create(req.body);

    // Get the ID of the newly created product
    const productId = product._id;

    let { img } = req.files;

    // Construct the image filename
    const imgFileName = `${productId}.jpg`;

    // Move the uploaded image to the desired directory
    img.mv('./public/images/product/' + imgFileName, (err) => {
      if (err) {
        console.error(err);
        // Handle the error here
        // You might want to send an error response to the client.
      } else {
        console.log("Data inserted");
        res.redirect('admin/adminhome');
      }
    });
  } catch (error) {
    console.log(error);
    // Handle the error here
    // You might want to send an error response to the client.
  }
});




module.exports = router;
