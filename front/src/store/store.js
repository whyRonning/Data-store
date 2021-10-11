import {applyMiddleware, createStore} from "redux";
import {mainReducer, rootSaga} from "./mainReducer";
import createSagaMiddleware from "redux-saga"
let middleWare=createSagaMiddleware();
export let store=createStore(mainReducer,applyMiddleware(middleWare));
middleWare.run(rootSaga);