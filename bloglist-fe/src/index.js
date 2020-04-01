import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import './components/component.css'
import store from './store'




const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
        <Router>
        <App /></Router></Provider>, document.getElementById('root'))
}
renderApp()
store.subscribe(renderApp)
