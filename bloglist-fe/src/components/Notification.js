import React from 'react'
import './component.css'
import { Alert } from '@material-ui/lab'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  if (isError) {
    return (
      <Alert severity="error">
        {message}
      </Alert>
    )
  }

  return (
    <Alert severity="success">
      {message}
    </Alert>
  )
}

export default Notification