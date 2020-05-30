import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native' 
import SongsList from './SongsList'

class PlayList extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View>
                <Text style={styles.playList}>Playlist</Text>
                <SongsList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    playList: {
        fontWeight: '500',
        fontSize: 18,
        marginTop: 24
    }
})


export default PlayList