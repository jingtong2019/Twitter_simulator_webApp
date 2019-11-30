import { IMAGE_DOWNLOAD, IMAGE_UPLOAD } from '../actions/action-types';
const initialState = {
   
}

export default function (state = initialState, action) {

    switch (action.type) {
        
        case IMAGE_UPLOAD:
            return {
                ...state,
                imageupload_url: action.imageupload_url
            }
        case IMAGE_DOWNLOAD:
            return {
                ...state,
                imagePreviewresponse: action.imagePreviewresponse
            }
       
        default:
            return state;
    }
}