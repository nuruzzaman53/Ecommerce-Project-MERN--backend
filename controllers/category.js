
const Category = require('../models/category')

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

exports.read = (req,res) => {
    return res.json(req.category)
}

exports.update = (req,res) => {
    const category = req.category
    category.save((err,updatedCategory)=> {
        if(err){
            return res.status(400).json({
                 err
            })
        }
        res.json({ updatedCategory ,'message':'Category updated' })
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