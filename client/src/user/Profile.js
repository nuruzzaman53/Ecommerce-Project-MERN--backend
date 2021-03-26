import React,{useState,useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../cors/Layout'
import '../custom_bootstrap.css'
import {getUser,updateUser,updateUserLocal} from './apiUser'

const Profile = ({match}) => {

    const[values,setValues] = useState({
        name:'',email:'',password:'',success:false,error:false
    })

    const {token} = isAuthenticated()

    const {name,email,password,success,error} = values

    const init = (userId) => {
        getUser(userId,token).then(data => {
            if(data.error){
                setValues({...values,error:true})
            } else {
                setValues({...values,
                    name:data.name,
                    email:data.email,
                    password:data.password,
                })
            }
        })
    }

    useEffect(()=>{
        init(match.params.userId)
    },[])

    const userLinks = () => {
        return (
          <div >
          <h2>User Links</h2>
            <ul className='list-group'>
                <Link className='list-group-item' to='/user/dashboard'>
                    <i className='fa fa-chevron-circle-right'></i>  My Cart
                </Link>
                <Link className='list-group-item active' to='/profile/update'>
                    <i className='fa fa-chevron-circle-right'></i> Profile Update
                </Link>
            </ul>
    
        </div>
        )
      }

      const handleChange = name => e => {
        setValues({...values, error:false, [name]: e.target.value})
      }

      const clickSubmit = e => {
        e.preventDefault()
        updateUser(match.params.userId,token,{name,email,password}).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                updateUserLocal(data,() => {
                    setValues({...values,
                        name:data.name,
                        email:data.email,
                        password:data.password,
                        success:true
                    })
                })
            } 
        })
    }

    const redirectTo = (success) => {
        if(success) {
            return <Redirect to = '/cart' />
        }
    }

    const profileUpdate = (name,email,password) => (

            <form>
                <div className='form-group'>
                    <label>Name</label>
                    <input type='text'  onChange={handleChange('name')} value={name} className='form-control' />
                </div>

                <div className='form-group'>
                    <label>Email</label>
                    <input type='email'  onChange={handleChange('email')} value={email} className='form-control' />
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input type='text'  onChange={handleChange('password')} value={password} className='form-control' />
                </div> <br/>

                <button onClick={clickSubmit} className='btn btn-primary'>Update Information</button>

            </form>

     )

     const showSuccess =() => (
        <div className='alert alert-success' style={{ display: success ? '' : 'none'}}>
          <i className='fa fa-check-square'></i> User Update SuccessFully
      </div>
      )

      const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none'}}>
          <i className='fa fa-window-close'></i> {error}
        </div>
      )

    return(

        <Layout className='container'>

            <div className='row'>

                <div className='col-3'>{userLinks()} </div>

                <div className='col-6'>

                    <h2>User Update</h2>

                    {showSuccess()}

                    {showError()}

                    {profileUpdate(name,email,password)}
                    

                </div>

            </div>

        </Layout>
    )
}

export default Profile