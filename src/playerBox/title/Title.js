import React, { Component } from 'react'
import './Title.css'

class Title extends Component {

  // displays the artist name and the title

  render () {
    return <div className='title'>
      <div className='title__artist'>{this.props.artist}</div>
      <div className='title__track'>{this.props.track}</div>
    </div>

  }
}

export default Title;