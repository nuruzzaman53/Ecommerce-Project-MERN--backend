import React,{useState} from 'react'
import logo from './github-logo.png'

const GithubRepo = () => {

    const [username,setUsername] = useState('')
    const [data,setData] =useState({})
    const [repositories,setRepositories] = useState([])

    const changeHandler = (e) => {
        setUsername(e.target.value)
    }
    const clickSubmit = async (e) => {
        e.preventDefault()
        const profile = await fetch(`https://api.github.com/users/${username}`)
        const profileJson = await profile.json()
        console.log(profileJson)
        const repositories = await fetch(profileJson.repos_url)
        const repoJson = await repositories.json()
        
        if(profileJson){
            setData(profileJson)
            setRepositories(repoJson)
        }
    }

    return (
       
        <div className='container'>
            <div className='row'>
                <div className='col-sm-8 offset-col-2'>


            <h1 className='display-4'>Github API For Github User</h1>

            <img src={logo} alt={logo} height='90px' style={{margin:10}} /> 

            <div className="ui search">
                <div className="ui icon input">
                     <input className="prompt" type="text" onChange={changeHandler} placeholder="Search Profile..." />
                     <i className="search icon"></i>
                </div>
                <button onClick = {clickSubmit} className="ui blue button" type='submit'>
                    <i className="github icon"></i> Search on Github
                </button>

            </div>
            <div className="ui very relaxed items">
                <div className="item">
                    <div className="image">
                    <img src={data.avatar_url}  />
                    </div>
                    <div className="content">
                    <a className="ui header" href={data.html_url} target='_blank'> {data.name} </a>
                    <div className="description">
                        <p>{data.bio}</p>
                        <p>{data.location}</p>
                        <p>{data.created_at}</p>
                        {repositories.map(repo => ( 
                        <div className="ui relaxed divided list">
                            <div className="item">
                                <i className="large github middle aligned icon"></i>
                                <div className="content">
                                <a className="header" href={repo.html_url} target='_blank'>{repo.name}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
               </div>
           </div>
           
           </div>
            </div>
     </div>
 
  )
}

export default GithubRepo
