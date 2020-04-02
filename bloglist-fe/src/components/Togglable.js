import React from 'react'
import PropTypes from 'prop-types'
import './component.css'

import {
  Button
} from '@material-ui/core'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }


  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button variant="outlined" color="primary" onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <Button size="small" variant="contained" color="secondary" onClick={this.toggleVisibility}>cancel</Button>
        </div>
      </div>
    )
  }
}
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable