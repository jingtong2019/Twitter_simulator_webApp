import * as types  from './action-types';
import axios from 'axios';


export const hashtagSearch = (data) => async (dispatch) => {
    console.log("SEARCH_HASHTAG");
    dispatch({type:types.SEARCH_HASHTAG,payload:null});
}

export const userSearch = (data) => async (dispatch) => {
    console.log("SEARCH_USER");
    dispatch({type:types.SEARCH_USER,payload:null});
}

export const viewList = (data) => async (dispatch) => {
    console.log("VIEW_LIST");
    dispatch({type:types.VIEW_LIST,payload:null});
}


export const clearcheck = (data) => async (dispatch) => {
    console.log("VIEW_LIST");
    dispatch({type:types.CLEAR_CHECKS,payload:null});
}