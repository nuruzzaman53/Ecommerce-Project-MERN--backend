const {Order,CartItem} = require('../models/order')


exports.orderById = (req,res,next,id) => {
    Order.findById(id).populate('products.product','name price').exec((error,order) => {
        if(error) {
            return res.status(400).json({
                error: 'Found no order through this ID'
            })
        }
        req.order = order
        next()
    })
}

exports.create = (req,res) => {

   req.body.order.user = req.profile
   const order = new Order(req.body.order)
   order.save((error,data) => {
    if(error) {
        return res.status(400).json({
            error: 'Order Creation failed'
        })
    }
    res.json(data)
   })
}

exports.read = (req,res) => {
    Order.find().populate('user','_id name').sort('-created').exec((error,data) => {
        if(error) {
            return res.status(400).json({
                error: 'No Order found in the Bucket'
            })
        }
        res.json(data)
    })
}

exports.orderStatus = (req,res) => {
    res.json(Order.schema.path('status').enumValues)
}

exports.orderUpdate = (req,res) => {
    Order.update({_id: req.body.orderId},{$set:{status:req.body.status}},(error,order)=> {
        if(error) {
            return res.status(400).json({
                error: 'Order updating failed'
            })
        }
        res.json(order)
    })
}