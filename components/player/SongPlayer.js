import React, { Component } from 'react'
import { View, Animated, StyleSheet, Text, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Status from './Status'
import { Actions } from 'react-native-router-flux' 
import { connect } from 'react-redux'
import { setTimer } from './../../redux/actions/TimerActions'


class SongPlayer extends Component {
    constructor(props){
        super(props)
        this.state = {
           status: 0,
           timerOn: false
        }
        this.height = Dimensions.get('window').height
        this.width = Dimensions.get('window').width
        this.top = new Animated.Value(this.height)
        this.interval = null
    }

    componentDidMount()
    {   
        this.handleTrack({})
        this.animate()
    }

    componentDidUpdate(prevProps){
        if(prevProps.track.id !== this.props.track.id ||
           prevProps.playing !== this.props.playing){
            this.handleTrack(prevProps.track)
        } 
       
    }

    handleTrack = async(prevTrack) => {
        const {trackPlayer, track, playing} = this.props

        if(track.id !== prevTrack.id){
            this.setState({
                status:0
            }, async () => {
                clearInterval(this.interval)
                await trackPlayer.skip(track.id)
            })
        }
        
    
        if(playing){
            setTimeout(async() => {
                await trackPlayer.play()
                this.createInterval(trackPlayer)
            }, 100) 
        }else{
            await trackPlayer.pause()
            clearInterval(this.interval)
        }
    }

    async createInterval(trackPlayer){
        const duration = await trackPlayer.getDuration()
        let position = await trackPlayer.getPosition()
        let status
        
        this.interval = setInterval(async () => {
            position = await trackPlayer.getPosition()
            status = (position/duration)*100
            this.setState({status}, () => {
                this.checkTimer()
                this.checkSongFinished(status)
            })
            
        }, 500)
    }

    checkTimer()
    {
        console.log(this.props.timer)
        if(typeof this.props.timer === 'number' && !this.props.on){
            this.props.setTimer(this.props.timer - 0.5)
            if(this.props.timer <= 0){
                this.props.trackPlayer.pause()
                this.props.timeOut()
            }
        }
    }

    checkSongFinished(status)
    {
 
        if(status >= 99){
            this.props.nextSong()
        }
    }
    
    animate(){
        Animated.timing(this.top,{
            toValue: this.height == '896' ? 669 : 449,
            duration: 500
        }).start()
    }

    async setStatus(percentage){
        const {trackPlayer} = this.props
        const duration = await trackPlayer.getDuration()
        const position = parseInt(percentage*duration)
        await trackPlayer.seekTo(duration*percentage)
        this.setState({
            status:  (position/duration)*100
        })
    }


    render(){
        const {title, artist} = this.props.track
        return (
            <React.Fragment>
                <Animated.View style={[styles.absolute(this.height, this.width), {top: this.top}]}>
                <Status fill={this.state.status} width={this.width} setStatus = {(percentage) => this.setStatus(percentage)}/>
                    <View style={styles.first}>   
                        <Text style={styles.song}>{title}</Text>
                        <Text style={styles.artist}>{artist}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon onPress={() => Actions.Timer()} style={{marginRight:30}} name="clock-o" size={24} color='#0071BC'/>
                        <Icon onPress={() => this.props.previousSong()}  name='step-backward' style={{marginRight:25}} size={24} color='#0071BC' />
                        <Icon onPress={() => this.props.nextSong()}  name='step-forward' size={24} color='#0071BC' />
                    </View>
                </Animated.View>
            </React.Fragment>
        )
    }  
}

const styles = StyleSheet.create({
    absolute: (height, width) => ({
        position: 'absolute',
        width,
        height: height == 812 ? 95 : 70,
        backgroundColor: '#ABE7F1',
        left: -24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    row: {
        flexDirection: 'row',
        marginRight: 24
    },
    first:{
        marginLeft: 30
    },
    song: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        marginBottom: 4,
        color: '#0071BC'
    },
    author: {
        fontSize: 14,
        lineHeight: 17
    },
})

const mapStateToProps = state => {
    return {
        timer: state.timer.value,
        on: state.timer.on
    }
}


export default connect(mapStateToProps, {setTimer})(SongPlayer)