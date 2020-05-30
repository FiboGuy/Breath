import { SEARCHBAR } from './../actions/constants'

const initialState = {
    value: ''
}

const searchbarReducers = (state = initialState, action) => {
    switch(action.type){
        case SEARCHBAR:
            return {
                ...state,
                value: action.value
            }
        default:
            return state
    }
}

export default searchbarReducers