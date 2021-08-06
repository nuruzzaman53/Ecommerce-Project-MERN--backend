import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {API} from '../config'

const ShowPhoto = ({item}) => {

   return( <div className='product-img'>

        <LazyLoadImage  src={`${API}/product/photo/${item._id}`} 

        alt={item.name}

        className='mb-3'
        
        style={{ maxWidth:"100%",maxHeight:"100%" }} />

    </div>
  )
}

export default ShowPhoto