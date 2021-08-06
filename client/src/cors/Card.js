import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import ShowPhoto from './ShowPhoto'
import {addItem,updateItem,removeItem,addLike} from './cartHelper'

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton= true,
    cartUpdate = false,
    showRemoveButton = false,
    showLikeButton = true
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
                <button onClick={()=> removeItem(product._id)} className='btn btn-danger ml-4 mt-2 mb-2'>
                <i className="fa fa-trash"></i> Remove Product</button>
            )
        )
    }

    const addToCart = () => {
        addItem(product,()=> {
            setRedirect(false)
        })
    }
    
    const addToLike = () => {
        addLike(product,() => {
            setRedirect(false)
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

            <Link onClick={addToCart} className='text-primary ml-5'>
                        
            <h5><i className="fa fa-shopping-basket" ></i> </h5>
        
            </Link> 
        ))
    }

    const showLike = showLikeButton => {

        return(
            showLikeButton && (

            <Link onClick={addToLike}>
                <h5 className='text-secondary ml-3'><i class="fa fa-heart"></i></h5>
            </Link>
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
                <div className='input-group'>
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
        <h5 className='btn btn-outline-primary'> In Stock  </h5> : 
        <h5 className='badge badge-danger'> Out Of Stock </h5>
    }

        return(

            <div className='justify-content-center'>
            
                <div className='product_card'>

                    {shouldRedirect(redirect)}
                    <Link to={`/product/${product._id}`}><ShowPhoto item={product} style={{width:"80%"}}/></Link>  
                    <h5 className='card-title'> {product.name}  </h5>
                    <div className="btn-group" role="group">
                       <h5> ${product.price}</h5> 
                       {showAddToCart(showAddToCartButton)}
                       {showLike(showLikeButton)}
                       
                    </div>

                    {showRemoveProduct(showRemoveButton)} <br/>

                    {showCartUpdateOptions(cartUpdate)}
        
                </div>                  
            </div>
        )
}

export default Card
