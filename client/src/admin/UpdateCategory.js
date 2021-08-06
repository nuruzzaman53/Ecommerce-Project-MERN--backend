import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { API } from '../config'
import Layout from '../cors/Layout'
import { singleCategory,updateCategory } from './ApiAdmin'

const AddCategory = ({match}) => {

    const [values,setValues] = useState({
        name:'',
        photo:'',
        error:'',
        success:''
    })

    const {user,token} = isAuthenticated()

    const userId = user._id

    const userToken = token

    const {name,photo,error,success} = values //object destructing //

    const categoryId = match.params.categoryId

    const initCategories = (categoryId) => {
        singleCategory(categoryId).then(data => {
            if(data.error){
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values,name:data.name})
            }
        })
    }

    useEffect(() => {
        initCategories(categoryId)
    },[])

    const clickSubmit = e => {
        e.preventDefault()
        setValues({...values,error:'',success:''})

        const formData = new FormData()
        formData.append('name',name)
        formData.append('photo',photo)

        let result = fetch(`${API}/category/${categoryId}/${userId}`,{
            method:'PUT',
            headers:{
                Authorization:`Bearer ${userToken}`,
                Accept:'application/json'
            },
            body:formData
        })
        if(result) {
            setValues({...values,success:true})
        } else {
            alert('Category Updating failed')
        }
    }

    const newCategoryForm = () =>(

        <form onSubmit={clickSubmit}>

            <h2>Update the Category</h2><br/>

            <div className='form-group'>
                <label>Name</label>
                <input type='text' className='form-control col-8' value={name}
                autoFocus onChange={(e) => setValues({...values,name:e.target.value})} 
                />
            </div>

            <div className='form-group'>
                <label>Category Photo</label>
                <input type='file' name='photo' accept='image/*' className='form-control col-8'
                 onChange={(e) => { setValues({...values, photo:e.target.file })}} 
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
        
        <Layout className='container mt-5' >

          <div className='row justify-content-center '>

              <div className='col-3'>
  
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