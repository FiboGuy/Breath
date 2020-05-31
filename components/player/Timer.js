import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, Picker } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { setTimer, setTimerOn } from './../../redux/actions/TimerActions'


class Timer extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount()
    {
        this.props.setTimerOn(true)
        this.props.setTimer(600)
    }

    pickerItems(){
        const minutes = []
        for(let i = 0; i <= 45; i++){
            minutes.push(i)
        }

        return minutes
    }

    pop(){
        this.props.setTimerOn(false)
        Actions.pop()
    }

    render(){
        return (
            <View>
                <View style={styles.box}>
                    <View style={styles.flex}>
                        <Text style={styles.timer}>Temporizador</Text>
                        <AntDesign style={styles.close} name="check" size={20} color="black" onPress={() => this.pop()}/>
                    </View>
                    <View>
                        <Picker 
                        selectedValue={this.props.timer === 'inf' ? 'inf' : this.props.timer/60} 
                        style={styles.picker} 
                        onValueChange={min => min === 'inf' ? this.props.setTimer('inf') : this.props.setTimer(min*60)}>
                            {this.pickerItems().map(min => {
                                return <Picker.Item key={min} label={`${min} minutos`} value={min}/>
                            })
                            }
                            <Picker.Item key={'inf'} label='∞' value={'inf'}/>
                        </Picker>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    box: {
        width: 292,
        height: 245,
        marginLeft: 42,
        marginTop: 217,
        borderRadius: 8,
        backgroundColor : "white",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8
    },
    timer: {
        fontSize: 16,
        marginLeft: 20
    },
    close: {
        marginRight: 20
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 21
    },
    picker: {
        width:256,
        marginLeft: 20
    }
})

const mapStateToProps = state => {
    return {
        timer: state.timer.value
    }
}

export default connect(mapStateToProps, {setTimer, setTimerOn})(Timer)