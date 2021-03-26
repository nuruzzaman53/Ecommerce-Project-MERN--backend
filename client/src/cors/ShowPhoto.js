import React from 'react'

const API ="http://localhost:8000/api" // backend server code //

const ShowPhoto = ({item}) => {

   return( <div className='product-img'>

        <img  src={`${API}/product/photo/${item._id}`} 
        
        className='card-img-top mb-3'
        
        alt={item.name}
        
        style={{ maxWidth:"70%",maxHeight:"70%"}} />

    </div>
  )
}

export default ShowPhoto