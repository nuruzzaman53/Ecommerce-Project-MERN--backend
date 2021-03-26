import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth'
import '../custom_bootstrap.css'
import {Link} from 'react-router-dom'
import Layout from '../cors/Layout'
import {listOrders,getOrderStatus,updateOrderStatus} from './ApiAdmin'
import moment from 'moment'

const Orders = () => {

    const [orders,setOrders] = useState([])

    const [statusValues,setStatusValues] = useState([])

    const {user,token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setOrders(data)
            }         
        })
    }

    const loadStatus = () => {
        getOrderStatus(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setStatusValues(data)
            }         
        })
    }

    useEffect(()=> {
        loadOrders()
        loadStatus()
    },[])

    const showOrders = orders => {
        if(orders.length > 0) {
            return ( 
            <h1 className='text-primary'>Total Orders : {orders.length} </h1> 
            )
        } else {
           return <h2  className='text-danger'>You Have No Orders</h2>
        }
    }

    const changeHandler = (e,orderId) => {
        //console.log(e.target.value)
        updateOrderStatus(user._id,token,orderId,e.target.value).then(data => {
            if(data.error){
                console.log('Status update failed')
            } else {
                loadOrders()
            }
        })
    }

    const showStatus = o => (
        <div className='form-group'>
            Order Status: <h4 className='badge badge-danger'> {o.status} </h4>
            <select className='form-control' onChange={(e) => changeHandler(e,o._id)}>
                <option> Update Order Status </option>
                    {statusValues.map((status,index)=>( // first status then index (value,key)//
                        <option value={status} key={index} >{status}</option>
                    ))}
                
            </select>
            
        </div>
    )

    const adminLinks = () => {
        return (
          <div className='mb-2'>
          <h2>Admin Links</h2>
            <ul className='list-group'>
              <Link className='list-group-item' to='/create/category'><i className="fa fa-angle-double-right" ></i> Create Category</Link>
              <Link className='list-group-item' to='/create/product'><i className="fa fa-angle-double-right" ></i> Create Product</Link>
              <Link className='list-group-item active' to='/admin/orders'><i className="fa fa-angle-double-right" ></i> View Orders</Link>
              <Link className='list-group-item' to='/admin/manageProduct'>
                  <i className="fa fa-angle-double-right" ></i> Manage Products
              </Link>
              <Link className='list-group-item' to='/admin/manageCategory'><i className="fa fa-angle-double-right" ></i> Manage Category</Link>
            </ul>
    
        </div>
        )
      }

    return(
        
        <Layout className='container-fluid' >

          <div className='row justify-content-center'>

              <div className='col-3'>
                  {adminLinks()}
              </div>

              <div className='col-7'>

                {showOrders(orders)} 

                {orders.map((o,oIndex) => {
                    return(
                        <div className='mt-5 mb-5' key={oIndex} style={{borderBottom:'4px solid indigo'}}>
                            <h3><span>Order ID : {o._id}</span></h3>
                            <ul className='list-group mb-2'>
                                <li className='list-group-item'> {showStatus(o)}</li>
                                <li className='list-group-item'><p><i className='fa fa-check-circle text-primary'></i> Transaction ID:  {o.transaction_id} </p> </li>
                                <li className='list-group-item'><p><i className='fa fa-check-circle text-primary'></i> Amount: ${o.amount}  &rArr;  Order By:  {o.user.name} </p></li>
                                <li className='list-group-item'><p><i className='fa fa-check-circle text-primary'></i> Ordered On: {moment(o.createdAt).fromNow()} &rArr; Delivery Address: {o.address} </p></li>

                            </ul>

                            <h2 className='mt-4 mb-4'>Total Products in the order: {o.products.length}</h2>

                            {o.products.map((p,pIndex) => (
                                <div key={pIndex} style={{border:'1px solid indigo',padding:'10px'}} >
                                    <p>Product Name : {p.name} </p>
                                    <p>Product Quantity: {p.count}</p>
                                    <p>Product Price: $ {p.price}</p>
                                    <p>Product ID: {p._id}</p>
                                </div>
                            ))}
                          
                        </div>
                    )
                })}


          </div>

          </div>

       </Layout>
   )

}

export default Orders