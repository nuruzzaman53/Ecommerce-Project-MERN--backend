const express = require('express')

const router = express.Router()

const { requireSignin,isAuth,isAdmin} = require('../controllers/auth')

const { mailValidator } = require('../validator/index')

const { userById,read,update,mailSend,googleLogin,purchaseHistory } = require('../controllers/user')

 /* Google login */

router.post('/googleLogin',googleLogin)

router.post('/mail',mailSend)

/* regular user login */

router.get('/user/:userId',requireSignin,isAuth,read)
router.put('/user/:userId',requireSignin,isAuth,update)
router.get('/orders/by/user/:userId',requireSignin,isAuth,purchaseHistory)


router.param('userId',userById)

module.exports = router




