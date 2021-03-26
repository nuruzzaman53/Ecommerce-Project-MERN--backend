import React from 'react'
import Footer from './Footer'
import Menu from './Menu'


const Layout = ({ title='Title',description='This is description',children,className} ) => (
    
    <div className='justify-content-center'>

        <Menu/> <br/>

        <div className={className}>{children}</div>

        
    </div>

)


export default Layout