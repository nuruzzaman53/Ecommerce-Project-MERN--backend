
const User = require('../models/user')
const {Order} = require('../models/order')

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:'User not found'
            })
        }
        req.profile = user
        next()
    })

}

exports.read = (req,res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

exports.update = (req,res) => {
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$set: req.body},
        {new: true},
        (error,user) => {
            if(error){
                return res.status(400).json({
                    error:'Could not update user Information'
                })
            }  
          req.profile.hashed_password = undefined
          req.profile.salt = undefined 
          res.json(user)
    })
}

exports.userPurchaseHistory = (req,res,next) => {
    let history = []
    req.body.order.products.forEach(item => {
        history.push({
            _id:item._id,
            name:item.name,
            description:item.description,
            category:item.category,
            quantity:item.count,
            transaction_id:req.body.order.transaction_id,
            amount:req.body.order.amount
        })
    })

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push : {history:history} },
        {new:true},(error,data) => {
            if(error){
                return res.status(400).json({
                    error:'Could not update user purchase history'
                })
            }
            next()
        }
    )
}

exports.purchaseHistory = (req,res) => {
    Order.find({user:req.profile._id})
    .populate('user','_id name')
    .sort('-created')
    .exec((error,orders) => {
        if(error){
            return res.status(400).json({
                error:'Could not update user purchase history'
            })
        }
        res.json(orders)
    })
}

