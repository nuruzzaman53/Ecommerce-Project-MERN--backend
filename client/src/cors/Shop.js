import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import { getCategories,getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import '../custom_bootstrap.css'
import RadioBox from './RadioBox'
import {prices} from './fixedPrices'
import Card from './Card'
import Search from './Search'

const Shop = () => {

    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [skip,setSkip] = useState(0)
    const [size,setSize] = useState(0)
    const [limit,setLimit] = useState(6)
    const [filteredResults,setFilteredResults] = useState([])
    const [myFilters,setMyFilters] = useState({
        filters: {
            category:[],
            price:[]
        }
    })

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }
    const loadFilteredResults = newFilters => {
        //console.log(newFilters)
        getFilteredProducts(skip,limit,newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = () => {
        let toSkip = limit + skip
        getFilteredProducts(toSkip,limit,myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults,...data.data])
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMoreButton = () => {
        return(
            size >0 && size >= limit &&(
            <button className='btn btn-primary' onClick={loadMore}>
                Load More Books
            </button>
            
        ))
    }

    useEffect(() => {
         init() 
         loadFilteredResults(skip,limit,myFilters.filters)
    },[])

    const handleFilter = (filters,filterBy) => {
        //console.log('SHOP',filters,filterBy) 
        const newFilter = {...myFilters}
        newFilter.filters[filterBy] = filters
        if(filterBy == 'price') {
            let priceValues = handlePrice(filters)
            newFilter.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilter)
    }

    const handlePrice = value => {
        const data = prices  // asssign data from import {prices} from './fixedPrices' //
        let priceRange = []
        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                priceRange = data[key].array   // taking data form fixedPrice array variable //
            }
        }
        return priceRange
    }



    return(

        <Layout title='Shop' description='Purchase your favourite books from here'

         className='container-fluid'>

            <div className='row'>
                
                    <div className='col-3'>

                        <h4>Filter By Categories</h4><hr/>

                        <ul>

                         <Checkbox  categories={categories} 

                         handleFilter={ filters => handleFilter(filters,'category')} />

                       </ul>

                       <h4>Filter By Prices</h4> <hr/>

                        <div>

                          <RadioBox  prices={prices} 

                           handleFilter={ filters => handleFilter(filters,'price')} 

                          />

                       </div>

                    </div>

                    <div className='col-9'>

                        <h2 className='mb-4'> <Search /></h2>

                        <div className='row'>

                            {filteredResults.map((product,i) =>(

                             <div className='col-3 mb-3'>

                                <Card  key={i} product={product} />

                            </div>


                            ))}
                        </div>

                         <hr/>     

                    
                    </div>

            </div>


        </Layout>
    )

}

export default Shop