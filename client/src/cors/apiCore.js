import queryString from 'query-string'

//const API ="http://localhost:8000/api"//

const API = "https://mernappstore.herokuapp.com/api"

export const getProducts = (sortBy) => {

    return fetch(`${API}/products?sortBy=${sortBy}`,{  
      // ===== get all products  API ===== //
      method:'GET'
    })
    .then(response => { return response.json()})
    .catch(err => {console.log(err)} )
  
  } //====== ending All Product List ======//

  

  export const getFilteredProducts = (skip,limit,filters = {} ) => {
    const data =  {skip,limit,filters}
    return fetch(`${API}/products/by/search`,{ 
        method: 'POST',
        headers: { 
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => { return response.json() })
      .catch(err => { console.log(err) })
  
  } // ======= ending getFiltered Products ========= /////



  export const getCategories = () => {
    return  fetch(`${API}/categories`,{  // ===== get all categories API ===== //
      method:'GET'
    })
    .then(response => { return response.json()})
    .catch(err => {console.log(err)} )
  
  } //====== ending getCategories ======//


  export const read = (productId) => {
    return  fetch(`${API}/product/${productId}`,{  // ===== get all products API ===== //
      method:'GET'
    })
    .then(response => { return response.json()})
    .catch(err => {console.log(err)} )
  
  } //====== ending getCategories ======//


  export const relatedProductList = (productId) => {
    return  fetch(`${API}/products/related/${productId}`,{  // ===== get related product API ===== //
      method:'GET'
    })
    .then(response => { return response.json()})
    .catch(err => {console.log(err)} )
  
  } //====== ending getCategories ======//


  // ===== start Braintree Client token method ==== ///

  export const getBraintreeClientToken = (userId,token) => {
    return fetch(`${API}/braintree/getToken/${userId}`,{ 
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      }
    })
    .then(response => { return response.json() })
    .catch(err => console.log(err))
  }


// ===== ending Braintree Client token method ==== ///


export const processPayment = (userId,token,paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`,{ 
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
      Authorization:`Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
  .then(response => { return response.json() })
  .catch(err => console.log(err))
}

// ========= create a new order ====== ///

export const createOrder = (userId,token,createOrderData) => {

  return fetch(`${API}/order/create/${userId}`,{
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json',
      Authorization:`Bearer ${token}`
    },
    body: JSON.stringify({order:createOrderData})

  })
  .then(response => { return response.json()} )
  .catch(err => console.log(err))
}

export const getSearchProduct = (params) => {

  const query = queryString.stringify(params)
  console.log(query)
  return fetch(`${API}/products?search${query}`,{  
    method:'GET'
  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )

} 
