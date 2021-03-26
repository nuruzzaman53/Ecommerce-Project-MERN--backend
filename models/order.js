const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const CartItemSchema = new mongoose.Schema({
    product: { type:ObjectId, ref:'Product'},
    name:  String ,
    price: Number,
    count: Number
},{ timestamps: true }

)

const CartItem = mongoose.model('CartItem',CartItemSchema)

const OrderSchema = new mongoose.Schema({

    products : [CartItemSchema],
    transaction_id: {},
    address: String,
    amount: { type: Number},
    status:{
        type:String,
        default:'Not Processed',
        enum:['Not Processed','Processing','Shipped','Delivered','Cancelled']
        // enum means fixed string object //
    },
    updated: Date,
    user: { type: ObjectId, ref:'User'}
},
    {timestamps : true}   
)

const Order = mongoose.model('Order',OrderSchema)

module.exports = {Order,CartItem}

