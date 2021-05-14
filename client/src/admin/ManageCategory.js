import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../cors/Layout'
import '../custom_bootstrap.css'
import {getCategories,deleteCategory} from './ApiAdmin'
import moment from 'moment'


const ManageCategory = () => {

  const {user,token} = isAuthenticated()
  const [category,setCategory] = useState([])

  const loadCategory = () => {
    getCategories().then(data => {
          if(data.error){
            console.log(data.error)
          } else {
            setCategory(data)
          }
      })
  }
  const destroyCategory = (categoryId) => {
    deleteCategory(user._id,token,categoryId).then(data => {
      if(data.error){
        console.log(data.error)
      } else {
        loadCategory()
      }
    })
  }

  useEffect(()=> {
    loadCategory()
  },[])

  const adminLinks = () => {
    return (
      <div className='mb-2'>
      <h2>Admin Links</h2>
        <ul className='list-group'>
          <Link className='list-group-item' to='/create/category'><i className="fa fa-angle-double-right" ></i> Create Category</Link>
          <Link className='list-group-item' to='/create/product'><i className="fa fa-angle-double-right" ></i> Create Product</Link>
          <Link className='list-group-item' to='/admin/orders'><i className="fa fa-angle-double-right" ></i> View Orders</Link>
          <Link className='list-group-item' to='/admin/manageProduct'><i className="fa fa-angle-double-right" ></i> Manage Products</Link>
          <Link className='list-group-item active' to='/admin/manageCategory'><i className="fa fa-angle-double-right" ></i> Manage Category</Link>
        </ul>

    </div>
    )
  }

  const categoryList = () => {

    return(
      
        <div className='mb-2'>

            <h2> Total {category.length} Category Available</h2>
            
            <table className='table'>
              <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Update </th>
              <th>Delete </th>
              </tr>
           
                {category.map((c,i) => {

                return(  

                    <tr key={i}>

                      <td>{c.name}</td>

                      <td>{moment(c.createdAt).fromNow()} </td>

                      <td>{moment(c.updatedAt).fromNow()} </td>

                      <td><Link to={`/admin/category/update/${c._id}`} >
                          <i className='fa fa-pencil text-success' style={{cursor:'pointer',textAlign:'center'}}></i>
                          </Link>
                          </td>

                      <td><span onClick={()=> destroyCategory(c._id)}>
                      <i className='fa fa-times-circle text-danger' style={{cursor:'pointer',textAlign:'center'}}></i>
                      </span>
                      </td>

                    </tr>
                ) 
                })}
            </table>


        </div>
    )
  }



    return(
        

            <Layout  className='container-fluid'>

              <div className='row justify-content-center'>

                  <div className='col-3'>
                      {adminLinks()}
                  </div>

                  <div className='col-7'>

                      {categoryList()}
                      
                </div>

              </div>

           </Layout>
    )

}

export default ManageCategory