import React, { useState } from 'react'

const Checkbox = ({categories,handleFilter}) => {

    const [checked,setChecked] = useState([])

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c)
        const newCategoryId = [...checked] 
        if(currentCategoryId === -1) {
            newCategoryId.push(c)
        } else {
            newCategoryId.splice(currentCategoryId,1)
        }
        console.log(newCategoryId)
        setChecked(newCategoryId)
        handleFilter(newCategoryId)
    }

    return categories.map((c,i) => (

        <li key={i} className='list-unstyled'>
            <input type='checkbox' onChange={handleToggle(c._id)} 
            value={checked.indexOf(c._id===-1)}
            className='form-check-input' />
             <span className="checkmark"></span>
            <label className='form-check-label'> {c.name} </label>
        </li>



    ))
}

export default Checkbox