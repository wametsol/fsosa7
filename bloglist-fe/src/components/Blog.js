import React from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setSuccess } from '../state/notificationReducer'
import { commentBlog } from '../state/blogReducer'
import { useRouteMatch } from 'react-router-dom'

import {
  List,
  Button,
  TextField,
  ListItem,
  ListItemIcon,
  makeStyles
} from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MessageIcon from '@material-ui/icons/Message';




const Blog = ({ handleLike, deleButton }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blogmatch = useRouteMatch('/blogs/:id')
  const blog = blogmatch
    ? blogs.find(blog => blog.id === blogmatch.params.id)
    : null

  if (!blog) {
    return null
  }

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    blogService.comment(event.target.id.value, comment)
      .then(commentedBlog => {
        dispatch(commentBlog(commentedBlog))
        dispatch(setSuccess(`you commented blog '${commentedBlog.title}`))
      })
    setTimeout(() => {
      dispatch(setSuccess(null))
    }, 2000)
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <List>
        <ListItem>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <a href={blog.url}>{blog.url}</a>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ThumbUpIcon />
          </ListItemIcon>
          {blog.likes}   <button value={blog.id} onClick={handleLike}>like</button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          {blog.user.name}
        </ListItem>
      </List>
      {deleButton(blog)}
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <div>
          <TextField name="comment"></TextField>
          <input type="hidden" name="id" value={blog.id} />
          <Button type="submit">add comment</Button>

        </div>
      </form>
      <List>
        {blog.comments.map(comment =>
          <ListItem key={comment + Math.random()}><ListItemIcon>
            <MessageIcon />
          </ListItemIcon>{comment}</ListItem>
        )}
      </List>
    </div>
  )

}

export default Blog
