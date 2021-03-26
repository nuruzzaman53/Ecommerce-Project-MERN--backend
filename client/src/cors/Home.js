import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import '../custom_bootstrap.css'
import { getProducts } from './apiCore'
import ProductSlider from './ProductSlider'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      }

    const [productBySell,setProductBySell] = useState([])

    const [productByArrival,setProductByArrival] = useState([])

    const [error,setError] = useState(false)

    const [loading,setLoading] = useState(false)

    const loadProductBySell = () => {
        setLoading(true)
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductBySell(data)
                setLoading(false)
            }
        })
    }

    const loadProductByArrival = () => {
        setLoading(true)
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductByArrival(data)
                setLoading(false)
            }
        })
    }
    useEffect(() => {
        loadProductBySell()
        loadProductByArrival()
    },[])

    if(loading){
        return <h2 className='text-center mt-10'>Loading ....</h2>
    }

    return(

        <Layout className='container'>


            <h2 className='mb-4 text-left'> Our New Arrival Products <hr/></h2>

            {loading}

            <Slider {...settings}>          

                {productByArrival.map((product,i) =>(

                    <div className='col mb-5'>
                
                         <Card key={i} product={product}/>
                    </div>
                
                ))}


            </Slider> <br/><br/>

            <h2 className='mb-4 text-left'> Our Best Selling Products <hr/> </h2>

            {loading}
            <Slider {...settings}>

                {
                   productBySell.map((product,i) =>(
                     <div className='col mb-5'>
                     <Card key={i} product={product}/>
                     </div>
                   
                ))}


            </Slider>


        </Layout>
  
    )

}

export default Home