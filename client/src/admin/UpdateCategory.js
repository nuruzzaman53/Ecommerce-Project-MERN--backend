import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../cors/Layout'
import { singleCategory,updateCategory } from './ApiAdmin'

const AddCategory = ({match}) => {

    const [name,setName]       = useState('')
    const [error,setError]     = useState(false)
    const [success,setSuccess] = useState(false)

    // destructure user & token from local storage //
    const {user,token} = isAuthenticated()

    const changeHandler = e => {
       setError('')
       setName(e.target.value)
    }

    const initCategories = (categoryId) => {
        singleCategory(categoryId).then(data => {
            if(data.error){
                setError(data.error)
                console.log(data.error)
            } else {
                setName(data.name)
            }
        })
    }

    useEffect(() => {
        initCategories(match.params.categoryId)
    },[])

    const clickSubmit = e => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        updateCategory(user._id,token,match.params.categoryId,name).then(data => {
            if(data.error){
                setError(data.error)
                console.log(data.error)
            } else {
                setSuccess(true)
            }
        })
    }

    const newCategoryForm = () =>(

        <form onSubmit={clickSubmit}>

            <h2>Update the Category</h2><br/>

            <div className='form-group'>
                <label>Name</label>
                <input type='text' 
                className='form-control col-8' 
                value={name}
                autoFocus 
                onChange={changeHandler} 
                />
            </div>

           <button  className='btn btn-primary '> Update Category </button>

       </form>

    
    )

    
    const showError = (error) => (
        <div className='alert alert-danger col-8' style = {{ display: error ? '' : 'none'}}>
               <i className='fa fa-window-close'></i> {error}
       </div>   
     )

    const showSuccess = () => {
        if(success) {
        return <div className='alert alert-success col-8'>

              <i className='fa fa-check-square'></i>  {name} is Updated      
           </div>

        }
    }
    const goBack = () => (
        <div className='mt-5'> 
          <Link to='/admin/manageCategory' className='text-primary' > 
          <i className='fa fa-arrow-circle-left' ></i> Back to Category Page  
          </Link>
        </div>
    )
    
    return(
        
        <Layout className='container-fluid mt-5' >

          <div className='row justify-content-center '>

              <div className='col-3'>
  
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