const express = require('express')

const router = express.Router()

const { create,read,update,remove,categoryById,getAllCategories, 
    createCategory, showCategoryImage, updateCategory} 
    = require('../controllers/category')

const { userById } = require('../controllers/user')

const {categoryValidator} = require('../validator/index')

const {isAuth,isAdmin,requireSignin } = require('../controllers/auth')

//router.post('/category/create/:userId',requireSignin,isAuth,isAdmin,categoryValidator,create) // category create //

router.post('/category/create/:userId',requireSignin,isAuth,isAdmin,createCategory)

router.get('/category/photo/:categoryId',showCategoryImage)

router.get('/category/:categoryId',read) // category read //

router.put('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,updateCategory) // category update //

router.delete('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,remove) // category delete //

router.get('/categories',getAllCategories) // get all list of categories //


router.param('userId',userById)

router.param('categoryId',categoryById)

module.exports = router
