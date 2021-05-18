import React from 'react'
import {BrowserRouter,Switch,Route } from 'react-router-dom'
import Home from './cors/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/userDashboard'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Orders from './admin/Orders'
import Shop from './cors/Shop'
import Product from './cors/Product'
import Cart from './cors/Cart'
import Profile from './user/Profile'
import ProductManage from './admin/ProductManage'
import UpdateProduct from './admin/UpdateProduct'
import ManageCategory from './admin/ManageCategory'
import UpdateCategory from './admin/UpdateCategory'
import AddFeedback from './admin/AddFeedback'
import ManageFeedback from './admin/ManageFeedback'


const Routes = () => {

    return (<BrowserRouter>

        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/shop' exact component={Shop}/>
            <Route path='/signin' exact component={Signin}/>
            <Route path='/signup' exact component={Signup}/>
            <PrivateRoute path ='/user/dashboard' exact component={Dashboard} />
            <AdminRoute path ='/admin/dashboard' exact component={AdminDashboard} />
            <AdminRoute path ='/admin/orders' exact component={Orders} />
            <AdminRoute path ='/create/category/' exact component={AddCategory} />
            <AdminRoute path ='/create/product/' exact component={AddProduct} />
            <AdminRoute path ='/create/feedback/' exact component={AddFeedback} />
            <Route path='/product/:productId' exact component={Product} />
            <Route path='/cart' exact component={Cart}/>
            <PrivateRoute path ='/profile/:userId' exact component={Profile} />
            <AdminRoute path ='/admin/manageProduct' exact component={ProductManage} />
            <AdminRoute path ='/admin/manageFeedback' exact component={ManageFeedback} />
            <AdminRoute path ='/admin/manageCategory' exact component={ManageCategory} />
            <AdminRoute path ='/admin/product/update/:productId' exact component={UpdateProduct} />
            <AdminRoute path ='/admin/category/update/:categoryId' exact component={UpdateCategory} />
        </Switch>
    
    </BrowserRouter>
)}

export default Routes