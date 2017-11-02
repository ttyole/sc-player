import React, { Component } from 'react'
import './Thumbnail.css'

class Thumbnail extends Component {

  // displays the thumbnails of the current, next and previous artists
  // calls previousArtist and nextArtist when we click on one of the side thumbnails

  render () {
    return <div className='thumbnail'>
      <img className='thumbnail__sideImage' src={this.props.imgLeft} onClick={this.props.previousArtist} />
      <img className='thumbnail__image' src={this.props.img} />
      <img className='thumbnail__sideImage' src={this.props.imgRight} onClick={this.props.nextArtist} />
    </div>

  }
}

export default Thumbnail;