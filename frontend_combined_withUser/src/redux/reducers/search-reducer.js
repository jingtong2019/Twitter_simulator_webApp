import * as types from "../actions/action-types";

const initialState = {

    list: false,
    profile: false,
    hashtagfeed: false
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case types.SEARCH_USER:
            console.log("Inside getting SEARCH_USER")

            return Object.assign({}, state, {

                list: false,
                profile: true,
                hashtagfeed: false

            });
        case types.SEARCH_HASHTAG:
                console.log("Inside getting SEARCH_HASHTAG")
            return Object.assign({}, state, {
                list: false,
                profile: false,
                hashtagfeed: true
            });

        case types.VIEW_LIST:
            return Object.assign({}, state, {
                list: true,
                profile: false,
                hashtagfeed: false

            });

        case types.CLEAR_CHECKS:
            return Object.assign({}, state, {
                list: false,
                profile: false,
                hashtagfeed: false

            });

        default:
            return state;
    }
}