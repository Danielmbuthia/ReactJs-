import React, { Component } from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            confirm_password:'',
            isLoggedIn:false
        };
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.password!==this.state.confirm_password){
            alert('password must match');
            return ;
        }
        axios.post('/user/register',this.state).then((result)=>{
            return result;
        }) .then(json => {
            if (json.data.success) {
                alert('Registration done');
                let userData = {
                    name: json.data.data.name,
                    id: json.data.data.id,
                    email: json.data.data.email,
                    auth_token: json.data.data.auth_token,
                    timestamp: new Date().toString()
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                // save app state with user date in local storage
                localStorage["calls"] = JSON.stringify(appState);
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user
                });
            } else {
                alert(`Registration Failed!`);
            }
        }).catch(function(error){
            return alert(error);
        });
    }
    onChangeValue = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() { 
        if(this.state.isLoggedIn === true){
            return <Redirect to='/home' />
        }
        var session =JSON.parse(localStorage.getItem('calls'))
        if(session!==null && session.isLoggedIn === true){
            return <Redirect to='/home' />
        }
        return ( 
            <div className="container">
                <form onSubmit={this.onFormSubmit} className="mt-5">
                    <legend className="text-center">Create your WorkPay account</legend>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" placeholder="Name" required onChange={this.onChangeValue}/>
                        </div>
                        <div className="form-group col-6">
                            <label>Email address</label>
                            <input type="email" name="email" className="form-control" placeholder="Email" required onChange={this.onChangeValue}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" placeholder="Password" required onChange={this.onChangeValue}/>
                        </div>
                        <div className="form-group col-6">
                            <label>Confirm password</label>
                            <input type="password" name="confirm_password" className="form-control" placeholder="Confirm password" required onChange={this.onChangeValue}/>
                        </div>
                    </div>
                    <button className="btn btn-primary col-12" type="submit">CREATE ACCOUNT</button>
                </form>
            </div>
         );
    }
}
 
export default Registration;