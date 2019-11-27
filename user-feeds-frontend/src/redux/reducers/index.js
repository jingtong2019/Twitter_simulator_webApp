import { combineReducers } from "redux";
import feeds from "./feeds-reducer";
const rootReducer = combineReducers({
    feeds
});

export default rootReducer;
