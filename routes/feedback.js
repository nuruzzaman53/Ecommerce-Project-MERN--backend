const express = require('express')

const router = express.Router()


const {isAuth,isAdmin,requireSignin} = require('../controllers/auth')

const {userById} = require('../controllers/user')


const { createFeedback,feedbackList } = require('../controllers/feedback')

router.get('/feedback',feedbackList) 

router.post('/feedback/create/:userId',requireSignin,isAuth,isAdmin,createFeedback)

router.param('userId',userById)



module.exports = router