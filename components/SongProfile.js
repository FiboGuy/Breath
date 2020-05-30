import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, TouchableOpacity } from 'react-native'

class SongProfile extends Component {
    constructor(props){
        super(props)
        this.top = new Animated.Value(600)
    }

    componentDidMount()
    {
        this.animate()
    }

    animate()
    {
        Animated.timing(this.top,{
            toValue: 99,
            duration: 500
        }).start()
    }

    animatedStyles() {
       return {
           top: this.top
       }
    }

    render() {
        const {song, author, hide} = this.props
        return (
            <Animated.View style={[styles.absolute, this.animatedStyles()]}>
                <View style={styles.flex}>
                    <TouchableOpacity style={styles.touchable} onPress={() => hide()}/>
                    <View>
                        <Text style={styles.song}>{song}</Text>
                        <Text>{author}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.downTexts}>Temporizador</Text>
                    <Text style={styles.downTexts}>Favorito</Text>
                    <Text style={styles.downTexts}>Eliminar</Text>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    absolute:{
        position: 'absolute',
        width: 344,
        left: -7,
        height: 434,
        borderRadius: 24,
        backgroundColor : "white",
        shadowColor: "black",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    flex:{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 63
    },
    touchable:{
        width: 239,
        height: 4,
        backgroundColor: '#C4C4C4',
        borderRadius: 32,
        marginTop: 8,
        marginBottom: 58
    },
    song: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        marginBottom: 4
    },
    author: {
        fontSize: 14,
        lineHeight: 17
    },
    downTexts: {
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 24,
        marginLeft: 22
    }
})


export default SongProfile