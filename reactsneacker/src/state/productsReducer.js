import { connectAdvanced } from "react-redux"
import {  HIDE_LOADER_DETAIL, HIDE_LOADER_LIST, SET_DETAIL_PRODUCTS, SET_FILTER_FIELDS, SET_LIST_PRODUCTS, SET_ORDERS, SET_REVIEW, SHOW_LOADER_DETAIL, SHOW_LOADER_LIST, SUCCESS_ORDER } from "./types"


const initialState = {
    detail: {
        review: [],
        color: [],
        size: [],
        shots: [],
    },
    products: [],
    pageQuantity: 1,
    isLoadingDetail: true,
    isLoadingList: false,
    filterFields: {
        brand: [],
        sex: [],
        color: [],
        size: [],
    },
    orders: [],
}

const basketReducer = (state = initialState , action) => {
    switch (action.type){    
        case SET_LIST_PRODUCTS:
            if(action.pagination){
                return {
                    ...state,
                    products: [...state.products, ...action.payload],
                    pageQuantity: action.pageQuantity
                }
            }
            return {
                ...state, 
                products: action.payload,
                pageQuantity: action.pageQuantity
            }

        case SET_DETAIL_PRODUCTS:
            return {...state, detail: action.payload}

        case SHOW_LOADER_DETAIL:
            return {...state, isLoadingDetail: true}
        case HIDE_LOADER_DETAIL:
            return {...state, isLoadingDetail: false}

        case SHOW_LOADER_LIST:
            return {...state, isLoadingList: true}
        case HIDE_LOADER_LIST:
            return {...state, isLoadingList: false}

        case SET_REVIEW:
            return {...state, detail: {
                ...state.detail,
                review: [action.payload, ...state.detail.review]
            }}
        
        case SET_FILTER_FIELDS:
            return{...state, filterFields: action.payload}

        case SET_ORDERS:
            return {...state, orders: action.payload}

        case SUCCESS_ORDER:
            return {...state, numderOrder: action.payload }
        

        default: return state
    }
}
export default basketReducer