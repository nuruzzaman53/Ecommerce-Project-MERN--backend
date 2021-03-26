import React,{useState,useEffect} from 'react'
import { getProducts } from './apiCore'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ShowPhoto from './ShowPhoto';



const ProductSlider = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      }

    const [productBySell,setProductBySell] = useState([])

    const init = () => {
        getProducts('sold').then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setProductBySell(data)
                console.log(data)
            }
        })
    }

    useEffect(()=> {
        init()
    },[])

    return(

        <div className='container'>


         <h1 className='mb-4 text-left'> Our New Arrival Products <hr/></h1>

         <Slider {...settings}>
          

            {productBySell.map((p,i) =>(

                <div className='col'>

                    <ShowPhoto  item={p} />
            
                     <p>{p.name}</p>

                </div>
            
            ))}

        </Slider>
 
    
       </div>
        
    )

}

export default ProductSlider