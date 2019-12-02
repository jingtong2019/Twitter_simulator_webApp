import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tweetActions from "../redux/actions/tweet-actions"; 
import axios from 'axios';
import testimage from '../add_image.png';
import './tweet.css';


class TweetComponent extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            button_image: testimage,
            files: [],
            imagesPreviewUrls: [],
            userid: localStorage.getItem('cookie1'),
            image: [],
            content: ""
        };
        this.onClick = this.onClick.bind(this);
        this.clear = this.clear.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
    }

    onClick() {
        if (this.state.content === "") return;
        const data = new FormData();
        for (let i=0; i<this.state.image.length; i++) {
            data.append('myImage', this.state.image[i]);
        }
        data.append('userid', this.state.userid);
        data.append('content', this.state.content);
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/tweet',data, config)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         //console.log("type",typeof(response.data));
        //         if(response.status === 200){
        //             console.log("tweet successfully!");
        //         }
        // })

        this.props.actions.tweet(data, config, (status, result) => {
          if (status === 'SUCCESS') {
            console.log("tweet successfully!");
          } else {
            console.log("tweet failed!");
          }
        });
    }

    clear() {
        this.setState({
            files: [],
            imagesPreviewUrls: [],
            image: [],
        });
    }


    _handleImageChange = e =>{
        e.preventDefault();


        //console.log("hanle iamge ---------", e.target.files[0], typeof(e.target.files));
        // this.setState({
        //     image: [...this.state.image, e.target.files[0]]
        // });
        // this.setState({
        //     image: e.target.files
        // });
        // FileList to Array
        let files = Array.from(e.target.files);
        
        // File Reader for Each file and and update state arrays
        let newimages = [];
        files.forEach((file, i) => {
            newimages.push(file);
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState(prevState => ({
                    files: [...prevState.files, file[0]],
                    imagesPreviewUrls: [...prevState.imagesPreviewUrls, reader.result]
                }));
            }

            reader.readAsDataURL(file);
        });

        this.setState({
            image: [...this.state.image, ...newimages]
        });
    }

    render() {
        let {imagesPreviewUrls} = this.state;
        //console.log("files----------", this.state.content);
        return (
            <div>
                <textarea rows="4" cols="60" placeholder="What's happening?" onChange={e=>this.setState({content:e.target.value})} required></textarea>

                <br/>

                {imagesPreviewUrls.map(function(imagePreviewUrl, i){
                    return (<span>
                            <img key={i} src={imagePreviewUrl} width="100" height="100" />
                            {/* <button onClick={(i) => this.onClick}>x</button> */}
                            </span>
                            )
                })}
                {this.state.imagePreviewUrls != [] && <button type="submit" onClick={this.clear} >x</button>}
                

                <div class="image-upload">
                    <label for="file-input">
                        {/* <img src={this.state.button_image} height="30" width="30"></img> */}
                        <i class="fas fa-camera" style={{fontSize: "2em"}}></i>
                    </label>
                    <input id="file-input" name = "myImage" type="file" onChange={this._handleImageChange} multiple/>
                    <button class="btn btn-secondary button1" type="submit" onClick={this.onClick} >Tweet</button>
                </div>
                <br/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: {
        tweet: bindActionCreators(tweetActions.tweet, dispatch)
      }
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TweetComponent);



// export default TweetComponent;