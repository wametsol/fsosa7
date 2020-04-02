import React from 'react'
import PropTypes from 'prop-types'
import './component.css'

import { ExpandLess, ExpandMore } from '@material-ui/icons'
import {
  Button
} from '@material-ui/core'

class Toggleblog extends React.Component {
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
          <div style={{display: "inline", width:"100%"}}>{this.props.blogLabel}<Button  size="small" variant="outlined" color="primary" onClick={this.toggleVisibility}> <ExpandMore/></Button></div>
        </div>
        <div style={showWhenVisible} className="togglableContent">
          <div>{this.props.blogLabel} <Button size="small" variant="outlined" color="secondary" onClick={this.toggleVisibility}><ExpandLess/></Button></div>
          {this.props.children}
          
        </div>
      </div>
    )
  }
}
Toggleblog.propTypes = {
  blogLabel: PropTypes.object.isRequired
}
export default Toggleblog