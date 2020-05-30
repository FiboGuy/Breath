import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { songs as songList, getNextSong, getPreviousSong } from './SongUtils'
import { connect } from 'react-redux'
import SongPlayer from './player/SongPlayer'
import Icon from 'react-native-vector-icons/FontAwesome'
import TrackPlayer from 'react-native-track-player'
import Notify from './Modals/Notifiy'

class SongsList extends Component {
    constructor(props){
        super(props)

        this.state = {
            songs: [],
            track: {},
            playing: false,
            timeOut: false
        }
        this.y = null
    }

    componentDidMount(){
        this.setUpTrack() 
        this.getFiles()
    }

    setUpTrack = async () => {
        // TrackPlayer.registerPlaybackService(() => require('./trackService.js'));
        TrackPlayer.addEventListener('remote-play', async () => {
           await TrackPlayer.play()
        });
        TrackPlayer.addEventListener('remote-pause', async () => {
            await TrackPlayer.pause()
        });
         
        await TrackPlayer.setupPlayer()
        await TrackPlayer.add(songList)
    }

    componentDidUpdate(prevProps){
        if(prevProps.searchBar !== this.props.searchBar){
            this.debounce()
        }
    }   

    debounce = () => new Promise(resolve => {
    if(this.y != null){
        clearTimeout(this.y)
    }
    this.y = setTimeout(() => {
        this.getFiles()
        this.y=null
        resolve('done')
    }, 300)
    })

    getFiles()
    {
        const searchBar = this.props.searchBar.toLowerCase()
        const songs = songList.filter(e => {
            return e.artist.toLowerCase().indexOf(searchBar) >= 0 || e.title.toLowerCase().indexOf(searchBar) >= 0
        })
        this.setState({
            songs
        })
    }


    goToSongProfile(track)
    {
        if(this.state.track.id === track.id){
            this.setState({
                playing: !this.state.playing
            })
        }else{
            this.setState({
                playing: true,
                track
            })
        }
    }

    selector(id){
      const {playing, track} = this.state
      if(playing && id === track.id){
          return 'pause'
      }
      return 'play'
    }

    nextSong()
    {
        const track = getNextSong(this.state.track.id)
        this.setState({
            track
        })
    }

    previousSong()
    {
        const track = getPreviousSong(this.state.track.id)
        if(track.id === songList[0].id){
            TrackPlayer.seekTo(0)
        }
        this.setState({
            track
        })
    }

    timeIsOut(){
        this.setState({
            timeOut: true,
            playing: false
        })
    }

    render() {
        const {track, songs, playing} = this.state
        return (
            <React.Fragment>
                {this.state.timeOut && <Notify text='Time to sleep baby!' intervalEnded={() => this.setState({timeOut: false})}/>}
                <View style={styles.view}>
                    {songs.map((e, index) => {
                        return (
                            <View key={index} style={styles.flex}>
                                <View style={styles.songView}>
                                    <Image source={e.artwork} style={styles.image}/>
                                    <View>
                                        <Text style={styles.song}>{e.title}</Text>
                                        <Text style={styles.artist}>{e.artist}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => this.goToSongProfile(e)}>
                                    <Icon name={this.selector(e.id)} size={24} color='grey'/>
                                </TouchableOpacity>
                            </View>
                        )
                    })}    
                    {track.id ? <SongPlayer trackPlayer={TrackPlayer}
                                            track={track}
                                            playing={playing}  
                                            nextSong={() => this.nextSong()}
                                            previousSong={() => this.previousSong()}
                                            timeOut={() => this.timeIsOut()}                               
                    /> : null}
                </View>
           </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    view:{
        marginTop: 36
    },
    songView: {
        marginBottom: 15.5,
        display:'flex',
        flexDirection:'row'
    },
    song: {
        fontWeight: '500',
        fontSize: 14,
        marginBottom: 4
    },
    artist: {
        fontWeight: 'normal',
        fontSize: 14
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 24
    },
    image:{
        width:45,
        height:45,
        marginRight:20
    }
})


const mapStateToProps = state => {
    return {
        searchBar: state.searchBar.value,
        timer: state.timer.value
    }
}

export default connect(mapStateToProps)(SongsList)