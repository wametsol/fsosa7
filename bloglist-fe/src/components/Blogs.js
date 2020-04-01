import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import Togglable from './Togglable'
import Toggleblog from './Toggleblog'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const Blogs = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const blogFromRef = React.createRef()

    console.log(blogs )

    return(
        <div>
          
          <Togglable buttonLabel="create blog" ref={blogFromRef}>
          
          </Togglable>
      
          {blogs.map(blog =>
          
          <div key={blog.id + 1}>    
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link><Toggleblog blogLabel={<span> by {blog.author} </span>}>
          <li><a href={blog.url}>{blog.url}</a></li>
          <li>{blog.likes}<button  value={blog.id} >like</button></li>
          <li>added by {blog.user.name}</li>
          </Toggleblog>
          </div>
            
          )}
          
        </div>
      )
}




export default Blogs