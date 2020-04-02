import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from '../state/userReducer'
import { setSuccess, setError } from '../state/notificationReducer'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField
} from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);

  const closeForm = () => {
    setOpen(false)
  }
  const openForm = () => {
    setOpen(true)
  }



  const login = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await loginService.login({
        username, password
      })
      dispatch(setLoggedUser(user))
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setSuccess(`Welcome ${user.name}`))

      setTimeout(() => {
        dispatch(setSuccess(null))
      }, 5000)
    } catch (exception) {
      console.log(exception)
      dispatch(setError('wrong user or password'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
    }
  }

  return (

    <div>
      <Button color="inherit" onClick={openForm}>
        Login
      </Button>
      <Dialog open={open} onClose={closeForm} aria-labelledby="form-dialog-title">
        <form onSubmit={login}>
          <DialogTitle id="form-dialog-title">Log in to application</DialogTitle>
          <DialogContent>
            <DialogContentText>Log in using your account</DialogContentText>
            <div>
              <TextField
                autoFocus
                label="username"
                type="text"
                name="username"
                fullWidth
              />
            </div>
            <div>
              <TextField
                autoFocus
                label="password"
                type="password"
                name="password"
                fullWidth
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={() => closeForm}>login</Button>
            <Button type="reset" onClick={() => setOpen(false)}>cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>

  )
}

export default LoginForm