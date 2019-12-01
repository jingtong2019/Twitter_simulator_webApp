import { combineReducers } from "redux";
import feeds from "./feeds-reducer";
import tweet from "./tweet-reducer";
import bookmark from "./bookmark-reducer";

const rootReducer = combineReducers({
    feeds,
    tweet,
    bookmark
});

export default rootReducer;
