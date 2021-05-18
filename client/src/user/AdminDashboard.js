import React from 'react'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../cors/Layout'
import '../custom_bootstrap.css'

const AdminDashboard = () => {

  const {user:{name,email,role}} = isAuthenticated() // getting user object from isauthenticated () method //

  const adminLinks = () => {
    return (
      <div className='mb-2'>
      <h2>Admin Links</h2>
        <ul className='list-group'>
          <Link className='list-group-item' to='/create/category'><i className="fa fa-angle-double-right" ></i> Create Category</Link>
          <Link className='list-group-item' to='/create/product'><i className="fa fa-angle-double-right" ></i> Create Product</Link>
          <Link className='list-group-item' to='/admin/orders'><i className="fa fa-angle-double-right" ></i> View Orders</Link>
          <Link className='list-group-item' to='/admin/manageProduct'>
            <i className="fa fa-angle-double-right" ></i> Manage Products </Link>
            <Link className='list-group-item' to='/admin/manageCategory'><i className="fa fa-angle-double-right" ></i> Manage Category</Link>
        </ul>

    </div>
    )
  }

  const adminInfo = () => {
    return(
      
      <div className='mb-2'>

      <h2>Admin Information</h2>
      <ul className='list-group'>
        <li className='list-group-item'><i className='fa fa-user-circle'></i> {name}</li>
        <li className='list-group-item'><i className='fa fa-envelope'></i> {email}</li>
        <li className='list-group-item'><i className='fa fa-user-circle'></i>
         {role ===1 ? ' Admin' : ' Registered User'} 
         </li>
      </ul>
    </div>
    )
  }

    return(
        
            <Layout title='Admin Dashboard' description={`Good day, ${name}`} 
            className='container-fluid'>

              <div className='row justify-content-center'>

                  <div className='col-3'>
                      {adminLinks()}
                  </div>

                  <div className='col-7'>
                    {adminInfo()}
                </div>

              </div>

           </Layout>
    )

}

export default AdminDashboard