import React from 'react'
import Footer from './Footer'
import Menu from './Menu'


const Layout = ({ title='Title',description='This is description',children,className} ) => (
    
    <div className='justify-content-center'>

        <div className='container-fluid'>
            <div className='row top-header py-2'>
                <div className='col-10'>
                    <i class="fa fa-phone text-success mx-1"></i> 01962863390
                    <span className='mx-4'>
                        <i class="fa fa-envelope text-success mx-1"></i> info@zamanstore.com
                    </span>
                </div>
                <div className='col-2'>
                <span className='mx-4 text-right'>
                    <i class="fa fa-mobile text-danger  mx-1"></i> Save big on our app !
                </span>
                </div>
            </div>
        </div>

        <Menu/> <br/>

        <div className={className}>{children}</div>

        
    </div>

)


export default Layout