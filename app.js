const express = require('express')
const morgan= require('morgan')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
mongoose.connect('mongodb+srv://dhairya:'+process.env.MongoPW+'@cluster0.vpuxf.mongodb.net/?retryWrites=true&w=majority');

const products = require('./api/routes/products')
const orders = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')

    if(req.method==='OPTIONS'){
        res.header('Access-Controll-Allow-Methods','PUT,POST,PATCH,DELETE')
        return res.json({})
    }

    next();
})


app.use('/products',products);
app.use('/orders',orders)

app.use((req,res,next)=>{
    res.json({
        error:'some error occured'
    });
})

module.exports = app;