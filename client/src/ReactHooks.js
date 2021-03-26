import React,{useState} from 'react'

const ReactHooks = () => {

    const [count,setCount] = useState(0)

    return (

        <div className='container'>

            <h1 className='display-4'>React Hooks Practice</h1>

            <p>{count}</p>

            <button onClick={() => setCount(count + 1000)}
                className='btn btn-outline-danger'>
                + Click Here to increase the value 
           </button>

        </div>
    )
}

export default ReactHooks

