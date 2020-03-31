import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import './components/component.css'
import { notificationReducer } from './state/notificationReducer'
import { blogReducer } from './state/blogReducer'
import { userReducer } from './state/userReducer'


const rootReducer = combineReducers({
    notificationReducer: notificationReducer,
    blogReducer: blogReducer,
    userReducer: userReducer
})
const store = createStore(rootReducer)


const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
        <Router>
        <App /></Router></Provider>, document.getElementById('root'))
}
renderApp()
store.subscribe(renderApp)
