import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import saga from "./sagas";
import { stateMachineReducer } from "./ducks";

const rootReducer = combineReducers({ stateMachine: stateMachineReducer });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);

export default store;
