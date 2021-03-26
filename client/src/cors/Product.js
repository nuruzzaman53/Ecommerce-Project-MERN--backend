import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import Layout from './Layout'
import { read,relatedProductList } from './apiCore'
import '../custom_bootstrap.css'
import Card from './Card'
import ShowPhoto from './ShowPhoto'
import {addItem} from './cartHelper'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Product = (props) => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      }

    const [product,setProduct] = useState([])
    const [error,setError]     = useState(false)
    const [relatedProduct,setRelatedProduct] = useState([])
    const [redirect,setRedirect] = useState(false)

    const loadSingleProduct = productId => {

        read(productId).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                relatedProductList(data._id).then(data => {
                    if(data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })

    }

    useEffect(()=> {
        const productId = props.match.params.productId // get product id from url //
        loadSingleProduct(productId)
    },[props])

    const stockView = (quantity) => {
        return quantity >0 ? 
        <h5 className='badge badge-info'> In Stock  </h5> : 
        <h5 className='badge badge-danger'> Out Of Stock </h5>
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

    return(

        <Layout  className='container'>

           <div className='row'>

           {shouldRedirect(redirect)}

               <br/>

               <div className='col-5'>

               <ShowPhoto item={product} />

               </div>

               <div className='col-7'>

                <h2 className='card-title'> {product.name}  </h2> 

                <p className='lead'>{product.description} </p>

                <p className='lead'>Item Available(Pcs) : {product.quantity} </p>

                <h4>Price : ${product.price}</h4>

                <h4 className='black-8'>Category: {product.category && product.category.name}</h4>

                <p className='black-8'>Payment Method : Paypal & Credit Card</p>

              <br/>
                <button className='btn btn-primary' onClick={addToCart} >
                    <i className="fa fa-shopping-basket" ></i> Add to Cart
                </button>

               </div> 


            </div>  <br/><br/>
  
            <h2>Related Product</h2> <br/>

            <div className='row'>

            {relatedProduct.map((p,i) => (
                <div className='col-4'>
                <Card product={p} key={i}/>
                </div>

            ))}
            
            </div>


        </Layout>
    )
}

export default Product