import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { editSearchBarValue } from './../redux/actions/searchBarActions'

class SearchBar extends Component {
    constructor(props){
        super(props)
    }
    
    handleChange = async(e) => {
        await this.props.editSearchBarValue(e.toLowerCase())
    }

    render() {
        return (
            <View>
                <TextInput style={styles.searchbar} value={this.props.value} placeholder='Search' onChangeText={e => this.handleChange(e)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchbar: {
        borderWidth: 1,
        width: 365,
        height: 40,
        paddingLeft: 5,
        borderColor: '#B3B3B3'
    }
})

const mapStateToProps = state => {
    return {
        value: state.searchBar.value
    }
}

export default connect(mapStateToProps, { editSearchBarValue })(SearchBar)