import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../cors/Layout'
import '../custom_bootstrap.css'
import {authenticate, signin,isAuthenticated} from '../auth/index'

const Signin = () => {

      const[values,setValues] = useState({
         email:'abcd@gmail.com', 
         password:'abcd1234', 
         error:'', 
         loading :false,
         redirectToreferror:false
      })
      const handleChange = name => event => {
        setValues({ ...values, error:false ,[name] : event.target.value })
      }
    
      const { email,password,error,loading,redirectToreferror } = values
      
      const {user} = isAuthenticated()
    
      const clickSubmit = e => {

        e.preventDefault()
        signin({email,password}).then(data => {
          if(data.error) {
            setValues({
              ...values,error:data.error,loading:false
            })
          } else {
            authenticate(data,() => {
              setValues({
                ...values,loading:true,redirectToreferror:true
            })
         })
      }
    })
  }
      const signUpForm = () => (

          <form>

            <h2>Sign in Form </h2> <br/>

            <div className='form-group'>
              <label>Email</label>
              <input onChange = {handleChange('email')} type='email' value={email} 
               className='form-control col-10' />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <input onChange = {handleChange('password')} type='password' value={password} 
              className='form-control col-10' />
            </div> <br/>

            <button  onClick={clickSubmit} className='btn btn-primary'>
            <i class="fa fa-paper-plane" ></i> Login to your dashboard</button>

          </form>
      )

      const showError = () => (
        <div className='alert alert-danger col-10' style={{ display: error ? '' : 'none'}}>
          <i className='fa fa-window-close'></i> {error}
        </div>
      )

      const showLoading = () => 
        loading && (<div className='alert alert-warning'><h2>Loading......</h2></div>
        
     )

     const redirectUser = () => {
       if(redirectToreferror) {
            if(user && user.role === 1) {
              return <Redirect to = '/admin/dashboard'/>
            } else {
              return <Redirect to = '/user/dashboard'/>
            }
       }
       if(isAuthenticated()) {
        return <Redirect to='/' />
      }
 
    }
      return(
          <Layout title='Sign in ' 
          description='Sign in to Node React Ecommerce App' 
          className='container'
          >

          <div className='row justify-content-center'>

          <div className='col-8 offset-2 mt-5'>

              {showLoading()}
              {showError()}
              {signUpForm()}
              {redirectUser()}

            </div>

          </div>



        </Layout>
      )
}

export default Signin