import { ADD_PRODUCT_BASKET, REMOVE_PRODUCT_BASKET, SUCCESS_ORDER } from "./types"


const initialState = {
    basket: [],
    total: 0,
}

const basketReducer = (state = initialState , action) => {
    switch (action.type){
        
        case ADD_PRODUCT_BASKET:
            return {...state, 
                total: (state.total + action.payload.price),
                basket: [...state.basket, action.payload]
            }
        case REMOVE_PRODUCT_BASKET:
            return {...state, 
                total: (state.total - action.payload.price),
                basket: state.basket.filter(product => product.id !== action.payload.id)
            }

        case SUCCESS_ORDER:
            return {...state, basket: [], total: 0 }

        default: return state
    }
}
export default basketReducer