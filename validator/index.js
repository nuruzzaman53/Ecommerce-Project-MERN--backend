exports.userSignupValidator = (req,res,next) => {
    req.check('name','Name is required').notEmpty()
    req.check('email','Email is required').notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({ min:4 ,max:31 })
    .withMessage('Email must be between 4 to 31 characters')

    req.check('password','Password is required').notEmpty()
    req.check('password')
    .isLength({ min: 6 })
    .withMessage('password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number')

    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({
            error: firstError
        })
    }

    next()
}

exports.signinValidator = (req,res,next) => {
    req.check('email','Email is required').notEmpty()
    req.check('email','Email must be between 3 to 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')

    req.check('password','Password is required').notEmpty()
    req.check('password')
    .matches(/\d/)
    .withMessage('Password must contain a number')

    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({
            error: firstError
        })
    }

    next()
}
exports.categoryValidator = (req,res,next) => {

    req.check('name','Category name is required').notEmpty()
    .isLength({min:3,max:100})
    .withMessage('Category must be between 10 to 100 characters characters')
    
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({
            error: firstError
        })
    }
    next()
}

exports.feedbackValidator = (req,res,next) => {
    
    req.check('name','Name is required').notEmpty()
    .isLength({max:100})
    .withMessage('Name must be under 100 characters')

    req.check('comment','Please type some comment').notEmpty()
    .isLength({min:10,max:200})
    .withMessage('Comment must be between 10 to 200 characters')

    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        })
    }
    next()
}
