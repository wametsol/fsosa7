import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import Togglable from './components/Togglable'
import Toggleblog from './components/Toggleblog'

import PropTypes from 'prop-types'


LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}





const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFromRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } 
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 10
  }
  const login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setSuccess('logging succesfull')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setSuccess(null)
      }, 5000);
    } catch(exception){
      setError('wrong user or password')
      setTimeout(() => {
        setError(null)
      }, 5000);
    }
  }

  const handleLogOut = (event) => {
    
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setSuccess('logout succesfull')
    setTimeout(() => {
      setSuccess(null)
    }, 5000);
  }

  const addBlog = (event) => {
    event.preventDefault()
    if(title === "" || url === ""){
      setError('title or url missing')
      setTimeout(() => {
        setError(null)
      }, 5000);
      return
    }
    else {
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    
    blogService.create(blogObject)
    .then(newBlog => {
      setBlogs(blogs.concat(newBlog))
      setSuccess(`a new blog'${newBlog.title}' by ${newBlog.author} has been added`)
      setTimeout(() => {
        setSuccess(null)
      }, 5000);
    })
  }
}

const loginForm = () => {
  return (
 
 <Togglable buttonLabel="log in">
   <LoginForm
     username={username}
     password={password}
     handleUsernameChange={({ target }) => setUsername(target.value)}
     handlePasswordChange={({ target }) => setPassword(target.value)}
     handleSubmit={login}
   />
   </Togglable>
   
 )
}
const handleDelete = (event) => {
  event.preventDefault()
  const blogToDelete = blogs.find(blog => blog.id === event.target.value)
  
  if(window.confirm(`are you sure you want to delete ${blogToDelete.title}`)){
    blogService.destroy(event.target.value)
    blogService.getAll().then(blogs => {
      blogs = blogs.sort(function(a,b){
        return b.likes-a.likes
      })
      setSuccess(`${blogToDelete.title} has been deleted`)
      setTimeout(() => {
        setSuccess(null)
      }, 5000);
      setBlogs(blogs)
    })
  }
  
  

}

const deleButton = (blog) => {
  console.log(blog)
     
  if(blog.user.name===user.name){
    return (
      <button value ={blog.id} onClick={handleDelete}>delete</button>
    )
  }
}

const blogForm = () => {
  console.log(blogs)
      
  return(
  <div>
    
    <Togglable buttonLabel="create blog" ref={blogFromRef}>
    <BlogForm
    handleAdd={addBlog}
    handleTitleChange={({ target }) => setTitle(target.value)}
    handleAuthorChange={({ target }) => setAuthor(target.value)}
    handleUrlChange={({ target }) => setUrl(target.value)}
    />
    </Togglable>

    {blogs.map(blog =>
    
    <div key={blog.id + 1} style={blogStyle}>    
    <Toggleblog blogLabel={<Blog key={blog.id} blog={blog} />}>
    <li><a href={blog.url}>{blog.url}</a></li>
    <li>{blog.likes}<button  value={blog.id} onClick={handleLike}>like</button></li>
    <li>added by {user.name}</li>
    {deleButton(blog)}
    </Toggleblog>
    </div>
      
    )}
    
  </div>
)
} // {deleButton(blog)}

const handleLike = (event) => {
  event.preventDefault()
 
  const likedBlog = blogs.find(blog => blog.id === event.target.value) 
  
  likedBlog.likes = likedBlog.likes + 1
  
  
  
  blogService.update(likedBlog.id, likedBlog)
  /*
  .then(newBlog => {
   var blogit = this.state.blogs
   blogit.sort(function(a,b){
     return b.likes-a.likes
   })
   */
   setSuccess(`you liked '${likedBlog.title}' by ${likedBlog.author} `)
   setBlogs(blogs)
     
   setTimeout(() => {
    setSuccess(null)
   }, 2000);

//}) 
}


  return (
    <div>
        <h1>Blogs</h1>
        <Notification message={error} isError={true} />
        <Notification message={success} isError={false} />
        
        {user === null ?
        loginForm() :
        <div>
          <p style={{color:"green"}}>logged in as {user.name} 
           <button onClick={handleLogOut}>logout</button></p>
          {blogForm()}
        </div>
        }
      </div>
  )
}

export default App