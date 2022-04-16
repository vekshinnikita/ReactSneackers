import {combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import favouriteReducer from './favouriteReducer'
import basketReducer from './basketReducer'
import productsReducer from './productsReducer'
import authReducer from './authReducer'
import componentReducer from './componentReducer'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['basket', 'favourite','auth']
  }

const rootReducer = combineReducers({
    basket: basketReducer,
    favourite: favouriteReducer,
    products: productsReducer,
    auth: authReducer,
    components: componentReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)




export default persistedReducer;