import {combineReducers} from 'redux'
import searchBar from './searchBarReducer'
import timer from './timerReducer'

export default combineReducers({
    searchBar,
    timer
})