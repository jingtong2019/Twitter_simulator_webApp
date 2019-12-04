import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SSL_OP_ALL } from "constants";
import axios from 'axios';
import * as listActions from "../redux/actions/list-actions"; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//var url='http://localhost:3002';
var url = "http://54.153.73.30:3001";

class ListDialog extends Component {
    // const [open, setOpen] = React.useState(false);
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            name: "",
            description: "",
            listName: "",
            listDescription: "",
            allUsers: []
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.searchtext = this.searchtext.bind(this);
        this.getUserInformation = this.getUserInformation.bind(this);
        this.listDescriptioncheck = this.listDescriptioncheck.bind(this);
        this.listnamecheck = this.listnamecheck.bind(this);
    }

    componentWillMount() {

        console.log("")
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

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    

    getUserInformation = (val) => {
      let findeduser;
        this.state.allUsers.map((e) => {
            if (e.userhandle === val) {

                const user = {
                    id: e.userid,
                    name: e.userhandle,
                    description: e.description,

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

    handleClose = () => {

        let userList = [];
        if(localStorage.getItem("UserList")!=null)
       { let temp = localStorage.getItem("UserList").split(",");
        temp.map((element) => {
            let usercheck = this.getUserInformation(element);
            if (usercheck !== null)
                userList.push(usercheck);

        })
    }
        if (userList.length != 0 && this.state.listName!=null && this.state.listDescription!=null) {

         
            const data = {
                user_id: localStorage.getItem("cookie1"),
                username:localStorage.getItem("cookie2"),
                userhandle:localStorage.getItem('cookie3'),
                name: this.state.listName,
                Description: this.state.listDescription,
                members: userList,
                subscribers:[]
            }

              axios.post(url+'/createnewlist/', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log("List added Successfully");
                        this.props.actions.getUserlists((status,feed)=>{});
                    }
                })
                .catch(err => {

                    console.log('Error in creating new error')
                    console.log('err:', err)
                })
        }



        
        this.setState({ open: false });

        
      

    };

    handleCancel = () => {
        this.setState({ open: false });
    };


    //get the user profile data on the component
    //Implement kafka
    //Implement Redux

    searchtext = (event, value) => {
        if (value != null) {
            localStorage.setItem("UserList", value);
        }
    };

    listnamecheck = (e) => {
        console.log(e.target.value);
        this.setState({ listName: e.target.value });
    }

    listDescriptioncheck = (e) => {
        this.setState({ listDescription: e.target.value })
    }

    render() {
        return (
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClickOpen}
                >
                    New List
               </Button>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Create New List</DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label=" Name"
                            type="email"
                            fullWidth
                            onChange={this.listnamecheck}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label=" Description"
                            type="email"
                            fullWidth
                            onChange={this.listDescriptioncheck}
                        />

                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={this.state.allUsers.map(option => option.userhandle)}
                            onChange={this.searchtext}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Add members"
                                    placeholder="Favorites"
                                    margin="normal"
                                    fullWidth
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Create List
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
 };
}
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: {
        clearFeeds:bindActionCreators(listActions.clearFeeds, dispatch),
        getUserlists:bindActionCreators(listActions.getUserlists, dispatch)
    }
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListDialog);


