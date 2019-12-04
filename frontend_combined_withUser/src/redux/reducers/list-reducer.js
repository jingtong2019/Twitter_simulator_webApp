import * as types from "../actions/action-types";

const initialState = {
    feeds: {
        docs: [],
        hasMore: true
    },
    error: "",
    message: "",
    userlist:[]
};


export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_LIST_SUCCESS:
            debugger;
            console.log("GET_LIST_SUCCESS");
            //   console.log(action.result)
            let feedResult = { ...state.feeds };
            let listResult =[ ...state.userlist]
            feedResult.docs = action.result.result;
            //  feedResult.docs = feedResult.docs.concat(action.result);
            console.log("feedResult");
            console.log(feedResult);
            return Object.assign({}, state, {
                error: "",
                message: "GET_LIST_SUCCESS",
                feeds: feedResult,
                userlist:listResult
            });
        case types.GET_LIST_FAILURE:
            console.log("GET_LIST_FAILURE");
           
            return Object.assign({}, state, {
                error: "GET_LIST_FAILURE",
                message: "",
                feeds: {
                    docs: [],
                    hasMore: true
                },
                userlist:[]
            });
        case types.LIKE_TWEET_SUCCESS:
            // console.log("LIKE_TWEET_SUCCESS");
            // feedResult = { ...state.feeds };
            // listResult ={ ...state.userlist}
            // feedResult.docs.filter(function (obj) {
            //     return obj._id === action.tweet._id;
            // })[0].num_likes = 8;
            // return Object.assign({}, state, {
            //     error: "",
            //     message: "GET_FEEDS_SUCCESS",
            //     feeds: feedResult,
            //     userlist:listResult
            // });
            return state;
        case types.LOGOUT_SUCCESS:
            return Object.assign(
                {}, state, {
                    error: "",
                    message: "",
                    feeds: {
                        docs: [],
                        hasMore: true,
                        
                    },
                    userlist:[]
                }
            );
        case types.CLEAR_FEEDS:
                
           return Object.assign(
                {}, state, {
                    error: "",
                    message: "",
                    feeds: {
                        docs: [],
                        hasMore: true
                    },
                    userlist:[]
                }
            );
            
        case types.GET_USER_LIST:
               //feedResult = { ...state.feeds };
               debugger;
                console.log('GET_USER_LIST')
                console.log('action.result')
                console.log(action.payload)
                    return Object.assign(
                        {}, state, {
                            error: "",
                            message: "",
                            feeds: state.feeds,
                            userlist:action.payload
                        }
                    );   
        default:
            return state;
    }
}