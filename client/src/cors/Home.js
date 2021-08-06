import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import Card from './Card'
import { getProducts } from './apiCore'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {getFeedbacks} from '../admin/ApiAdmin'
import CategoryBuy from './CategoryBuy'
import Footer from './Footer'
import Banner from './banner.jpg'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {API} from '../config'
import moment from 'moment'

const Home = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay:true,
      }

    const [productBySell,setProductBySell] = useState([])

    const [feedback,setFeedback] = useState([])

    const [productByArrival,setProductByArrival] = useState([])

    const [error,setError] = useState(false)

    const loadFeedbacks = () => {
        getFeedbacks().then(data => {
              if(data.error){
                console.log(data.error)
              } else {
                setFeedback(data)
              }
          })
      }

    const loadProductBySell = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductBySell(data)
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductByArrival(data)
            }
        })
    }
    useEffect(() => {
        loadFeedbacks()
        loadProductBySell()
        loadProductByArrival()
    },[])

  

    return(

        <Layout className='container'>


            <h2 className='mb-4 text-left'> Our New Arrival Products </h2>


            <Slider {...settings}>          

                {productByArrival.map((product,i) =>(

                    <div className='col mb-5'>
                
                         <Card key={i} product={product} />
                    </div>
                
                ))}


            </Slider> <br/><br/>


            <h2 className='mb-4 text-left'> View Our Customer Feedback </h2>

            <div className='row  justify-content-center'>
                {feedback.map((f,i) => {
                    return(  
                        <div className='col-3' key={i}>
                            <div className='card text-center mb-2' style={{width: "16rem"}}>
                                    <LazyLoadImage src={`${API}/feedback/photo/${f._id}`} 
                                        alt={f.name}  className='card-img-top'
                                    />                                 
                                <div className="card-body">                           
                                    <h4 className="card-title">{f.name}</h4>
                                    <p className="card-text">{f.comment}</p>
                                    <b>Created at . {moment(f.createdAt).fromNow()}</b>                                         
                                </div>
                            </div> { /* ending card section */}
                        </div>  /* ending column section */
                    ) 
                    })} 
          </div> {/* ending row section */}

             <br/><br/><br/>

            <h2 className='mb-4 text-left'> Best Offer </h2>

            <Link to='/shop'><img src={Banner} /> </Link><br/><br/><br/>

            <h2 className='mb-4 text-left'> Purchase By Category  </h2>

            <CategoryBuy /> <br/><br/>

            <h2 className='mb-4 text-left'> Our Best Selling Products  </h2>

            <Slider {...settings}>

                {
                   productBySell.map((product,i) =>(
                     <div className='col mb-5'>
                     <Card key={i} product={product}/>
                     </div>
                   
                ))}


            </Slider> <br/><br/>

            
            <Footer />

        </Layout>
  
    )

}

export default Home