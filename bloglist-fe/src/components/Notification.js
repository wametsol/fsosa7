import React from 'react'
import './component.css'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  if(isError){
    return (
        <div className="Error">
          {message}
        </div>
      )
  }

  return (
    <div className="Success">
      {message}
    </div>
  )
}

export default Notification