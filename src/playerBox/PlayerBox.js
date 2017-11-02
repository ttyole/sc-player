import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import axios from 'axios'
import Controls from './controls/Controls.js'
import Thumbnail from './thumbnail/Thumbnail.js'
import Title from './title/Title.js'
import './PlayerBox.css'

class PlayerBox extends Component {

  // contains all the logic of the player
  
  constructor(props) {
    super(props);
    let tracklistLoaded = false // Is true when the tracklist is loaded
    let artistList = []         // The result of the query to shotgun api
    let currentArtist = null    // The index of current artist in artistList
    let currentTrack = null     // The index of current track in artistList[currentArtist]
    let playing = false         // Is true when the user wants the sounds to play
    this.state = {
        tracklistLoaded,
        artistList,
        currentArtist,
        currentTrack,
        playing
    }
    axios.get('http://shotgun-api-staging.herokuapp.com/v5/app/artists').then(res => {
      this.nbArtist = res.data.length
      this.nbTracks = res.data.map(artist => { return artist.tracks.length })
      this.setState({
        tracklistLoaded: true,
        artistList: res.data,
        currentArtist: 0,
        currentTrack: 0
      })
    })
    .catch(err => console.log('Can\'t connect to Shotgun API :' + err))
  }


  playOrPause() {
    this.setState({playing: !this.state.playing})
  }

  next() {
    // loads the next track
    this.setState({playing: false})
    if (this.state.tracklistLoaded) {
      // if we can, we stay on the same artist and go on his next track
      if (this.state.artistList[this.state.currentArtist].tracks[this.state.currentTrack + 1]) {
        this.setState({currentTrack: this.state.currentTrack + 1})
      // else if we can, we go on the first track of the next artist
      } else if (this.state.artistList[this.state.currentArtist + 1]) {
        this.setState({currentTrack: 0, currentArtist: this.state.currentArtist + 1})
      // else we go back to the first artist and track
      } else {
        this.setState({currentArtist: 0, currentTrack: 0})
      }
    }
  }
  
  previous() {
    // loads the previous track
    this.setState({playing: false})
    if (this.state.tracklistLoaded) {
      // if we are more than 2seconds into the current track, we go to the beginning of this same track
      if (this.refs.reactPlayer.player.player.currentTime > 2) {
        this.refs.reactPlayer.player.seekTo(0)
      // else we load the previous track
      } else {
        // if we can, we stay on the same artist and go on his previous track
        if (this.state.artistList[this.state.currentArtist].tracks[this.state.currentTrack - 1]) {
          this.setState({currentTrack: this.state.currentTrack - 1})
        // else we go on the last track of the previous artist
        } else {
          let currentArtist = this.state.currentArtist === 0 ? this.nbArtist - 1 : this.state.currentArtist - 1
          this.setState({currentTrack: this.nbTracks[currentArtist] - 1, currentArtist})
        }
      }
    }
  }

  nextArtist() {
    // loads the first track of the next artist
    this.setState({playing: false})
    if (this.state.artistList[this.state.currentArtist + 1]) {
      this.setState({currentTrack: 0, currentArtist: this.state.currentArtist + 1})
    } else {
      this.setState({currentArtist: 0, currentTrack: 0})
    }
  }

  previousArtist() {
    // loads the first track of the previous artist
    this.setState({playing: false})
    this.setState({currentTrack: 0, currentArtist: this.state.currentArtist === 0 ? this.nbArtist - 1 : this.state.currentArtist - 1})
  }

  render () {
    let player = ''
    let thumbnail = <Thumbnail img='' imgLeft='' imgRight='' />
    let title = <Title artist='' track='' />
    if (this.state.artistList.length > 0) {
      player = <ReactPlayer 
        id='player'
        ref='reactPlayer'
        url= {this.state.artistList[this.state.currentArtist].tracks[this.state.currentTrack].stream + '?client_id=e2a6681bccff23130855618e14c481af'}
        playing={this.state.playing}
        playsinline
      />
      thumbnail = <Thumbnail
        id='thumbnail'
        img={this.state.artistList[this.state.currentArtist].avatar}
        imgLeft={this.state.artistList[this.state.currentArtist == 0 ? this.nbArtist - 1 : this.state.currentArtist - 1].avatar}
        imgRight={this.state.artistList[(this.state.currentArtist + 1) % this.nbArtist].avatar}
        previousArtist={this.previousArtist.bind(this)}
        nextArtist={this.nextArtist.bind(this)}
      />
      title = <Title
        artist={this.state.artistList[this.state.currentArtist].name}
        track={this.state.artistList[this.state.currentArtist].tracks[this.state.currentTrack].title}
      />
    }
    return <div className='box'>
      <div style={{display: 'none'}}> { player } </div>
      { thumbnail }
      { title }
      <Controls
        id='control'
        playing={this.state.playing}
        playOrPause={this.playOrPause.bind(this)}
        next={this.next.bind(this)}
        previous={this.previous.bind(this)}
      />
    </div>

  }
}

export default PlayerBox;