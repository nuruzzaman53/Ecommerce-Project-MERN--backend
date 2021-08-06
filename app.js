const express          = require('express')
const mongoose         = require('mongoose')
require('dotenv').config()
const morgan           = require('morgan')
const cookieParser     = require('cookie-parser')
const expressValidator = require('express-validator')
const app              = express()
const cors             = require('cors')

// routing //
const authRoutes       = require('./routes/auth')
const userRoutes       = require('./routes/user')
const categoryRoutes   = require('./routes/category')
const productRoutes    = require('./routes/product')
const braintreeRoutes  = require('./routes/braintree')
const orderRoutes      = require('./routes/order')
const feedbackRoutes   = require('./routes/feedback')

// middleware calling//
app.use(expressValidator())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())
app.use(cors())

// middleware use //
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',braintreeRoutes)
app.use('/api',orderRoutes)
app.use('/api',feedbackRoutes)

const port = process.env.PORT || 3001

mongoose.connect("mongodb+srv://zaman:password1234@cluster0.wxew5.mongodb.net/ecommerce?retryWrites=true&w=majority",
    {useNewUrlParser:true},()=> {
    console.log('Mongoose databse connection established')
})
/*
mongoose.connect('mongodb://localhost:27017/ecommerce',{useNewUrlParser:true},() => {
    console.log('Mongoose databse connection established')
})*/


app.listen(port,() => {
    console.log(`Server Connected on port ${port}`)
})