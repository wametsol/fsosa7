import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import {
  Grid,
  Typography,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  makeStyles
} from '@material-ui/core'

import MenuBookIcon from '@material-ui/icons/MenuBook';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


const User = () => {
  const classes = useStyles();
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const usermatch = useRouteMatch('/users/:id')
  const userlist = users.userlist
  const user = usermatch
    ? userlist.find(user => user._id === usermatch.params.id)
    : null


  if (!user) {
    return null
  }

  const userBlogs = blogs.filter(a => a.user._id === user._id)
  return (
    <div>
      <h1>{user.name}</h1>
      <br></br>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Added blogs
          </Typography>
        <div className={classes.demo}>
          <List>
            {userBlogs.map(blog =>
              <ListItem key={blog.id}>
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>}
                />
              </ListItem>,
            )}
          </List>
        </div>
      </Grid>
    </div>


  )
}


export default User