import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../cors/Layout'
import '../custom_bootstrap.css'
import {getPurchaseHistory} from './apiUser'
import moment from 'moment'
import ShowPhoto from '../cors/ShowPhoto'

const Dashboard = () => {

  const {user:{_id,name,email,role}} = isAuthenticated()

  const token = isAuthenticated().token

  const [history,setHistory] = useState([])

  const init = (userId,token) => {
    getPurchaseHistory(userId,token).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setHistory(data)
      }
    })
  }

  useEffect(()=> {
   init(_id,token)
  },[])

  const userLinks = () => {
    return (
      <div >
      <h2>User Links</h2>
        <ul className='list-group'>
          <Link className='list-group-item active' to='/user/dashboard'><i className='fa fa-angle-double-right'></i> My Cart</Link>
          <Link className='list-group-item' to={`/profile/${_id}`}> <i className='fa fa-angle-double-right'></i> Profile Update</Link>
        </ul>

    </div>
    )
  }

  const userInfo = () => {
    return(
      
      <div className='mb-2'>

      <h2>User Information</h2>
      <ul className='list-group'>
        <li className='list-group-item'><i className='fa fa-user'></i> {name}</li>
        <li className='list-group-item'><i className='fa fa-envelope'></i> {email}</li>
        <li className='list-group-item'><i className='fa fa-check'></i>
         {role ===1 ? ' Admin' : ' Registered User'} 
         </li>
      </ul>
    </div>
    )
  }

  const purchaseHistory = (history) => {
    return(
      <div className='mb-5'>
      <h2>Purchase History</h2>

        <ul className='list-group'>
          <li className='list-group-item'>
            {history.map((h,i) => {
              return(
                <div key={i}>
                  {h.products.map((p,i) => {
                    return(
                      <div className='row'>
                        <div key={i} className='col-3'>
                          <ShowPhoto item={p} />
                        </div>
                        <div className='col-6'>
                        <h3>{p.name}  <i className='fa fa-angle-double-right'></i> ${p.price} </h3>
                        <p>Purchased Date: {moment(p.createdAt).fromNow()} </p>
                        <p>Quantity: {p.count} pcs</p>
                        <hr/>
                      </div>
                    </div>
                    )
                  })}
                </div>
              )
            })}
          </li>
        </ul>

    </div>
    )
  }
    return(
        
            <Layout title='Dashboard' description={`Good day, ${name}`} className='container'>

              <div className='row'>

                  <div className='col-3'>
                      {userLinks()}
                  </div>

                  <div className='col-9'>
                    {userInfo()} <br/>
                    {purchaseHistory(history)}
                </div>

              </div>

           </Layout>
    )

}

export default Dashboard