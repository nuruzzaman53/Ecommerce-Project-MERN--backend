const User = require('../models/user')
const expressJwt  = require('express-jwt') // for require signin  check //
const jwt = require('jsonwebtoken') // to sign token //

exports.signup = (req,res) => {
    const {name,email,password} = req.body
    User.findOne({email}).exec((error,user) => {
      if(user) {
          return res.status(400).json({
              error: 'User with that email already exist. Choose another one'
          })
      }
    const newUser = new User(req.body) // create a new user from the body data //
    newUser.save((err,user) => {
        if(err) {
            return res.status(400).json({
                err
            })
        }
        res.json( { user  })
    })
 })
}
exports.signin = (req,res) => {
    const {email,password} = req.body
    User.findOne({email},(error,user) => {
      if(error || !user) {
          return res.status(400).json({
              error: 'User with that email does not exist'
          })
      }
      // If user is found make sure email & passsword //
      // create authenticate method in user model //
      if(!user.authenticate(password)) {
          return res.status(400).json({
              error:'Email & password dont match'
          })
      }
      // generate a sign token 
      const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
      res.cookie('t',token,{expire:new Date() + 9999})
      const {_id,name,email,role} = user
      return res.json({token,user:{_id,email,name,role}})
    })
}

exports.signout = (req,res) =>{
    res.clearCookie('t')
    res.json({ message : 'SignOut Success'})
}

exports.requireSignin = expressJwt({
    secret : process.env.JWT_SECRET,
    userProperty:'auth'
})

exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error: 'Access denied'
        })
    }
    next()
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resources! ,access denied'
        })
    }
    next()
}