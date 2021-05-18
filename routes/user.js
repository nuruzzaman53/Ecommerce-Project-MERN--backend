const express = require('express')

const router = express.Router()

const { requireSignin,isAuth,isAdmin} = require('../controllers/auth')

const { userById,read,update, googleLogin, purchaseHistory } = require('../controllers/user')

 /* Google login */

router.post('/google_login',googleLogin)

/* regular user login */

router.get('/user/:userId',requireSignin,isAuth,read)
router.put('/user/:userId',requireSignin,isAuth,update)
router.get('/orders/by/user/:userId',requireSignin,isAuth,purchaseHistory)


router.param('userId',userById)

module.exports = router




