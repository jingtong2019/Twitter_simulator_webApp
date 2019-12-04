import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import "./../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all";
import Dialog from "./Dialog"
import Listfeed from './Listfeeds'
import * as listActions from "../redux/actions/list-actions"; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//var url='http://localhost:3001';
var url = "http://54.153.73.30:3001";

export default class searchuserlist extends Component {

  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      userList: [],
      subscriberList:[],
      displaylistofuser: false,
      displaylistmembers: [],
    }
       this.gettweets=this.gettweets.bind(this);
       this.subscribe=this.subscribe.bind(this);
   
  }


  componentWillMount() {
    //change will be required when changing the other users
    console.log("")


    const data = {
      userhandle: localStorage.getItem('searchuserhandle')
    }


    axios.post(url+'/getUserLists', data)
      .then(response => {
        if (response.status === 200) { 
          this.setState(
            {
              userList: response.data,
            }
          )
        }
      })
      .catch(err => {
        console.log('getUserLists errors: 1')
        console.log(' getUserLists :', err)
      });

      axios.post(url+'/getSubscriberLists', data)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          this.setState(
            {
              subscriberList: response.data,
            }
          )
        }
      })
      .catch(err => {
        console.log('getUserLists errors: 1')
        console.log(' getUserLists :', err)
      });
 }

// getlists() {
//       console.log("list feeds here  ");
      
//      this.props.actions.getUserlists( (status, feeds) => {

//         console.log("list feeds from response ")
//         console.log(feeds);
//         if (status === 'SUCCESS') {
//           console.log('CCCCC')
//         this.setState(
//           { 
//             userList: feeds,
//           }
//         )
//       } else {
//         this.setState({
//           userList: []
//         });
//       }
//     });
//   }
    

subscribe=(val)=>{

const data={


       list_id:  val,
       user_id:localStorage.getItem('cookie1'),
       name:localStorage.getItem('cookie2'),
       handle:localStorage.getItem('cookie3')
}

  axios.post(url+'/subscibeList', data)
  .then(response => {
    if (response.status === 200) {
      console.log(response.data)
      
    }
  })
  .catch(err => {
    console.log('getUserLists errors: 1')
    console.log(' getUserLists :', err)
  });

}

  gettweets=(val)=>{

    this.setState({ displaylistmembers: val, displaylistofuser: true });

     
    // const data={
    //   userids:val
    // }

    // axios.post('http://localhost:3001/getAllUserTweets', data)
    // .then(response => {
    //   if (response.status === 200) {
    //     console.log(response.data)
        
    //   }
    // })
    // .catch(err => {
    //   console.log('getAllUserTweets errors: 1')
    //   console.log(' getAllUserTweets :', err)
    // });
}

  render() {

    console.log(this.props);
    if(localStorage.getItem('searchuserhandle'))
    localStorage.setItem('searchuserhandle',localStorage.getItem('cookie3'))
    let current;
    console.log('this.state.userList');
    console.log(this.state.userList)

  if(this.state.userList!=='Mongo Connection Error' && this.state.userList.length !== 0)
  {current=this.state.userList.map(listitem => (
    <li key={listitem._id} style={{borderBottom:'1px solid black',borderTop:'1px solid black'}}  >
    <div style={{display:'flex'}} onClick={() => this.gettweets(listitem.members)}>
    <h5 style={{marginRight:'5%'}}>{listitem.username}</h5>
    <h5 style={{fontStyle:'italic'}}>{listitem.userhandle}</h5>
    </div>
    <p>{listitem.name}</p>
    <p>{listitem.description}</p>
    <div style={{display:'flex'}}>
    <p style={{marginRight:'10%'}}>members:{listitem.members.length}</p>
    <p>subscibers:{listitem.subscribers.length}</p>
    <button onClick={() => {this.subscibe(listitem._id)}}>  Subscribe </button>
    </div>
  </li>
 
))}

let current2;

if(this.state.subscriberList!=='Mongo Connection Error' && this.state.subscriberList.length !== 0)
{current2=this.state.subscriberList.map(listitem => (
  <li key={listitem._id} style={{borderBottom:'1px solid black',borderTop:'1px solid black'}} onClick={() => this.gettweets(listitem.members)} >
    <h5>{listitem.username}</h5>
    <h6>{listitem.userhandle}</h6>
    <p>{listitem.name}</p>
    <p>{listitem.description}</p>
    <p>members:{listitem.members.length}</p>
    <p>subscibers:{listitem.subscribers.length}</p>
    
  </li>
))}
    var display
    if (!this.state.displaylistofuser ) {
      
      display = <div>
        <div><p>List </p></div>
       
        <div class="">

  <br></br>
 
  <ul class="nav nav-pills" role="tablist">
    <li class="nav-item" className="width_li">
      <a class="nav-link active" data-toggle="pill" href="#owned">Owned</a>
    </li>
    <li class="nav-item" className="width_li">
      <a class="nav-link" data-toggle="pill" href="#subscribed">Subscribed List</a>
    </li>
    {/* <li class="nav-item" className="width_li">
      <a class="nav-link" data-toggle="pill" href="#menu2">Menu 2</a>
    </li> */}
  </ul>

 
  <div class="tab-content">
    <div id="owned" class=" tab-pane active">
    <React.Fragment>
     <ul className="list-group" style={{listStyleType:'none',color:'black',background:'white'}}>
    {current}
  </ul>

</React.Fragment> 
    </div>
    <div id="subscribed" class="container tab-pane fade">
    <React.Fragment>
     <ul className="list-group" style={{listStyleType:'none',color:'black',background:'white'}}>
    {current2}
  </ul>
</React.Fragment> 
     
    
    </div>

   
  </div>
</div> 
  
</div>
    }
    else {
      display = <div>
        <button onClick={() => { this.setState({ displaylistmembers: [], displaylistofuser: false }) }}>  back </button>
        { <Listfeed members={this.state.displaylistmembers}/> }
      </div>
    }

    return (
      <div class='col-md-5' style={{padding:'1px'}}>
        {display}
      </div>

     )
  }
}


