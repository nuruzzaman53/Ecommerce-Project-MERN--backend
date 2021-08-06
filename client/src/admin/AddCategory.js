import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../cors/Layout'
import { API } from '../config'

const AddCategory = () => {

    const [values,setValues] = useState({
      name:'',
      photo:'',
      error:'',
      success:''
    })

    // destructure user & token from local storage //
    const {user,token} = isAuthenticated()
    const userId = user._id
    const userToken = token

    const {name,photo,error,success} = values


    const clickSubmit = async e => {
        e.preventDefault()
        setValues({...values,error:'',success:''})
        const formData = new FormData()
        formData.append('name',name)
        formData.append('photo',photo)

        let result = await fetch(`${API}/category/create/${userId}`,{
          method:'POST',
          headers: { Authorization:`Bearer ${userToken}`},
          body:formData
        })
        if(result) { 
          setValues({...values,success:true })
        } else {
          alert('Category creation failed')
        }
    }

    const newCategoryForm = () =>(

        <form onSubmit={clickSubmit}>

            <h2>Create a New Category</h2><br/>

            <div className='form-group'>
                <label>Name</label>
                <input type='text' className='form-control col-8' value={name} autoFocus 
                  onChange={(e)=> { setValues({...values,name:e.target.value})}} 
                />
            </div>

            <div className='form-group'>
                <label>Category Photo</label>
                <input type='file' name='photo'className='form-control col-8' 
                 onChange={(e) => { setValues({...values,photo:e.target.files[0]})}} 
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
          <Link className='list-group-item active' to='/create/category'>
            <i className="fa fa-angle-double-right" ></i> Create Category
          </Link>
          <Link className='list-group-item' to='/create/product'>
            <i className="fa fa-angle-double-right" ></i> Create Product
          </Link>
          <Link className='list-group-item' to='/admin/orders'>
            <i className="fa fa-angle-double-right" ></i> View Orders
          </Link>
          <Link className='list-group-item' to='/admin/manageProduct'>
            <i className="fa fa-angle-double-right" ></i> Manage Products 
          </Link>
          <Link className='list-group-item' to='/admin/manageCategory'>
            <i className="fa fa-angle-double-right" ></i> Manage Category
          </Link>
          <Link className='list-group-item ' to='/create/feedback'>
            <i className="fa fa-angle-double-right" ></i> Create Feedback
          </Link>
          <Link className='list-group-item ' to='/admin/manageFeedback'>
            <i className="fa fa-angle-double-right" ></i> Manage Feedback
          </Link>
        </ul>
    
        </div>
        )
      }
    
    const showError = () => (
        <div className='alert alert-danger col-8' style = {{ display: error ? '' : 'none'}}>
               <i className='fa fa-window-close'></i> {error}
       </div>   
     )

     const showSuccess = () => (
      <div className='alert alert-success col-8' style = {{ display: success ? '':'none'}}>
         <i className='fa fa-check-square'></i> {name} Category is created 
      </div>
) 
    const goBack = () => (
        <div className='mt-5'> 
          <Link to='/admin/manageCategory' className='text-primary' > 
          <i className='fa fa-arrow-circle-left' ></i> Back to Category List  
          </Link>
        </div>
    )
    
    return(
        
        <Layout title='Create a New Category' 
                description={`${user.name},is ready to create any category`} 
                className='container'
        >

          <div className='row justify-content-center'>

              <div className='col-3'>
                {adminLinks()}
              </div>

              <div className='col-9'>
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