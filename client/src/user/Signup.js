import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../cors/Layout'
import {signup} from '../auth/index'
import '../custom_bootstrap.css'

const Signup = () => {

      const[values,setValues] = useState({
        name : '',
        email:'', 
        password:'', 
        error:'', 
        success:false
      })

      const handleChange = name => event => {
        setValues({ ...values, error:false ,[name] : event.target.value })
      }
    
      const { name,email,password,success,error } = values
      

      const clickSubmit = e => {
        e.preventDefault()
        setValues({ ...values,error:false})
        signup({name,email,password})
        .then(data => { if(data.error) {
            setValues({
              ...values,error:data.error,success:false
            })
          } else {
            setValues({
              ...values, 
              name : '',
              email:'',
              password:'',
              error:'', 
              success: true
          })
      }
    })
  }
      const signUpForm = () => (

          <form>

            <h2>Sign Up Form</h2> <br/>

            <div className='form-group'>
              <label>Name</label>
              <input onChange = {handleChange('name')} type='text' value={name}  
              className='form-control col-10' />
            </div>

            <div className='form-group'>
              <label >Email</label>
              <input onChange = {handleChange('email')} type='email' value={email} 
              className='form-control col-10' />
            </div>

            <div className='form-group'>
              <label >Password</label>
              <input onChange = {handleChange('password')} type='password'value={password} 
              className='form-control col-10' />
            </div> <br/>

            <button  onClick={clickSubmit } className='btn btn-primary'> 
            
            <i class="fa fa-plus-circle" ></i> Create a New Account</button>

          </form>
      )

      const showError = () => (
        <div className='alert alert-danger col-10' style={{ display: error ? '' : 'none'}}>
          <i className='fa fa-window-close'></i> {error}
        </div>
      )

      const showSuccess =() => (
        <div className='alert alert-info col-10' style={{ display: success ? '' : 'none'}}>
          <i className='fa fa-check-square'></i> New Account is created .Please 
         <Link to='/signin'> <i className="fa fa-sign-in"></i> Sign in</Link>
      </div>
      )

      return(

          <Layout title='Sign up' 
          description='Sign up to Node React Ecommerce App' 
          className='container'
          >
            <div className='row justify-content-center'>

            <div className='col-8 offset-2 mt-5'>

              {showError()}
              {showSuccess()}
              {signUpForm()}

              </div>

            </div>



        </Layout>

      )
}

export default Signup