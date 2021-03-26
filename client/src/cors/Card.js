import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import ShowPhoto from './ShowPhoto'
import moment from 'moment'
import {addItem,updateItem,removeItem} from './cartHelper'

const Card = ({
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
                    <button className='btn btn-danger mt-2 mb-2'>
                    <i className="fa fa-eye"></i> View Item</button>

            )
        )
    }

    const showRemoveProduct = showRemoveButton => {
        return(
            showRemoveButton && (
                <button onClick={()=> removeItem(product._id)} className='btn btn-outline-danger ml-4 mt-2 mb-2'>
                <i className="fa fa-trash"></i> Remove Product</button>
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
            return <Redirect to='/shop' />
        }
       
    }

    const showAddToCart = showAddToCartButton => {

        return(
            showAddToCartButton && (

            <button onClick={addToCart} className='btn btn-primary mt-2 mb-2 ml-2'>
                        
            <i className="fa fa-shopping-basket" ></i> + Cart
        
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
                <div className='input-group-prepand'>
                    <span className='input-group-text'> Adjust quantity</span>
                </div>
             <input type='number' 
                className='form-control col-8' 
                value={count} 
                onChange={changeHandler(product._id)} 

             />
            </div>
             
     ) 
    }

    const stockView = (quantity) => {
        return quantity >0 ? 
        <h5 className='badge badge-info'> In Stock  </h5> : 
        <h5 className='badge badge-danger'> Out Of Stock </h5>
    }

        return(

            <div>
                
                <div>
                    {shouldRedirect(redirect)}

                    <ShowPhoto item={product} />

                   <h4 className='card-title'> {product.name}  </h4> 

                    <h5>${product.price} {stockView(product.quantity)} </h5> 

                    <Link to={`/product/${product._id}`}>

                            {showView(showViewProductButton)}

                    </Link>  

                    {showAddToCart(showAddToCartButton)} 

                    {showRemoveProduct(showRemoveButton)} <br/>

                    {showCartUpdateOptions(cartUpdate)}
                  
                    
                </div>  


                    
            </div>
        )
}

export default Card
