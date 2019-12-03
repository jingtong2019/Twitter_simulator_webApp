import  { IMAGE_UPLOAD, IMAGE_DOWNLOAD } from './action-types';
import axios from 'axios';
import { rooturl } from '../config/settings';

export const imageDownload = (image1) => async (dispatch) => {
  let image={
      image:image1
  }
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };  
  
    await axios.post('http://'+rooturl+':5000/download-file/', image,config)
        .then(async (response) => {
           dispatch({
                type: IMAGE_DOWNLOAD,
                imagePreviewresponse: response.data
            });
        })
}
export const imageUpload = (data) => async (dispatch) => {
 
   await axios.post('http://'+rooturl+':5000/image-upload', data) 
   .then(async (response) => {
      dispatch({
                type: IMAGE_UPLOAD,
                imageupload_url : response.data
            });
        })

}
