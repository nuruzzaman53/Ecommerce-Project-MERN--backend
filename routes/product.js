const express = require('express')
const router = express.Router()
const { userById } = require('../controllers/user')
const { isAuth,isAdmin,requireSignin } = require('../controllers/auth')
const { 
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    productImage,
    listBySearch
} = require('../controllers/product')

router.get('/product/:productId',read) // read product by productid //

router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create) //create product //

router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove) //delete product//

router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update) //update product //

router.get('/products',list) // list of query products //

router.get('/products/related/:productId',listRelated) // list of related products //

router.post('/products/by/search',listBySearch)

router.get('/product/photo/:productId',productImage) // showing product images //

router.param('userId',userById)

router.param('productId',productById)

module.exports = router