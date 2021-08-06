const formidable = require('formidable')
const Category = require('../models/category')
const _= require('lodash')
const path = require('path')
const fs = require('fs')

exports.getAllCategories = (req,res) => {
    Category.find().exec((err,data) => {
        if(err) {
            return res.status(400).json({
                err
            })
        }
        res.json(data)
    })
}

exports.categoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,category) => {
        if(err || !category) {
            return res.status(400).json({
                err
            })
        }
        req.category = category
        next()
    })
}

exports.create = (req,res) => {
    const category = new Category(req.body)
    category.save((error,data)=> {
        if(error){
            return res.status(400).json({
                error:'Category should be unique'
            })
        }
        res.json({ data })
    })
    
}

exports.createCategory = (req,res) => {
    let form = new formidable.IncomingForm()
    form.uploadDir = './uploads'
    form.keepExtensions = true
    form.multiple = false
    form.parse(req,(err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }

       let category = new Category(fields)
       if(files.photo) {
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error:'Image size should be less than 1Mb'
                })
            }

            category.photo.data = fs.readFileSync(files.photo.path) // fs.readFileSync( path, options ) //
            category.photo.contentType = files.photo.type
       } 
       category.save((err,result) => {
           if(err) {
               return res.status(400).json({
                 error: err
               })
           }
           res.json(result)
       })
    })
}

exports.read = (req,res) => {
    return res.json(req.category)
}

exports.update = (req,res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err,result)=> {
        if(err){
            return res.status(400).json({
                 err
            })
        }
        res.json(result)
    })
}

exports.updateCategory = (req,res) => {
    let form = new formidable.IncomingForm()
    form.uploadDir = './uploads'
    form.keepExtensions = true
    form.multiple = false
    form.parse(req,(error,files,fields) => {
        if(error) {
            return res.status(500).json({
                error
            })
        }
        let category = req.category
        category=_.extend(category,fields)
        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(500).json({
                    error:'Image should be less than 1MB'
                })
            }
            //category.photo.data = fs.readFileSync(files.photo.path)
            category.photo.contentType = files.photo.type
            
        }
        category.save((error,data) => {
            if(error) {
                return res.status(500).json({
                    error
                })
            }
            res.json(data)
        })
    })
}

exports.remove = (req,res) => {
    let category = req.category
    category.remove((err,deletedCategory) => {
        if(err) {
            return res.status(400).json({
                err
            })
        }
        res.json({
            deletedCategory,'message':'Category deleted successfully'
        })
    })
}

exports.showCategoryImage = (req,res,next) => {
    if(req.category.photo.data) {
        res.set('Content-Type',req.category.photo.contentType)
        return res.send(req.category.photo.data)
    }
    next()
}