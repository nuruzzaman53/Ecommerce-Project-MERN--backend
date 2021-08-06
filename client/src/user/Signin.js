import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import Layout from '../cors/Layout'
import {authenticate, signin,isAuthenticated} from '../auth/index'
import GoogleLogin from 'react-google-login';
import {API} from '../config'

const Signin = () => {

      const[values,setValues] = useState({
         email:'', 
         password:'', 
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

          <form className='custom_signin mt-5'>

            <h2>Signin</h2> <br/>

            <div className='form-group'>
              <input onChange = {handleChange('email')} type='email' value={email} 
               className='form-control col-11' placeholder='Enter your email'/>
            </div>

            <div className='form-group'>
              <input onChange = {handleChange('password')} type='password' value={password} 
              className='form-control col-11' placeholder='Enter password'/>
            </div> <br/>

            <button  onClick={clickSubmit} className='btn btn-outline-primary'>
            <i class="fa fa-paper-plane" ></i> Login to your dashboard</button>

          </form>
      )
      
      const successGoogle = (response) => {
         fetch(`${API}/googleLogin`,{
          method:'POST',
          data: { tokenId: response.tokenId }
        }).then(response => {
          console.log(response)
        })
         
      }

      const failureGoogle = (response) => {
        console.log(response)
      }

      const googleLogin = () => (

        <div className='row'>
          <div className='col-7 mt-2'>
            <GoogleLogin
              clientId="947436172889-4dkuapda7fen61a3o7pulk2virqkct2o.apps.googleusercontent.com"
              buttonText="Login with Google Account "
              onSuccess={successGoogle}
              onFailure={failureGoogle}
              cookiePolicy={'single_host_origin'}
              className="btn btn-outline-primary btn-block text-primary text-capitalize"
          />
          </div>
        </div>

      )

      const showError = () => (
        <div className='alert alert-danger col-7' style={{ display: error ? '' : 'none'}}>
          <i className='fa fa-window-close'></i> {error}
        </div>
      )

      const showSignup = () => (
        <div className='mt-5 ml-5'>
            <p>Dont' have an acount ? please <Link to='/signup'>Sign up</Link></p>
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
          <Layout className='container'>
            <div className='row justify-content-center'>
                <div className='col-7 offset-2 mt-5'>
                    {showLoading()}
                    {showError()}
                    {signUpForm()}
                    {showSignup()}
                    {googleLogin()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
      )
}

export default Signin