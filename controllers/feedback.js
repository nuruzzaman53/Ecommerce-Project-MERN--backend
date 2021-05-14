const formidable = require('formidable')
const _= require('lodash')
const fs = require('fs')
const Feedback = require('../models/feedback')

exports.createFeedback = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }
       const {name,comment} = fields
        if(!name || !comment) {
            return res.status(400).json({
                error:'All fields are required'
            })
        }

       let feedback = new Feedback(fields)

       // 1kb = 1000b
       // 1mb = 1,000,000 b
       if(files.photo) {
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error:'Image size should be less than 1Mb'
                })
            }

            feedback.photo.data = fs.readFileSync(files.photo.path) // fs.readFileSync( path, options ) //
            feedback.photo.contentType = files.photo.type
       } 
       feedback.save((err,result) => {
           if(err) {
               return res.status(400).json({
                 error: err
               })
           }
           res.json(result)
       })
    })
}
exports.feedbackById = (req,res,next,id) => {
    Feedback.findById(id).exec((error,feedback) => {
        if(error){
            return res.status(400).json({
                error:'No product found by this ID'
            })
        }
        req.feedback = feedback
        next()
    })
}
exports.readFeedback = (req,res) => {
    return res.json(req.feedback)
}
exports.removeFeedback = (req,res) => {
    let feedback = req.feedback
    feedback.remove((error,feedback) => {
        if(error){
            return res.status(400).json({
                error
            })
        }
        res.json({ msg:'Product deleted'})
    }) 
}
exports.updateFeedback = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(error,files,fields) => {
        if(error) {
            return res.status(500).json({
                error
            })
        }
        let feedback = req.feedback
        feedback=_.extend(feedback,fields)
        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(500).json({
                    error:'Image should be less than 1MB'
                })
            }
        feedback.photo.data = fs.readFileSync(file.photo.path)
        feedback.photo.contentType = files.photo.type
            
        }
        feedback.save((error,data) => {
            if(error) {
                return res.status(500).json({
                    error
                })
            }
            res.json(data)
        })
    })
}
exports.showFeedbackImage = (req,res,next) => {
    if(req.feedback.photo.data){
        res.set('Content-Type',req.feedback.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}