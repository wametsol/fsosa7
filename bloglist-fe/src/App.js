import React, { useEffect } from 'react'
import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { Switch, Route, Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import { useSelector, useDispatch } from 'react-redux'
import { setSuccess } from './state/notificationReducer'
import { setInitialBlogs, likeBlog, deleteBlog } from './state/blogReducer'
import { setLoggedUser, userLogout, setUserList } from './state/userReducer'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'






const App = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const user = users.user

  useEffect(() => {
    dispatch(setInitialBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUserList())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson) {
      const localuser = JSON.parse(loggedUserJson)
      dispatch(setLoggedUser(localuser))
      blogService.setToken(localuser.token)
    }
  }, [])


  const deleButton = (blog) => {
    if (!user) {
      return null
    }

    if (blog.user.name === user.name) {
      return (
        <button value={blog.id} onClick={handleDelete}>delete</button>
      )
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

  const handleDelete = (event) => {
    event.preventDefault()
    const blogToDelete = blogs.find(blog => blog.id === event.target.value)

    if (window.confirm(`are you sure you want to delete ${blogToDelete.title}`)) {
      try {
        blogService.destroy(event.target.value)
          .then(response => {
            dispatch(deleteBlog(response))
            dispatch(setSuccess(`${response.title} has been deleted`))
            setTimeout(() => {
              dispatch(setSuccess(null))
            }, 5000);
          })
      } catch (exception) {
        console.log(exception)
      }
    }
  }
  return (
    <Container>
      <Notification message={notifications.error} isError={true} />
      <Notification message={notifications.success} isError={false} />
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Button color="inherit" component={Link} to="/">Blogs
          </Button>
            <Button color="inherit" component={Link} to="/users">users
          </Button>
            <div style={{ marginLeft: "auto" }}>
              {user
                ? <em style={{ color: "lightgreen" }}>logged in as {user.name} <IconButton style={{ color: "red" }} onClick={handleLogOut}><ExitToAppIcon /></IconButton></em>
                : <Button color="inherit"><LoginForm /></Button>
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog
              handleLike={handleLike}
              deleButton={deleButton}
            />
          </Route>
          <Route path="/">
            <BlogForm
              handleLike={handleLike}
              deleButton={deleButton}
            />
          </Route>
        </Switch>
      </div>
    </Container>
  )
}

export default App