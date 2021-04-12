import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = () =>{
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

  const postDetailes = () =>{
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","dx71jjl3m")

    fetch("https://api.cloudinary.com/v1_1/dx71jjl3m/image/upload",{
      method:"post", 
      body:data
    })
    .then(response => response.json())
    .then(data => setUrl(data.url))
    .catch(err => console.log(err))

    fetch("/post/create",{
      method:"post",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        title,
        body,
        image: url
      })
    })
    .then(response=> response.json())
    .then(result =>{
      if(result.error){
        M.toast({html: result.error, classes:"#f44336 red"})
      }
      else{
        M.toast({html: "created post successful", classes:"#43a047 green darken-1"})
        history.push("/")
      }
    }) 
    .catch(err => console.log(err)) 
  }

  return(
    <div 
      className="card input-field" 
      style={{
        margin: "30px auto", 
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"
      }}>
      <input 
        type="text" 
        placeholder="title" 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="body"
        value={body}
        onChange={(e)=>setBody(e.target.value)}
      />

      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-2">
          <span>Upload</span>
          <input 
            type="file" 
            onChange={(e)=> setImage(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button 
        className="btn waves-effect waves-light #64b5f6 blue darken-2" 
        onClick={()=>postDetailes()}
      >
        Submit Post
      </button>
    </div>
  )
}

export default CreatePost;