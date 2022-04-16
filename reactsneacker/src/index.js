import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk';
import {PersistGate} from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore';
import createSagaMiddleware from 'redux-saga'

import 'macro-css'
import App from './App';
import './styles/index.scss'
import persistedReducer from './state/store';
import { rootWatcher } from './saga';


const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware))
)

const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      
        <div className="wrapper">
          <App />
        </div>

    </PersistGate>
  </Provider>,
  
  document.getElementById('root')
);

sagaMiddleware.run(rootWatcher)