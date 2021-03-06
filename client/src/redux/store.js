import {createStore, applyMiddleware, compose} from "redux";
import {persistStore} from "redux-persist";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store);

export {store, persistor};