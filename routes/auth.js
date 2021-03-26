const express = require('express')

const router = express.Router()

const { signup,signin,signout,requireSignin } = require('../controllers/auth')

const { userSignupValidator,signinValidator } = require('../validator/index')

router.post('/signup',userSignupValidator,signup)

router.post('/signin',signinValidator,signin)

router.get('/signout',signout)

router.get('/hello',requireSignin,(req,res)=>{

    res.send('Hello from Express JS')
    
})

module.exports = router
