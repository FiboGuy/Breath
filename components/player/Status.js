import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

const Status = props => {

    const press = e => {
        props.setStatus(e.nativeEvent.locationX/props.width)
    }
    
    return (
        <TouchableOpacity style={[styles.border(props.width)]} onPress={e => press(e)}>
            <View style={styles.fill(props.fill + '%')}>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    border: width => ({
        position:'absolute',
        backgroundColor:'#89CFE6',
        width,
        top: 0,
        zIndex:1,
        height:6
    }),
    fill: (width) => (
        {
            width,
            backgroundColor: '#0071BC',
            zIndex:2,
            height:4
        }
    )    
})


export default Status