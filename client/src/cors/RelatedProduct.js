import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import ShowPhoto from './ShowPhoto'
import {addItem} from './cartHelper'

const RelatedProduct = ({
        product,
        showAddToCartButton= true,
    }) => {

    const[redirect,setRedirect] = useState(false)
    const[count,setCount] = useState(product.count)


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


        return(

            <div>

                 {shouldRedirect(redirect)}

                    <div className='row'>
                        <ShowPhoto item={product} />                                                   
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}
                            {showAddToCart(showAddToCartButton)} </p>
                        </div>
            </div>             

        
        )
}

export default RelatedProduct
