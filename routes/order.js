const express = require('express')

const router = express.Router()

const { userById,userPurchaseHistory } = require('../controllers/user')

const { requireSignin,isAuth, isAdmin} = require('../controllers/auth')

const { create,read ,orderStatus,orderById,orderUpdate} = require('../controllers/order')

const { adjustQuantity } = require('../controllers/product')


// router.post('/order/create/:userId',requireSignin,isAuth,userPurchaseHistory,adjustQuantity,create)//

router.post('/order/create/:userId',requireSignin,isAuth,userPurchaseHistory,adjustQuantity,create)


router.get('/order/list/:userId',requireSignin,isAuth,isAdmin,read)


router.get('/order/status/:userId',requireSignin,isAuth,isAdmin,orderStatus)

router.put('/order/:orderId/status/:userId',requireSignin,isAuth,isAdmin,orderUpdate)


router.param('userId',userById)

router.param('orderId',orderById)


module.exports = router