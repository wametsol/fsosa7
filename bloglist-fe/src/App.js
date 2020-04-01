import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import Togglable from './components/Togglable'
import Toggleblog from './components/Toggleblog'

import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import {  setSuccess, setError } from './state/notificationReducer'
import { setInitialBlogs, createBlogg, likeBlog, commentBlog, deleteBlog } from './state/blogReducer'
import { setLoggedUser, userLogout, setUserList } from './state/userReducer'






const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [postcomment, setComment] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFromRef = React.createRef()
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)


  useEffect(() => {
      dispatch(setInitialBlogs())
  }, [dispatch])

  useEffect(() => {
      dispatch(setUserList())  
  }, [dispatch])


  
  
  const user = users.user
  const userlist = users.userlist
  const usermatch = useRouteMatch('/users/:id')
  const chosenUser = usermatch
    ? userlist.find(user => user._id === usermatch.params.id)
    : null

  const blogmatch = useRouteMatch('/blogs/:id')
  const chosenBlog = blogmatch
    ? blogs.find(blog => blog.id === blogmatch.params.id)
    : null

    
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson){
      const localuser = JSON.parse(loggedUserJson)
      dispatch(setLoggedUser(localuser))
      blogService.setToken(localuser.token)
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
      
      dispatch(setLoggedUser(user))
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      
      //setUser(user)
      dispatch(setSuccess('loggin in succesfull'))
      
      setTimeout(() => {
        dispatch(setSuccess(null))
      }, 5000);
      setUsername('')
      setPassword('')
    } catch(exception){
      console.log(exception)
      dispatch(setError('wrong user or password'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000);
    }
  }

  const handleLogOut = (event) => {
    
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(userLogout())
    dispatch(setSuccess('logout succesfull'))
    setTimeout(() => {
      dispatch(setSuccess(null))
    }, 5000);
  }

  const addBlog = (event) => {
    event.preventDefault()
    if(title === "" || url === ""){
      dispatch(setError('title or url missing'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000);
    }
    else {
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    
    blogService.create(blogObject)
    .then(newBlog => {
      //setBlogs(blogs.concat(newBlog))
      dispatch(createBlogg(newBlog))
      dispatch(setSuccess(`a new blog'${newBlog.title}' by ${newBlog.author} has been added`))
      setTimeout(() => {
        dispatch(setSuccess(null))
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
    try{
      blogService.destroy(event.target.value)
      .then(response => {
       dispatch(deleteBlog(response))
       dispatch(setSuccess(`${response.title} has been deleted`))
       setTimeout(() => {
         dispatch(setSuccess(null))
       }, 5000);
     })
    } catch (exception){
      console.log(exception)
    }
  }
  }

const deleButton = (blog) => {
  if (!user){
    return null
  }
     
  if(blog.user.name===user.name){
    return (
      <button value ={blog.id} onClick={handleDelete}>delete</button>
    )
  }
}

const blogForm = () => {
      
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
    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link><Toggleblog blogLabel={<span> by {blog.author} </span>}>
    <li><a href={blog.url}>{blog.url}</a></li>
    <li>{blog.likes}<button  value={blog.id} onClick={handleLike}>like</button></li>
    <li>added by {blog.user.name}</li>
    {deleButton(blog)}
    </Toggleblog>
    </div>
      
    )}
    
  </div>
)
}

const singleBlog = (blog) => {
  if(!blog){
    return null
  }
  return(
    <div>
    <div>{blog.title}</div>
    <li><a href={blog.url}>{blog.url}</a></li>
    <li>{blog.likes}<button  value={blog.id} onClick={handleLike}>like</button></li>
    <li>added by {blog.user.name}</li>
    {deleButton(blog)}
    <h3>comments</h3>
    <form>
      <div>
    <input type="text" name="comment" value={postcomment}  onChange={({target}) => setComment(target.value)}></input><button value={blog.id} onClick={handleComment} type="submit">add comment</button>
    
    </div>
    </form>
    <ul>
    {blog.comments.map(comment =>
    <li key={comment+Math.random()}>{comment}</li>
    )}
    </ul>
    </div>
  )

}

const singleUser = (user) => {
  if(!user){
    return null
  }

  const userBlogs = blogs.filter(a => a.user._id === user._id)
  return(
    <div>
      <h1>{user.name}</h1>
      <br></br>
      <h3>Added blogs</h3>
      <ul>
        {userBlogs.map(blog => 
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
          )}
      </ul>
    </div>
  )

}

const userList = () => {
  

  return(
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
          {userlist.map(singleuser =>
          <tr key={singleuser._id+5}>
            <td>
              <Link to={`/users/${singleuser._id}`}>{singleuser.name}</Link>
              
            </td>
            <td>
              {blogs.filter(a => a.user._id === singleuser._id).length}
            </td>
          </tr>
        )}
        </tbody>
        </table>
    </div>
  )
}

const handleLike = (event) => {
  event.preventDefault()
 
  const likedBlog = blogs.find(blog => blog.id === event.target.value) 
  likedBlog.likes = likedBlog.likes + 1
  blogService.update(likedBlog.id, likedBlog)
  .then(newBlog => {
    dispatch(likeBlog(newBlog))
   })
   dispatch(setSuccess(`you liked '${likedBlog.title}' by ${likedBlog.author} `))
   setTimeout(() => {
    dispatch(setSuccess(null))
   }, 2000);

}

const handleComment = (event) => {
    event.preventDefault()
    const blogComment = {postcomment}
    blogService.comment(event.target.value, blogComment)
    .then(commentedBlog => {
      dispatch(commentBlog(commentedBlog))
      setComment('')
      dispatch(setSuccess(`you commented blog '${commentedBlog.title}`))
      })
    setTimeout(() => {
      dispatch(setSuccess(null))
    }, 2000);
    
  
}



  return (
    <div>
      <div>
        <Link style={{padding:5}} to="/">Blogs</Link>
        <Link style={{padding:5}} to="/users">users</Link>
        {user
          ? <em style={{color:"green"}}>logged in as {user.name} <button onClick={handleLogOut}>logout</button></em>
          : loginForm()
        }
      </div>
        <h1>Blogs</h1>
        <Notification message={notifications.error} isError={true} />
        <Notification message={notifications.success} isError={false} />
        <div>
          <Switch>
            <Route path="/users/:id">
              {singleUser(chosenUser)}
            </Route>
            <Route path="/users">
              {userList}
            </Route>
            <Route path="/blogs/:id">
              {singleBlog(chosenBlog)}
            </Route>
            <Route path="/">
              {blogForm}
            </Route>
          </Switch>
        </div>
      </div>
  )
}

export default App