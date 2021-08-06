import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../cors/Layout'
import {signup} from '../auth/index'

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

          <form className='custom_signin mt-5' >

            <h2>Create a New Account</h2> <br/>

            <div className='form-group'>
              <input onChange = {handleChange('name')} type='text' value={name}  
              className='form-control col-11' placeholder='Your Name' />
            </div>

            <div className='form-group'>
              <input onChange = {handleChange('email')} type='email' value={email} 
              className='form-control col-11' placeholder='Your Email ID' />
            </div>

            <div className='form-group'>
              <input onChange = {handleChange('password')} type='password'value={password} 
              className='form-control col-11' placeholder='Please type a strong password' />
            </div> <br/>

            <button  onClick={clickSubmit } className='btn btn-primary'> 
            
            <i class="fa fa-plus-circle" ></i> Create a New Account</button>

          </form>
      )

      const showError = () => (
        <div className='alert alert-danger col-8' style={{ display: error ? '' : 'none'}}>
          <i className='fa fa-window-close'></i> {error}
        </div>
      )

      const showSuccess =() => (
        <div className='alert alert-success col-8' style={{ display: success ? '' : 'none'}}>
          <i className='fa fa-check-square'></i> New Account is created .Please 
         <Link to='/signin'> <i className="fa fa-sign-in"></i> Sign in</Link>
      </div>
      )

      const showSigin = () => (
        <div className='mt-5 ml-2'>
            <p>Already have an acount ? please <Link to='/signin'>Login your account</Link></p>
        </div>
      )

      return(

          <Layout title='Sign up' 
          description='Sign up to Node React Ecommerce App' 
          className='container'
          >
            <div className='row justify-content-center'>

            <div className='col-7 offset-2 mt-5'>

              {showError()}
              {showSuccess()}
              {signUpForm()}
              {showSigin()}

              </div>

            </div>



        </Layout>

      )
}

export default Signup