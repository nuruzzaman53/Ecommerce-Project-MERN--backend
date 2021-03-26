import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import '../custom_bootstrap.css'
import Card from './Card'
import {getCart} from './cartHelper'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'
import Table from './Table'

const Cart = () => {

    const [items, setItems] = useState([])
    const myCart = async () => { 
        let data = await getCart()
        setItems(data)
    }
    useEffect(()=>{
         myCart()
    } , [items])


    const showItems = items => {
        return(
            <div>
                <h3 className='mt-2'>Your Cart has {`${items.length}`} Products</h3><br/>

                <div className='row'>

                    <div className='col-2'><b>Photo</b></div>
                    <div className='col-3'><b>Name</b></div>
                    <div className='col-1'><b>Price</b></div>
                    <div className='col-4'><b>Quantity</b> </div>
                    <div className='col-1'><b>Remove</b></div>

                </div> <hr/>

                {items.map((product,i) =>(
                    <Table key={i} 
                    product={product} 
                    showAddToCartButton={false}
                    cartUpdate={true}
                    showRemoveButton={true}
                
                />))}
            </div>

        )
    }

    const noItemMessage = () => {
        return(
            <h3>Your Cart is Empty
            <Link to='/shop' >  Continue Shopping</Link>
            </h3>
        )
    }

    return(

        <Layout title='Shopping Cart' description='Continue shopping or go to checkout' 

        className='container-fluid'>

            <div className='row'>

                <div className='col-6 offset-1'>

                    {items.length >0 ? showItems(items) : noItemMessage()}

                   

                </div>

                <div className='col-4'>

                <Checkout product={items}/>

                </div>

            </div>

        </Layout>
    )

}

export default Cart