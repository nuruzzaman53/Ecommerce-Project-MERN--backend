const formidable = require('formidable')
const _= require('lodash')
const fs = require('fs')
const Product = require('../models/product')


exports.productById = (req,res,next,id) => {
    Product.findById(id).populate('category').exec((err,product) => {
        if(err || !product){
            return res.status(400).json({
                err
            })
        }
        req.product = product
        next()
    })
}

exports.read   = (req,res) =>   {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.create = (req,res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }
       const {name,description,price,quantity,category,shipping} = fields
        if(!name || !description || !price || !quantity || !category || !shipping) {
            return res.status(400).json({
                error:'All fields are required'
            })
        }

       let product = new Product(fields)

       // 1kb = 1000b
       // 1mb = 1,000,000 b
       if(files.photo) {
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error:'Image size should be less than 1Mb'
                })
            }

           product.photo.data = fs.readFileSync(files.photo.path) // fs.readFileSync( path, options ) //
           product.photo.contentType = files.photo.type
       } 
       product.save((err,result) => {
           if(err) {
               return res.status(400).json({
                 error: err
               })
           }
           res.json(result)
       })
    })
}

exports.remove = (req,res) => {
    let product = req.product
    product.remove((err,deletedProduct) =>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            'msg':'Product deletd success'
        })
    })
}

exports.update = (req,res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }
       /*const {name,description,price,quantity,category,shipping} = fields
        if(!name || !description || !price || !quantity || !category || !shipping) {
            return res.status(400).json({
                error:'All fields are required'
            })
        }*/

       let product = req.product
        product = _.extend(product,fields)
       // 1kb = 1000b
       // 1mb = 1,000,000 b
       if(files.photo) {
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error:'Image size should be less than 1Mb'
                })
            }

           product.photo.data = fs.readFileSync(files.photo.path)
           product.photo.contentType = files.photo.type
       } 
       product.save((err,result) => {
           if(err) {
               return res.status(400).json({
                   err
               })
           }
           res.json({ result })
       })
    })
}
// this method showing the products based on user query //
// such as products/?limit=7&sortBy=asc like that //
exports.list = (req,res) => {

    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy :'_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : ''

    Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy,order]])
    .limit(limit)
    .exec((err,products) => {
        if(err) {
            return res.status(400).json({
                err
            })
        }
       
        res.json(products)
 
    })

}

// it will find the products based on category //
// any product having same category will also show it //

exports.listRelated = (req,res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({_id: {$ne: req.product}, category: req.product.category})
           .limit(limit)
           .populate('category')
           .exec((err,product) => {
               if(err) {
                   return res.status(400).json({
                      err
                   })
               }
               res.json(product)
           })

}

exports.productImage = (req,res,next) => {

    if(req.product.photo.data) {
        res.set('Content-Type',req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }

    next()
}

exports.listBySearch = (req,res) => {

    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : ''
    let skip = parseInt(req.body.skip)
    let findArgs = {}

    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {
          if(key ==='price') {
            findArgs[key] =  {
                // gte -greater than price[0-10] //
                // lte -less than //
                $gte: req.body.filters[key][0],
                $lte: req.body.filters[key][1]
            } 
        } else {
            findArgs[key] = req.body.filters[key]
        }
    }
}

    Product.find(findArgs)
           .select('-photo')
           .populate('category')
           .limit(limit)
           .skip(skip)
           .sort([[sortBy,order]])
           .exec((err,data) => {
              if(err){
                return res.status(400).json({
                    err:'Products not found'
                })
              } 
              res.json({
                    size: data.length ,
                    data
            })
        })
}

exports.adjustQuantity = (req,res,next) => {
    
    let bulkOps = req.body.order.products.map(item =>{
        return{
            updateOne:{
                filter:{_id:item._id},
                update:{ $inc:{ quantity: -item.count,sold: +item.count} }
            }
        }
    })

    Product.bulkWrite(bulkOps,{},(error,products) => {
        if(error){
            return res.status(400).json({
                error:'Could not update product'
            })
        }
        next()
    })
}
