import { TIMER, TIMERON } from './constants'

export const setTimer = value => {
    return {
        type: TIMER,
        value
    }
}

export const setTimerOn = value => {
    return {
        type: TIMERON,
        value
    }
}