
const User = require('../models/user')
const {Order} = require('../models/order')
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client("947436172889-4dkuapda7fen61a3o7pulk2virqkct2o.apps.googleusercontent.com")

 // Googlev login //

 exports.googleLogin  =(req,res) => {
     const {tokenId} = req.body
     client.verifyIdToken({Idtoken:tokenId,audience:"947436172889-4dkuapda7fen61a3o7pulk2virqkct2o.apps.googleusercontent.com"})
     .then(response => {
         const {email_verified,name,email} = response.payload
         console.log(response.payload)
     })
 }

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

