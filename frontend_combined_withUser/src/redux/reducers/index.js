import { combineReducers } from "redux";
import feeds from "./feeds-reducer";
import tweet from "./tweet-reducer";
import bookmark from "./bookmark-reducer";
import signuploginReducer  from './signuploginReducer';
import profileReducer from './profileReducer';
import messageReducer from './messageReducer';
import imageReducer from './imageReducer';
import followingfollowerreducer from './followingfollowerreducer';

const rootReducer = combineReducers({
    feeds,
    tweet,
    bookmark,
    signin: signuploginReducer,
    profile: profileReducer,
    inbox: messageReducer,
    image: imageReducer,
    followingfollower: followingfollowerreducer
});

export default rootReducer;
