import { SET_AUTH_TOKEN, SET_USER, UNSET_AUTH_TOKEN } from "./types"


const initialState = {
    token: '',
    isAuthenticated: false,
    user: {},
}

const authReducer = (state = initialState , action) => {
    switch (action.type){

        case SET_AUTH_TOKEN:
            return {...state, token: action.payload, isAuthenticated: true}
        case UNSET_AUTH_TOKEN:
            return {...state, token: '', isAuthenticated: false, user: {}}  

        case SET_USER:
            return {...state, user: action.payload}

        default: return state
    }
}
export default authReducer