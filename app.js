const express          = require('express')
const mongoose         = require('mongoose')
require('dotenv').config()
const morgan           = require('morgan')
const bodyParser       = require('body-parser')
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


// middleware calling//
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

// middleware use //
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',braintreeRoutes)
app.use('/api',orderRoutes)

const port = process.env.PORT || 8000
//db connection //

//const db_name = process.env.DB_CONNECTION
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
    {useNewUrlParser:true},()=> {
    console.log('Mongoose databse connection established')
})



app.listen(port,() => {
    console.log(`Server Connected on port ${port}`)
})