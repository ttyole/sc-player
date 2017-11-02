import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import pause from '../../static/PauseWhiteIcon.png'
import play from '../../static/PlayWhiteIcon.png'
import next from '../../static/PlayNextWhiteIcon.png'
import previous from '../../static/PlayPreviousWhiteIcon.png'
import './Controls.css'

class Controls extends Component {

  // displays the play or pause and next and previous buttons

  render () {
    return <div className='controls'>
      <img className='controls__change' src={previous} onClick={this.props.previous} />
      {this.props.playing ? <img className='controls__play' src={pause} onClick={this.props.playOrPause} /> : <img className='controls__play' src={play} onClick={this.props.playOrPause} />}
      <img className='controls__change' src={next}  onClick={this.props.next} />
    </div>

  }
}

export default Controls;