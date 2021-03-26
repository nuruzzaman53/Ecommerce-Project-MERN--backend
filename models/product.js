const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({

    name: {  type: String, required: true, maxlength: 200},
    description: { type: String, required: true , maxlength: 4000},
    price: { type: Number ,required: true,maxlength: 100},
    category: { type: ObjectId ,ref:'Category',required: true},
    quantity:{ type: Number},
    sold:{ type: Number,default: 0 },
    photo: { data: Buffer, contentType: String },
    shipping: { required: false ,type: Boolean}
}, 
    { timestamps: true }  
)

module.exports = mongoose.model('Product',productSchema)
