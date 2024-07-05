import { useEffect, useState } from 'react'
import axios from 'axios'


function Axios() {
    const [postList, setPostList] = useState(null)
    const [newPost, setNewPost] = useState('')
    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/posts`).then(data=>setPostList(data.data))
    },[])
    const handleChange=(e)=>setNewPost(e.target.value)
    const handleSubmit=(e)=>{
        e.preventDefault()
        const newPostObj={
            title:newPost,
            body:newPost
        }
        axios
            .post(`https://jsonplaceholder.typicode.com/posts`, newPostObj).then(resp=>console.log(resp.data))
    }
  return (
    <div>
        <h3>Using Axios</h3>
        {postList&&<List list={postList}/>}
        <form action="" onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange}/>
        <button type="submit">Add Todo</button>
        </form>
    </div>
  )
}
function List({list}){
    return(
        <div>
            {list.map(element=>{
                return(
                    <div key={element.id} className='todoCard'>
                    <h4>{element.title}</h4>
                    <tt>{element.body}</tt>
                </div>
                )
            })}
        </div>
    )
}
export default Axios