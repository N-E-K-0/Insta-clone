import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () =>{
  const history = useHistory()
  const [name, setName] = useState("") 
  const [password, setPassword] = useState("") 
  const [email, setEmail] = useState("") 

  const PostData = () =>{
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(!emailRegex.test(email)){
      return M.toast({html: "Invalid email address", classes:"#f44336 red"})
    }
    else{
      fetch("/signup",{
        method:"post",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          name,
          password,
          email
        })
      })
      .then(response=> response.json())
      .then(result =>{
        if(result.error){
          M.toast({html: result.error, classes:"#f44336 red"})
        }
        else{
          M.toast({html: result.message, classes:"#43a047 green darken-1"})
          history.push("/signin")
        }
      }) 
      .catch(err => console.log(err)) 
    }
  }

  return(
  <div className="mycard">
    <div className="card auth-card input-field">
      <h2>Instagram</h2>
      <input 
        type="text" 
        placeholder="name" 
        value={name} 
        onChange={(e)=> setName(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="email" 
        value={email} 
        onChange={(e)=> setEmail(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="password" 
        value={password} 
        onChange={(e)=> setPassword(e.target.value)}
      />
      <button 
        className="btn waves-effect waves-light #64b5f6 blue darken-2" 
        onClick={()=> PostData()}
      >
        Signup
      </button>
      <h5>
        <Link to="/signin">Already have an account? Click here</Link>
      </h5>
    </div>
  </div>
  )
}

export default Signup;