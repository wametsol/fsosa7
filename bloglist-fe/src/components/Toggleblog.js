import React from 'react'
import PropTypes from 'prop-types'
import './component.css'

class Toggleblog extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible}>
            <div onClick={this.toggleVisibility}>{this.props.blogLabel}</div>
          </div>
          <div style={showWhenVisible} className="togglableContent">
          <div onClick={this.toggleVisibility}>{this.props.blogLabel}</div>
            {this.props.children}
            <button onClick={this.toggleVisibility}>Close</button>
          </div>
        </div>
      )
    }
  }
  Toggleblog.propTypes = {
    blogLabel: PropTypes.object.isRequired
  }
  export default Toggleblog