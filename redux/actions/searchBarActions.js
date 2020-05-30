import { SEARCHBAR } from "./constants"

export const editSearchBarValue = value => {
    return {
        type: SEARCHBAR,
        value
    }
}