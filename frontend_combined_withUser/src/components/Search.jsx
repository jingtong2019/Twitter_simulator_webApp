/* eslint-disable no-use-before-define */
import React ,{ Component }  from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import * as searchActions from "../redux/actions/search-actions"; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//var url='http://localhost:3001';
import { Redirect } from 'react-router';
var url = "http://54.153.73.30:3001";


  class Search extends Component   {

  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
     this.state = {
      searchuserid:"",
      searchuserhandle:"",
      allUsers:[],
      hashtag:"",
      profileredirect:false
    };
      this.searchtext=this.searchtext.bind(this);
      this.searchclick=this.searchclick.bind(this);
      this.hashtagclick=this.hashtagclick.bind(this);
      this.hashtagtext=this.hashtagtext.bind(this);
      

}

componentWillMount() {
 console.log("")
 
 this.props.actions.clearchecks( async (status, feeds) => {
});

  axios.get(url+'/getAllUsers')
      .then(response => {
          if (response.status === 200) {
              //remove self username from the list
              console.log(response.data)
              this.setState(
                  {
                      allUsers: response.data
                  }
              )
          }
      })
      .catch(err => {
          console.log('get user errors: 1')
          console.log(' getAlluser :', err)
      });
}


getUserInformation = (val) => {
  let findeduser;
    this.state.allUsers.map((e) => {
        if (e.userhandle === val) {
               const user = {
                id: e.userid,
                handle: e.userhandle,
                description: e.description
              }
            findeduser = user;
            return;
        }
    })
    if (findeduser !== null)
        return findeduser
    else
        return null;
}

searchtext=(e,k)=>
{
  //check for hashtag
  if(k!=null)
 { this.setState(
    {
      searchuserhandle:k.userhandle
    }
  )
 }
}


 searchclick=()=>
  {
     let handle=this.state.searchuserhandle;
     console.log("option value",handle)
   
      
     let user=this.getUserInformation(handle);
console.log(user);
     if(user !=null)
    { localStorage.setItem('searchuserhandle', user.handle);
     localStorage.setItem('searchuserid', user.id);
     this.props.actions.userSearch( (status, feeds) => {
    });
     
    }
     //dispatch action to display profile
  
  
   
 }

 hashtagclick=(e)=>
 {
  
    
    {
     localStorage.setItem('hashtag',this.state.hashtag );
     this.props.actions.hashtagSearch( (status, feeds) => {
    });
  
  
 }
}

hashtagtext=(e)=>
{
  this.setState({
   hashtag:e.target.value
    
  })
  
}

  render() {


  return (
    <div class="row ml-2">
      <Autocomplete
      id="combo-box-demo"
      options={this.state.allUsers}
      getOptionLabel={option => option.userhandle }
      style={{ width: 300 }}
      
      onChange={this.searchtext}
      renderInput={params => ( 
      <TextField {...params}  label="Search user" variant="outlined" fullWidth />
    )}
    />

    <button onClick={this.searchclick()}>Search</button>
   
    
    <TextField onChange={this.hashtagtext}  label="Search hashtags" variant="outlined" fullWidth />
    <button onClick={()=>{this.hashtagclick()}}>Search</button>

   </div>
  );
}
}

function mapStateToProps(state) {
  return {
  
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: {
      userSearch:bindActionCreators(searchActions.userSearch, dispatch),
      hashtagSearch :bindActionCreators(searchActions.hashtagSearch, dispatch),
      clearchecks:bindActionCreators(searchActions.clearcheck, dispatch)
  }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);