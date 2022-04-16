import { FIRST_UPDATE, HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER } from './types'


const initialState = {
    showAlert: false,
    alerts: [],
    typeAlert: "",
    showLoader: false,
    firstUpdate: true,
}

const componentsReducer = (state = initialState , action) => {
    switch (action.type){
        
        case SHOW_ALERT:
            return {...state, showAlert: true, alerts: action.alerts, type: action.tp}
        case HIDE_ALERT:
            return {...state, showAlert: false }

        case SHOW_LOADER:
            return {...state, showLoader: true}
        case HIDE_LOADER:
            return {...state, showLoader: false}

        case FIRST_UPDATE:
            return {...state, firstUpdate: false}
            

        default: return state
    }
}
export default componentsReducer