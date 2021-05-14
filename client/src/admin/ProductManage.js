import moment from 'moment'
import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../cors/Layout'
import '../custom_bootstrap.css'
import {listProducts,deleteProduct} from './ApiAdmin'
import ReactPaginate from 'react-paginate'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const API = "https://mernappstore.herokuapp.com/api"

const AdminDashboard = () => {

  const {user,token} = isAuthenticated()

  const [product,setProduct] = useState([])

  const [pageNumber,setPageNumber] = useState(0)

  const productPerPage = 6

  const pageVisited = pageNumber * productPerPage

  const pageCount = Math.ceil(product.length / productPerPage)


  const loadProduct = () => {
      listProducts().then(data => {
          if(data.error){
            console.log(data.error)
          } else {
            setProduct(data)
          }
      })
  }
  const destroyProduct = (productId) => {
    deleteProduct(user._id,token,productId).then(data => {
      if(data.error){
        console.log(data.error)
      } else {
        loadProduct()
      }
    })
  }

  useEffect(()=> {
    loadProduct()
  },[])

  const adminLinks = () => {
    return (
      <div className='mb-2'>
      <h2>Admin Links</h2>
        <ul className='list-group'>
          <Link className='list-group-item' to='/create/category'><i className="fa fa-angle-double-right" ></i> Create Category</Link>
          <Link className='list-group-item' to='/create/product'><i className="fa fa-angle-double-right" ></i> Create Product</Link>
          <Link className='list-group-item' to='/admin/orders'><i className="fa fa-angle-double-right" ></i> View Orders</Link>
          <Link className='list-group-item active' to='/admin/manageProduct'>
            <i className="fa fa-angle-double-right" ></i> Manage Products</Link>
          <Link className='list-group-item ' to='/admin/manageCategory'>
            <i className="fa fa-angle-double-right" ></i> Manage Category</Link>
        </ul>

    </div>
    )
  }

  const productList = () => {

    return(
      
        <div className='mb-2'>

            <h2> Total {product.length} Products Available</h2>
            
            <table className='table'>
              <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Created</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sold</th>
              <th>Edit</th>
              <th>Delete</th>
              </tr>
           
                {product.slice(pageVisited,pageVisited + productPerPage).map((p,i) => {

                return(  

                    <tr key={i}>

                      <td><LazyLoadImage src={`${API}/product/photo/${p._id}`} width='50px' /> </td>

                      <td>{p.name} </td>

                      <td>{moment(p.updatedAt).fromNow()}</td>

                      <td>$ {p.price}</td>

                      <td className='text-center'>{p.quantity}</td>

                      <td>{p.sold}</td>

                      <td><Link to={`/admin/product/update/${p._id}`} >
                        <i className='fa fa-pencil' style={{cursor:'pointer',textAlign:'center'}}></i>
                      </Link></td>

                      <td><span onClick={()=> destroyProduct(p._id)} >
                        <i className='fa fa-times-circle' style={{cursor:'pointer',textAlign:'center'}}></i>
                      </span>
                      </td>
                    </tr>
                ) 
                })}
            </table>


        </div>
    )
  }

  const changePage = ({selected}) => {

    setPageNumber(selected)

  }

    return(
        

            <Layout  className='container-fluid'>

              <div className='row justify-content-center'>

                  <div className='col-3'>
                      {adminLinks()}
                  </div>

                  <div className='col-7'>

                    <ReactPaginate 
                      previousLabel={'Previous'}
                      nextLabel={'Next'}
                      pageCount={pageCount}
                      onPageChange={changePage}
                      containerClassName={'pagination'}
                      previousLinkClassName={'page-link'}
                      nextLinkClassName={'page-link'}
                      activeLinkClassName={'btn btn-info'}
                      pageClassName={'page-item'}
                      pageLinkClassName={'page-link'}
                    />

                      {productList()}
                </div>

              </div>

           </Layout>
    )

}

export default AdminDashboard