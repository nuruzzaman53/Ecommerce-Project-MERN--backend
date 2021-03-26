import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import ShowPhoto from './ShowPhoto'
import moment from 'moment'
import {addItem,updateItem,removeItem} from './cartHelper'


const Table = ({
        product,
        showViewProductButton = true,
        showAddToCartButton= true,
        cartUpdate = false,
        showRemoveButton = false
    }) => {

    const[redirect,setRedirect] = useState(false)
    const[count,setCount] = useState(product.count)

    const showView = showViewProductButton => {
        return(
                showViewProductButton && (                    
                    <button className='btn btn-outline-primary mt-2 mb-2'>
                    <i className="fa fa-eye"></i> View Product</button>

            )
        )
    }

    const showRemoveProduct = showRemoveButton => {
        return(
            showRemoveButton && (
                <span className='btn btn-danger' onClick={() => removeItem(product._id)} style={{cursor:'pointer' }} >
                <i className="fa fa-trash"></i></span>
            )
        )
    }

    const addToCart = () => {
        addItem(product,()=> {
            setRedirect(true)
        })
    }

    const shouldRedirect = (redirect) => {
        if(redirect) {
            return <Redirect  to='/cart' />
        }
       
    }

    const showAddToCart = showAddToCartButton => {

        return(
            showAddToCartButton && (

            <button onClick={addToCart} className='btn btn-danger mt-2 mb-2 ml-2'>
                        
            <i className="fa fa-shopping-basket" ></i> Add to Cart
        
            </button> 
        ))
    }

    const changeHandler = productId => event => {
        setCount(event.target.value <1 ? 1 : event.target.value)
        if(event.target.value >= 1){
            updateItem(productId,event.target.value)
        }
    }

    const showCartUpdateOptions= cartUpdate => {
        return cartUpdate && (
            <div className='input-group mb-3'>
             <input type='number' 
                className='form-control col-4' 
                value={count} 
                onChange={changeHandler(product._id)} 

             />
            </div>
             
     ) 
    }

    const stockView = (quantity) => {
        return quantity >0 ? 
        <span className='badge badge-success'> In Stock  </span> : 
        <span className='badge badge-danger'> Out Of Stock </span>
    }

        return(

            <div>
                
                <div className='row'>

                    <div className='col-2'><ShowPhoto item={product} /></div>
                    <div className='col-3'>{product.name}</div>
                    <div className='col-1'>${product.price}</div>
                    <div className='col-4'>{showCartUpdateOptions(cartUpdate)}</div>
                    <div className='col-1'>{showRemoveProduct(showRemoveButton)}</div>

                </div>

            </div>
        )
}

export default Table
