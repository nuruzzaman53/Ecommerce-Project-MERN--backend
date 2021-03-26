import React,{useState} from 'react'

const WeatherAPI = () => {

    const API_key = "9cc4739fe2dfd9c22955e119cb7aeb66"
    const [city,setCity] = useState('')
    const [data,setData] = useState({})

    const changeHandler = (e) => {
        setCity(e.target.value)
    }
    const clickSubmit = async (e) => {
        e.preventDefault()
        const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
        const weatherJson = await weather.json()
        console.log(weatherJson)
        if(weatherJson){
            setData(weatherJson)
        }
    }

    return (
        <div className='container'>
            <h1 className='ui header'>Weather API </h1>
            <form>
            <div className="ui search">

                <div className="ui icon input">
                     <input className="prompt" type="text" autoComplete onChange={changeHandler} placeholder="Enter Weather" />
                     <i className="search icon"></i>
                </div>

                <button onClick = {clickSubmit} className="ui green button" type='submit'>
                    <i className="search icon"></i> Explore Weather
                </button>

            </div>
            </form>
            <h1>{data.name}</h1>
        </div>
    )
}

export default WeatherAPI
