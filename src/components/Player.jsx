import React from 'react'
import axios from 'axios'
// import '/Media/'

class Player extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            audio: "",
            musics: [],
            isPlaying: false,
            currentSong: 1,
            currentTime: 0.00,
            duration: 0.00
        }

        this.rangeRef = React.createRef()
        this.audioRef = React.createRef()
        this.volRef = React.createRef()
        // this.audioNode = audioRef.current
    }
    
    
    
    // fetch files in the list
    fetchDataandLoad = async () => {
        await axios.get('http://localhost:1000/')
        .then( (res) => {
            const { files } = res.data
            this.setState((prevState) => ({musics: [...files], 
                audio: files[prevState.currentSong]}))
            })
            .catch( err => console.log(err))
            
        }
        // set duration 
        setDuration = () => {
            const duration = this.audioRef.current.duration
            const currentTime = this.audioRef.current.currentTime
            const audio = this.audioRef.current
            
            console.log(this.audioRef.current, duration, currentTime)
            
            audio.ontimeupdate = () => {
                let seconds = parseInt(currentTime % 60)
                const minutes = parseInt((currentTime / 60) % 60)
                if (seconds < 10) {
                    seconds = `0${seconds}`
                }
                this.setState((prevState) => ({ duration: duration, currentTime: `${minutes}:${seconds}`}))
                
                let value = 0
                
                // set range button
                value = Math.floor((100 / duration) * currentTime)
                this.rangeRef.current.value = value
            }
        }
        
        
        
        // load song 
        playSong = () => {
            const audio = this.audioRef.current
            if(!this.state.isPlaying){
                audio.play()
                .then(() => {
                    console.log('this played')
                    this.setState({isPlaying: true})
                })
                .catch((err) => console.log('this didn\'t play because %s', err))
            }
            else {
                audio.pause()
                this.setState({isPlaying: false})
            }
        }
        
        
        // play next 
        playNext = () => {
            this.audioRef.current.pause()
            if(this.state.currentSong < this.state.musics.length-1){
                this.setState((prevState) => ({ audio: prevState.musics[prevState.currentSong+1], currentSong: prevState.currentSong+1}))
            }else {
                this.setState((prevState) => ({ audio: prevState.musics[1], currentSong: 1}))
            }
            // this.setDuration()
        }

        // play previous
        
        playPrevious = () => {
        this.audioRef.current.pause()
        if(this.state.currentSong < 0){
            this.setState((prevState) => ({ audio: prevState.musics[prevState.musics.length-1], currentSong: prevState.musics.length-1}))
        }else {
            this.setState((prevState) => ({ audio: prevState.musics[prevState.currentSong-1], currentSong: prevState.currentSong-1}))
        }
        // this.setDuration()
    }
    
    volChange = (e) => {
        this.audioRef.current.volume = parseFloat(e.target.value / 10)
    }
    
    // component did mount lifecycle method
    componentDidMount = () => {
        this.fetchDataandLoad()
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        this.audioRef.current.src = `/Media/${this.state.audio}`

    }
        
        // render
        render = () => {
            return (
                <div className="main">
                  <audio ref={this.audioRef} >
                    <source  type="audio/mp3"/>
                  </audio>
                  {/* <!-- photo --> */}
                  <img src="./images/musician-349790_1920.jpg" alt="music" className="photo" />
                  
                  {/* <!-- slider for time --> */}
                  <input type="range" name="slide" id="slide" className="slider" min="0" max="100" ref={ this.rangeRef }/>
                  
                  {/* <!-- start time and end time --> */}
                    <p className="currentTime">{this.state.currentTime}</p>
                  <div className="nonee"></div>
                  <p className="endTime">{this.state.duration}</p>
                 
                  {/* <!-- music title --> */}
                <div className="title"><strong>{this.state.audio.split('.')[0]}</strong>
                <p><span>{this.state.audio.split('.')[0]}</span> </p></div>
                  
                  {/* <!-- play part  --> */}
                  <i 
                  className="fas fa-backward rewind"
                  onClick={() => this.playPrevious()}></i>
                  <i 
                  className={`fas ${((this.state.isPlaying) ? "fa-pause" : "fa-play")} play`}
                  onClick={() => this.playSong()}></i>
                  <i 
                  className="fas fa-fast-forward fastforward"
                  onClick={() => this.playNext()}></i>
                  
                  {/* <!-- volume side  --> */}
                  <i className="fas fa-volume-down volume-down" onClick={ () => this.volRef.current.value = this.volRef.current.value-1}></i>
                  <input type="range" name="slide" id="volume" min="0" max="10" className="volume" onChange={(e) => this.volChange(e)} ref={this.volRef}/>
                  <i className="fas fa-volume-up volume-up" onClick={ () => this.volRef.current.value = this.volRef.current.value + 1 }></i>
              
              </div>
          )

      }
}
           

export default Player