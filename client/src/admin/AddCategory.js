import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../cors/Layout'
import { createCategory } from './ApiAdmin'

const AddCategory = () => {

    const [name,setName]       = useState('')
    const [error,setError]     = useState(false)
    const [success,setSuccess] = useState(false)

    // destructure user & token from local storage //
    const {user,token} = isAuthenticated()

    const changeHandler = e => {
       setError('')
       setName(e.target.value)
    }

    const clickSubmit = e => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make request to API to create category //
        createCategory(user._id,{name},token).then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setError('')
                setSuccess(true)
            }
        })
    }

    const newCategoryForm = () =>(

        <form onSubmit={clickSubmit}>

            <h2>Create a New Category</h2><br/>

            <div className='form-group'>
                <label>Name</label>
                <input type='text' 
                className='form-control col-10' 
                value={name}
                autoFocus 
                onChange={changeHandler} 
                />
            </div>

           <button  className='btn btn-primary '> + Create a Category </button>

       </form>

    
    )

    const adminLinks = () => {
        return (
          <div className='mb-2'>
          <h2>Admin Links</h2>
            <ul className='list-group'>
              <Link className='list-group-item active' to='/create/category'><i className="fa fa-angle-double-right" ></i> Create Category</Link>
              <Link className='list-group-item' to='/create/product'><i className="fa fa-angle-double-right" ></i> Create Product</Link>
              <Link className='list-group-item' to='/admin/orders'><i className="fa fa-angle-double-right" ></i> View Orders</Link>
              <Link className='list-group-item' to='/admin/manageProduct'>
                  <i className="fa fa-angle-double-right" ></i> Manage Products
              </Link>
              <Link className='list-group-item' to='/admin/manageCategory'><i className="fa fa-angle-double-right" ></i> Manage Category</Link>
              
            </ul>
    
        </div>
        )
      }
    
    const showError = () => (
        <div className='alert alert-danger col-10' style = {{ display: error ? '' : 'none'}}>
               <i className='fa fa-window-close'></i> {error}
       </div>   
     )

    const showSuccess = () => {
        if(success) {
        return <div className='alert alert-primary col-10'>

              <i className='fa fa-check-square'></i>  {name} is created      
           </div>

        }
    }
    const goBack = () => (
        <div className='mt-5'> 
          <Link to='/admin/dashboard' className='text-primary' > 
          <i className='fa fa-arrow-circle-left' ></i> Back to Admin Page  
          </Link>
        </div>
    )
    
    return(
        
        <Layout title='Create a New Category' 
                description={`${user.name},is ready to create any category`} 
                className='container-fluid'
        >

          <div className='row justify-content-center'>

              <div className='col-3'>
                {adminLinks()}
              </div>

              <div className='col-7'>
                {showError()}
                {showSuccess()}
                {newCategoryForm()}
                {goBack()}
             </div>

          </div>

       </Layout>
   )
}

export default AddCategory