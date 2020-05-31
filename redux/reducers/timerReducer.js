import { TIMER, TIMERON } from '../actions/constants'

const initialState = {
    value: 600,
    on: false
}

const timerReducer = (state = initialState, action) => {
    switch(action.type){
        case TIMER:
            return {
                ...state,
                value: action.value
            }
        case TIMERON:
            return {
                ...state,
                on: action.value
            }
        default:
            return state
    }
}

export default timerReducer