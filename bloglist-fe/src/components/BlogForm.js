import React from 'react'
import blogService from '../services/blogs'
import { setSuccess, setError } from '../state/notificationReducer'
import { createBlogg } from '../state/blogReducer'
import Togglable from './Togglable'
import Toggleblog from './Toggleblog'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TextField,
  List,
  ListItem
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


const BlogForm = ({ handleLike, deleButton }) => {
  const classes = useStyles();
  const blogFromRef = React.createRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const user = users.user

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.url.value = ''
    event.target.title.value = ''
    event.target.author.value = ''
    if (title === '' || url === '') {
      dispatch(setError('title or url missing'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
    }
    else {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      blogService.create(blogObject)
        .then(newBlog => {
          dispatch(createBlogg(newBlog))
          dispatch(setSuccess(`a new blog '${newBlog.title}' by ${newBlog.author} has been added`))
          setTimeout(() => {
            dispatch(setSuccess(null))
          }, 5000)
        })

    }
  }
  return (
    <div>
      <h1>Blogs</h1>
      <div>
        {user
          ? (
            <Togglable buttonLabel="create blog" ref={blogFromRef}>
              <div>
                <h2>Add new blog</h2>
                <form onSubmit={addBlog}>
                  <div>
                    <TextField
                      label="Title"
                      type="text"
                      name="title"
                    />
                  </div>
                  <div>
                    <TextField
                      label="Author"
                      type="text"
                      name="author"
                    />
                  </div>
                  <div>
                    <TextField
                      label="Url"
                      type="text"
                      name="url"
                    />
                  </div>
                  <Button size="small" variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>save</Button>
                </form>
              </div>
            </Togglable>
          )
          : <p>You have to be logged in to submit new blogs</p>
        }</div>

      <List>
        {blogs.map(blog =>
          <div key={blog.id}>
            <Toggleblog blogLabel={<Button variant="contained" component={Link} to={`/blogs/${blog.id}`}>{blog.title}</Button>
            }>
              <ListItem ><a href={blog.url}>{blog.url}</a></ListItem>
              <ListItem >Likes: {blog.likes}<button value={blog.id} onClick={handleLike}>like</button></ListItem>
              <ListItem>added by {blog.user.name}</ListItem>
              {deleButton(blog)}
            </Toggleblog>
            <br></br>
          </div>
        )
        }
      </List>
    </div>
  )
}

export default BlogForm