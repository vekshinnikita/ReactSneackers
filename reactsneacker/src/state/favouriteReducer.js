import { ADD_PRODUCT_FAVOURITE, REMOVE_PRODUCT_FAVOURITE } from "./types"


const initialState = {
    favourite: [],
}

const favouriteReducer = (state = initialState , action) => {
    switch (action.type){

        case REMOVE_PRODUCT_FAVOURITE:
            return {...state, 
                favourite: state.favourite.filter(product => product.id !== action.payload.id)
            }
            case ADD_PRODUCT_FAVOURITE:
                return {...state,
                    favourite: [...state.favourite, action.payload]
                }

        default: return state
    }
}
export default favouriteReducer