import { combineReducers } from "redux";
import feeds from "./feeds-reducer";
import tweet from "./tweet-reducer";
import bookmark from "./bookmark-reducer";
import signuploginReducer  from './signuploginReducer';
import profileReducer from './profileReducer';
import messageReducer from './messageReducer';
import imageReducer from './imageReducer';
import list from "./list-reducer";
import search from "./search-reducer"

const rootReducer = combineReducers({
    feeds,
    tweet,
    bookmark,
    list,
    search,
    signin: signuploginReducer,
    profile: profileReducer,
    inbox: messageReducer,
    image: imageReducer
});

export default rootReducer;
