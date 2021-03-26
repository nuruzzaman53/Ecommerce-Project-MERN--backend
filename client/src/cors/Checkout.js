import React,{useState,useEffect} from 'react'
import '../custom_bootstrap.css'
import {getProducts,getBraintreeClientToken,processPayment,createOrder} from './apiCore' 
import {isAuthenticated} from '../auth/index'
import { Link } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from './cartHelper'

const Checkout = ({product}) => {

    const[data,setData] = useState({
        success:false,
        loading:false,
        error:'',
        clientToken:null,
        address:'',
        instance:{}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id

    const token =  isAuthenticated() && isAuthenticated().token

    const getToken = (userId,token) => {
        getBraintreeClientToken(userId,token).then(data => {
            if(data.error) {
                setData({...data,error:data.error})
            } else{
                setData({ clientToken: data.clientToken})
            }         
        })

        
    }

    useEffect(() => {
        getToken(userId,token)
    },[])

    const handleAddress = event => {
        setData({...data,address:event.target.value})
    }

    const getTotal = () => {
        return product.reduce((currentValue,nextValue) => {
            return currentValue + nextValue.count *  nextValue.price
        },0) // product.reduce method adding each element of an array like [1,2,3,4] 
     // output is 1+2+3+4 = 10
    }

    const showCheckout = () => {
        return isAuthenticated() ? 
          ( <div > {showDropIn()} </div>) :
           
            (<Link to='./signin'>
                <button className='btn btn-primary'>Sign in to Checkout</button>
            </Link>)
        
    }

    let deliveryAddress = data.address

    const buy = () => {
        setData({ loading: true})
        let nonce
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            nonce = data.nonce 
            const paymentData = {
                paymentMethodNonce: nonce,
                amount : getTotal(product)
            }
            processPayment(userId,token,paymentData)
                .then(response => {
                    console.log(response)
                    const createOrderData = {   ///sending order data to the backend //
                        products: product,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: deliveryAddress
                    }
                    createOrder(userId,token,createOrderData).then(response => {
                            emptyCart(() => {
                                console.log('Payment success & empty cart')
                                setData({ loading: false,success:true })
                            })
                        }
                    )

                 })
                .catch(error => {
                    console.log(error)
                    setData({ loading: false })
                }) 
        })

        .catch(error => {
            setData({...data,error:error.message}) // payment method  error //
        })
    }

    const showDropIn = () => (
        <div onBlur = {() => setData({...data,error:''})}>
            {data.clientToken !== null && product.length > 0 ? (
                <div>
                    <div className='form-group'>

                        <label><h4>Delivery Address </h4></label>
                        <textarea className='form-control'                       
                        onChange={handleAddress}
                        value={data.address}                      
                        />

                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal:{ flow:'vault' }
                      }} onInstance = { instance =>(data.instance = instance)}                  
                    /> <br/>
                    <button onClick={buy} className='btn btn-primary btn-block'>
                        <i className="fa fa-check-circle"></i> Pay Your Amount </button><br/><br/>
                </div>
            ) : null }
        </div>
    )

    const showError = error => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }} >
            <i className='fa fa-times'></i> {error}
        </div>
    ) 
    const showSuccess = success => (
        <div className='alert alert-success' style={{ display: success ? '' : 'none' }} >
           <i className='fa fa-check-circle'></i> Thanks ! Your Payment Was Successful
        </div>
    )  
    
    const showLoading = loading => loading && <h1 className='text-success'>Loading....</h1>

    return(
        <div>
            
            <h3>Total : ${getTotal()}</h3><br/>
            {showError(data.error)}
            {showSuccess(data.success)}
            {showCheckout()}
            {showLoading(data.loading)}
        </div>
        
    )

}

export default Checkout