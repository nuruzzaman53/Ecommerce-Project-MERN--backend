import React,{useState,useEffect,Fragment} from 'react'

const RadioBox = ({prices,handleFilter}) => {

    const [values,setValues] = useState(0)

    const handleChange = (event) => {
        handleFilter(event.target.value)
        setValues(event.target.value)
    }

    return prices.map((p,i) => (

        <div key={i} >

            <input type='radio' onChange={handleChange} 

            value={p._id}

            name={p}

            className='ml-4 mr-2' />

            <label className='form-check-label'> {p.name} </label>

        </div>



    ))
}

export default RadioBox