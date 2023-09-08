var express = require('express');
var router = express.Router();

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

