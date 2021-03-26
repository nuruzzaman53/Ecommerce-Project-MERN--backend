import React, { Fragment } from 'react'
import { Link,withRouter } from 'react-router-dom'
import {isAuthenticated, signout} from '../auth/index'
import { itemTotal } from './cartHelper'

//const {user} = isAuthenticated()

const isActive =(history,path) => {
    if(history.location.pathname === path) {
        return { color: 'indigo',fontWeight:'bold'}
    } else {
        return { color: '#000000'}
    }
}

const Menu = ({history}) =>(


    <div className='main_menu'>
        
        <nav class="navbar navbar-expand-lg navbar-light custom_header">
        <Link class="navbar-brand text-primary" to="/"><h2 className='my-1'><b>Dream E-Shop </b></h2></Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
        </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div className='mr-auto'></div>
        <ul class="navbar-nav">
        <li className='nav-item'>
            <Link to='/' style={isActive(history,'/')} className='nav-link' >
                <i className="fa fa-home" ></i> Home
            </Link>

        </li>
        <li className='nav-item'>
            <Link to='/shop' style={isActive(history,'/shop')} className='nav-link' >
                <i className="fa fa-shopping-bag" ></i> Shop
            </Link>

        </li>





        <li className='nav-item'>
                <Link to='/cart' style={isActive(history,'/cart')} className='nav-link' >
                  <i className="fa fa-cart-plus"></i> 
                   <span className='badge badge-danger'>{itemTotal()}</span>
                    
                </Link>

        </li>



        {!isAuthenticated() && (
                <Fragment>
                    
                    <li className='nav-item'>
                        <Link to='/signin'style={isActive(history,'/signin')} className='nav-link' >
                            <i className="fa fa-sign-in" ></i> Signin
                        </Link>

                    </li>

                    <li className='nav-item'>
                        <Link to='/signup' style={isActive(history,'/signup')} className='nav-link' >
                            <i className="fa fa-user-plus" ></i> Signup
                        </Link>

                    </li>

                </Fragment>
        )}

               {isAuthenticated() && (    
                    <li className='nav-item'>
                        <span 
                            onClick={()=> signout(() => { history.push('/') })} 
                            style={{cursor:'pointer',color:'black'}} 
                            className='nav-link' 
                            > Signout
                        </span>
    
                    </li>
                )} 

                        {isAuthenticated() && isAuthenticated().user.role ===0 && (
                            <li className='nav-item'>
                                <Link to='/user/dashboard' 
                                style={isActive(history,'/user/dashboard')} 
                                className='nav-link' >Dashboard</Link>
                            </li>
                        )}
                        {isAuthenticated() && isAuthenticated().user.role ===1 && (
                                <li className='nav-item'>
                                    <Link to='/admin/dashboard' 
                                    style={isActive(history,'/admin/dashboard')} 
                                    className='nav-link' > Dashboard
                                    </Link>
                            </li>
                        )}
            

    </ul>
    </div>

</nav>

    </div>
)

export default withRouter(Menu)

