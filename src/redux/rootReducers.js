import { combineReducers } from "redux";
import veggiesReducer from "./veggies/veggiesReducer";

const rootReducer = combineReducers({
    veggies: veggiesReducer,
});

export default rootReducer;
