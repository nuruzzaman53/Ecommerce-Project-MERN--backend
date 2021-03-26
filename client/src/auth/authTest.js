
const API = "http://localhost:8000/api"

export const signup = user => {
    return fetch(`${API}/signup`,{
        method:'POST',
        headers:{Accept:'application/json','Content-type':'application/json'},
        body: JSON.stringify(user)
    })
    .then(response => { return response.json()})
    .catch(err => { console.log(err)})
}
// ===============================================
 // when a user try to signup from signup.js at front-end ,

 // then localhost:8000/api/signup will trigger from frontend from index.js at auth folder //

 // execute the  signup API code from backend like 
 
 // router('/api/signup',signup) backend code  //

//

exports.signup = (req,res) => {
    const user = new user(req.body) 
    // User is mongodb model which contains 
    // name,email,hashed_password //
    user.save((err,user) => { 
        // user.save() function will return two parameter 
       //   1.error 2.user(created) 
        if(err || !user) {
            return res.status(400).json({
                err // user creation failed //
            })
        }
        res.json(user) 
        //output = name:kamal ,hashed_password:nfsdbfksdkfk,email:kamal@gamil.com//
    })
}