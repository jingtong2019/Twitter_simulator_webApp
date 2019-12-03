/* eslint-disable no-use-before-define */
import React ,{ Component }  from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import * as searchActions from "../redux/actions/search-actions"; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//var url='http://localhost:3001';
var url = "http://54.153.73.30:3001";


  class Search extends Component   {

  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
     this.state = {
      searchuserid:"",
      searchuserhandle:"",
      allUsers:[]
    };
      this.searchtext=this.searchtext.bind(this);
      this.searchclick=this.searchclick.bind(this);
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
     if(handle.includes("@"))
     { 
     let user=this.getUserInformation(handle);
     localStorage.setItem('searchuserhandle', user.handle);
     localStorage.setItem('searchuserid', user.id);
     this.props.actions.userSearch( (status, feeds) => {
    });
     //dispatch action to display profile
    }
    else
    {
      if(handle.includes("#"))
      {
       localStorage.setItem('hashtag', handle);
       this.props.actions.hashtagSearch( (status, feeds) => {
      });
    }
    }
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
      <TextField {...params}  label="Search" variant="outlined" fullWidth />
    )}
    />

    <button onClick={()=>{this.searchclick()}}>Search</button>
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