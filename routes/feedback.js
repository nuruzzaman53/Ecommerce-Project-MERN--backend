const express = require('express')
const router = express.Router()

const {isAuth,isAdmin,requireSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {feedbackValidator} = require('../validator/index')
const { createFeedback,feedbackList,feedbackById,
    showFeedbackImage,removeFeedback,updateFeedback,readFeedback } 
= require('../controllers/feedback')


router.get('/feedback',feedbackList) 

router.get('/feedback/:feedbackId',readFeedback) 

router.post('/feedback/create/:userId',requireSignin,isAuth,isAdmin,createFeedback)

router.get('/feedback/photo/:feedbackId',showFeedbackImage)

router.delete('/feedback/:feedbackId/:userId',requireSignin,isAuth,isAdmin,removeFeedback)

router.put('/feedback/:feedbackId/:userId',requireSignin,isAuth,isAdmin,updateFeedback)

router.param('userId',userById)

router.param('feedbackId',feedbackById)


module.exports = router