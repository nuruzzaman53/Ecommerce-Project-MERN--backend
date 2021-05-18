
//const API ="http://localhost:8000/api" 

const API = "https://mernappstore.herokuapp.com/api"

export const createCategory = (userId,category,token) => {
    return fetch(`${API}/category/create/${userId}`,{  //===== create a new category ====== //
        method: 'POST',
        headers: { 
          Accept:'application/json',
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}` // token required for authorization //
        },
        body: JSON.stringify(category) 
      })
      .then(response => { return response.json() })
      .catch(err => { console.log(err) })

}   // ======= ending createCategory ========= //

export const createProduct = (userId,product,token) => {
  return fetch(`${API}/product/create/${userId}`,{ //===== create a new product ====== //
      method: 'POST',
      headers: { 
        Accept:'application/json',
        Authorization:`Bearer ${token}` // token required for authorization //
      },
      body: product
    })
    .then(response => { return response.json() })
    .catch(err => { console.log(err) })

} // ======= ending createProduct ========= //

export const getCategories = () => {
  return fetch(`${API}/categories`,{  // ===== get all categories API ===== //
    method:'GET'
  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )

} //====== ending getCategories ======//

export const singleCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`,{  // ===== get all categories API ===== //
    method:'GET',
    headers: { 
      Accept:'application/json'
    }

  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )
}


export const deleteCategory = (userId,token,categoryId) => {
  return fetch(`${API}/category/${categoryId}/${userId}`,{  // ===== get all categories API ===== //
    method:'DELETE',
    headers: { 
      Accept:'application/json',
      'Content-Type':'application/json',
      Authorization:`Bearer ${token}` // token required for authorization //
    }
  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )

} //====== ending getCategories ======//


export const updateCategory = (userId,token,categoryId,category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`,{  
    method:'PUT',
    headers: { 
      Accept:'application/json',
      Authorization:`Bearer ${token}` 
    },
    body: category
  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )

} 


export const listOrders = (userId,token) => {
  return fetch(`${API}/order/list/${userId}`,{  // ===== get all categories API ===== //
    method:'GET',
    headers: { 
      Accept:'application/json',
      Authorization:`Bearer ${token}` // token required for authorization //
    }

  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )
}

export const getOrderStatus = (userId,token) => {
  return fetch(`${API}/order/status/${userId}`,{  // ===== get all categories API ===== //
    method:'GET',
    headers: { 
      Accept:'application/json',
      Authorization:`Bearer ${token}` // token required for authorization //
    }

  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )
}

export const updateOrderStatus = (userId,token,orderId,status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`,{  // ===== get all categories API ===== //
    method:'PUT',
    headers: { 
      Accept:'application/json',
      'Content-Type':'application/json',
      Authorization:`Bearer ${token}` // token required for authorization //
    },
    body : JSON.stringify({status,orderId})
  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )
}

export const listProducts = () => {
  return fetch(`${API}/products`,{  // ===== get all categories API ===== //
    method:'GET',
    headers: { 
      Accept:'application/json'
    }

  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )
}

export const deleteProduct = (userId,token,productId) => {
  return fetch(`${API}/product/${productId}/${userId}`,{  // ===== get all categories API ===== //
    method:'DELETE',
    headers: { 
      Accept:'application/json',
      'Content-Type':'application/json',
      Authorization:`Bearer ${token}` // token required for authorization //
    }

  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )
}

export const singleProduct = (productId) => {
  return fetch(`${API}/product/${productId}`,{  // ===== get all categories API ===== //
    method:'GET',
    headers: { 
      Accept:'application/json'
    }

  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )
}

export const updateProduct = (userId,token,productId,product) => {
  return fetch(`${API}/product/${productId}/${userId}`,{  
    method:'PUT',
    headers: { 
      Accept:'application/json',
      Authorization:`Bearer ${token}` 
    },
    body: product

  })
  .then(response => { return response.json()})
  .catch(err => {console.log(err)} )
}