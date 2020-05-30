import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PlayList from './PlayList'
import SearchBar from './SearchBar'

class Index extends Component {
    render() {
        return (
            <View style={styles.container}>
               <SearchBar />
               <PlayList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 24,
        marginTop: 35
    }
})

export default Index