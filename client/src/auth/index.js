
const API = "http://localhost:8000/api" // backend url //

export const signup = user => {
    return fetch(`${API}/signup`,{ // send request at backend export.signup method //
        method: 'POST',
        headers: { Accept:'application/json','Content-Type':'application/json'},
        body: JSON.stringify(user) 
        // JSON.Stringify method convert any javascript object into string //
      })
      .then(response => { return response.json() })
      .catch(err => { console.log(err) })

}  // ====== ending signup method  =======//

export const signin = user => {
    return fetch(`${API}/signin`,{
        method: 'POST',
        headers: { Accept:'application/json','Content-Type':'application/json'},
        body: JSON.stringify(user)
      })
      .then(response => { return response.json() })
      .catch(err => { console.log(err) })

} // ====== ending signin method  =======//

export const authenticate = (data,next) => {
  if(typeof window !=='undefined') {
    localStorage.setItem('jwt',JSON.stringify(data))
    next()
  }
} // ====== ending authenticate method  =======//

export const signout = (next) => {
  if(typeof window !=='undefined') {
    localStorage.removeItem('jwt')
    next()
    return fetch(`${API}/signout`,{ method:'GET' })
    .then(response => { console.log('Signout',response) })
    .catch(err => console.log(err))
  }
} // ====== ending signout method  =======//

export const isAuthenticated = () => {
  if(typeof window == 'undefined') { 
    return false
  }

  if(localStorage.getItem('jwt')) { 
    return JSON.parse(localStorage.getItem('jwt'))
    //JSON.parse convert any text into javascript object //
  } else {
    return false
  }
} // ======= ending isAuthenticated() method ==============//