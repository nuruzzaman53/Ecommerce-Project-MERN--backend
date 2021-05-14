import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const API = "https://mernappstore.herokuapp.com/api"

const ShowPhoto = ({item}) => {

   return( <div className='product-img'>

        <LazyLoadImage  src={`${API}/product/photo/${item._id}`} 
        
        className='card-img-top mb-3'
        
        alt={item.name}
        
        style={{ maxWidth:"70%",maxHeight:"70%"}} />

    </div>
  )
}

export default ShowPhoto