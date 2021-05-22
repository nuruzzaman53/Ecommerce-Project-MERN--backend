const express = require('express')
const router = express.Router()


const {isAuth,isAdmin,requireSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {feedbackValidator} = require('../validator/index')
const { createFeedback,feedbackList,feedbackById,showFeedbackImage } = require('../controllers/feedback')


router.get('/feedback',feedbackList) 

router.post('/feedback/create/:userId',requireSignin,isAuth,isAdmin,feedbackValidator,createFeedback)

router.get('/feedback/photo/:feedbackId',showFeedbackImage)

router.param('userId',userById)

router.param('feedbackId',feedbackById)



module.exports = router