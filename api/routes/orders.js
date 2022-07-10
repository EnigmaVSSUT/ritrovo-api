const express=  require('express')

const router = express.Router()

router.get('/',(req,res,next)=>{
    
    res.json({
        msg:'got orders'
    })
})

router.post('/',(req,res,next)=>{
    res.json(
       {
        msg : 'posted orders'
       } 
    )
})

module.exports = router;