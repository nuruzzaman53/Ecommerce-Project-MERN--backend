import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth'
import '../custom_bootstrap.css'
import Layout from '../cors/Layout'
import {Link} from 'react-router-dom'
import {createProduct,getCategories} from './ApiAdmin'

const AddProduct = () => {

    const [values,setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        sold:'',
        quantity:'',
        photo:'',
        shipping:'',
        loading:false,
        error:'',
        redirectToProfile:false,
        createdProduct:'',
        formData:''
    })

    const {user,token} = isAuthenticated()

    const{
      name,description,price,categories,category,photo,sold,
      quantity,shipping,loading,error,
      createdProduct,redirectToProfile,formData
    } = values

    const init = () => {
       getCategories().then(data => {
        if(data.error){
          setValues({...values,error:data.error})
        } else {
          setValues({
            ...values,
            categories:data,
            formData: new FormData()
          })
        }
      })
    }


    useEffect(() => {
      return init()
    },[])

    const changeHandler = name => event => {
        const value = name ==='photo' ? event.target.files[0]: event.target.value
        formData.set(name,value)
        setValues({...values,error:'',[name]:value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values,loading:true,error:''})
        createProduct(user._id,formData,token).then(data => {
          if(data.error){
            setValues({...values,error: data.error})
          } else {
            setValues({...values,
              name:'',
              description:'',
              price:'',
              quantity:'',
              photo:'',
              error:'',
              loading:false,
              createdProduct: data.name
            })
          }
        })
    }

    const newProductForm = () =>(

        <form onSubmit={clickSubmit} className='mb-2'>

          <h2>Create a New Product</h2>

            <div className='form-group'>
                <label>Product Photo</label>
                <input type='file' name='photo' accept='image/*'
                  className='form-control btn-primary col-10' onChange={changeHandler('photo')} 
                />
            </div>

            <div className='form-group'>
                <label>Name</label>
                <input type='text'  className='form-control col-10' value={name} 
                onChange={changeHandler('name')} 
                />
            </div>

            <div className='form-group '>
                <label>Description</label>
                <textarea type='text' cols='5' rows='2'
                className='form-control col-10' 
                value={description}       
                onChange={changeHandler('description')} 
                />
            </div>

            <div className='form-row'>
              <div className='col-5 mb-3'>
                <label>Price</label>
                  <input type='number' 
                  className='form-control' 
                  value={price}                  
                  onChange={changeHandler('price')} />
              </div>

                <div className='col-5 mb-3'>
                    
                  <label>Category</label>
                  <select  className='form-control' onChange={changeHandler('category')}>

                  <option> Please Select a Category</option> 
                  {categories && categories.map((c,i) =>(
                  <option key={i} value={c._id}>{c.name}</option>                    
                  ))}
                  </select>
                </div>

            </div>

            <div className='form-row '>

                <div className='col-5 mb-2'>                       
                  <label>Shipping</label>
                  <select  className='form-control col-10' onChange={changeHandler('shipping')} >
                    <option>Select Shipping Option </option>
                    <option value='0'>No</option>
                    <option value='1'>YES</option>
                  </select>
                
                </div>
              
                <div className='col-5 mb-2'> 
                    
                  <label>Quantity</label>
                  <input type='number' className='form-control col-10' value={quantity}
                    onChange={changeHandler('quantity')} 
                  />

                </div> 
            </div> <br/>

              <button  className='btn btn-primary'> + Create a New Product </button>
            
        </form>

    
    )
    
   const showError = () => (
       <div className='alert alert-danger col-10' style = {{ display: error ? '' : 'none'}}>
              <i className='fa fa-window-close'></i>  {error}
      </div>   
    )
    const showSuccess = () => (
        <div className='alert alert-success col-10' style = {{ display: createdProduct ? '':'none'}}>
           <i className='fa fa-check-square'></i> {`${createdProduct}`} is created 
        </div>
  )
      

   const showLoading = () => (

      loading && (<div className='alert alert-success'><h6>Loading......</h6></div>)
   )

   const adminLinks = () => {
    return (
      <div className='mb-2'>
      <h2>Admin Links</h2>
        <ul className='list-group'>
          <Link className='list-group-item' to='/create/category'><i className="fa fa-angle-double-right" ></i> Create Category</Link>
          <Link className='list-group-item active' to='/create/product'><i className="fa fa-angle-double-right" ></i> Create Product</Link>
          <Link className='list-group-item' to='/admin/orders'><i className="fa fa-angle-double-right" ></i> View Orders</Link>
          <Link className='list-group-item' to='/admin/manageProduct'>
                  <i className="fa fa-angle-double-right" ></i> Manage Products
          </Link>
          <Link className='list-group-item' to='/admin/manageCategory'><i className="fa fa-angle-double-right" ></i> Manage Category</Link>
        </ul>

    </div>
    )
  }

    
    return(
        
        <Layout title='Create a New Product' 
                description={`G'day   ${user.name},is ready to create any Product`} 
                className='container-fluid'
        >

          <div className='row justify-content-center'>

            <div className='col-3'>
            {adminLinks()}
            </div>

              <div className='col-7'>
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newProductForm()}

             </div>

          </div>

       </Layout>
   )
}

export default AddProduct