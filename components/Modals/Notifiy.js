import React, { Component } from 'react'
import { View, Animated, StyleSheet, Text, Dimensions } from 'react-native'


class Notifiy extends Component{
    constructor(props){
        super(props)
        this.state = {
            left: -274
        }
        this.width = Dimensions.get('window').width
        this.height = Dimensions.get('window').height
        this.x = null
    }

    componentDidMount(){
        if(!this.x){
            this.animate()
        }
    }

    animate = () => {
        this.x = setInterval(() => {
            this.setState({
                left: this.state.left + 5
            }, () => {
                if(this.state.left >= this.width){
                    clearInterval(this.x)
                    this.props.intervalEnded()
                }
            })
        },10)
    }

    render(){ 
        return (
            <Animated.View style={styles.absolute(this.state.left)}>
                <View>
                    <Text style={styles.font}>{this.props.text}</Text>
                </View> 
            </Animated.View>
        
        )
    }
}

const styles = StyleSheet.create({
    absolute: left => ({
        position: 'absolute',
        height: 50,
        width: 250,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDFFFF',
        opacity: 0.75,
        left
    }),
    font:{
        fontWeight: '800',
        paddingEnd: 30,
        paddingStart: 30
    }
})

export default Notifiy

