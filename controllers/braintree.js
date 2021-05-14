const User = require('../models/user')

const braintree = require('braintree')

//require('dotenv').config()

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "hvrcjpgdy49ntj6z",
  publicKey: "46rzx8q2wtnxj8br",
  privateKey: "f41fbdbe6e51807427d9ba20bd384f2f"
})

// === clientToken generate methond ========//

exports.generateToken = (req,res) => {

        gateway.clientToken.generate({},function(err,response) {
            if(err) {
                res.status(500).send(err)
            } else {
                res.send(response)
            }            
        })
}


// === Payment Processing methond ========//

exports.processPayment = (req,res) => {

    let nonceFromClient = req.body.paymentMethodNonce // client select which payment method //
    let amountFromClient = req.body.amount         // total cost/amount of selected product such as $20//
    //charge //

    let newTransaction = gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromClient,
        options : {
            submitForSettlement: true
        }
    },(error,result) => {
        if(error){
            res.status(500).json(error)
        } else {
            res.json(result)
        }      
    })
}