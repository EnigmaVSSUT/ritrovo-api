const express=  require('express')
const mongoose = require('mongoose')

const Product =  require('../models/product')

const router = express.Router()

router.get('/',async(req,res,next)=>{

    const result=await Product.find().exec() 
    
    res.json({
        msg:'got products',
        res: result,
    })
}) 

router.post('/',async (req,res,next)=>{
    const product = new Product(
        {
            _id: mongoose.Types.ObjectId(),
            name:req.body.name,
            price:req.body.price,
        }
    )

    const result= await product.save();
    res.json(
       {
        msg : 'posted product',
        product: result 
       } 
    )
})

module.exports = router;