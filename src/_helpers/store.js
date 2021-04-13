import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { FilesReducer } from "../_reducers/files.reducer";

import { AuthReducer } from "./../_reducers";

const rootReducer = combineReducers({
    auth : AuthReducer,
    files : FilesReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));