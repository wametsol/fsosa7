import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './state/notificationReducer'
import blogReducer from './state/blogReducer'
import userReducer from './state/userReducer'

const rootReducer = combineReducers({
    notifications: notificationReducer,
    blogs: blogReducer,
    users: userReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store