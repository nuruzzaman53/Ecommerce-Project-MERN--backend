import React,{useState} from 'react'
import {getSearchProduct} from './apiCore'

const Search = () => {

    const[word,setWord] = useState([])
    const [result,setResult] = useState([])

    const handleChange = (e) => {
        setWord(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        getSearchProduct({search:word}).then(response => {
            if(response.error){
                console.log(response.error)
            } else {
                setResult(response)
            }
        })
    }

    return(
        
        <div class="input-group col-9">

            <div class="form-outline col-8">
                <input type="search" id="form1" class="form-control" />
            </div>
            <button type="button" className="btn btn-primary">
                <i class="fa fa-search"></i> Search Item Here
            </button>

        </div>
  
    )

}

export default Search