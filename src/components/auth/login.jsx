import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = { 
            email:'',
            password:'',
            isLoggedIn:false,
            user:{}
         };
    }
    
     _submitLoginForm =(e)=>{
        e.preventDefault();
        if(this.state.email ==="" || this.state.password ===""){
            alert("Email or Password Cannot be Empty");
            return;
        }
        axios.post("/user/login",this.state).then((result)=>{
            return result;
        }).then(json=> {
            if(json.data.success){
                alert("Login Successful!");
                let userData={
                    id:json.data.data.id,
                    name:json.data.data.name,
                    email:json.data.data.email,
                    auth_token:json.data.data.auth_token,
                    timestamp:new Date().toString()
                };
                let appState={
                    isLoggedIn:true,
                    user:userData
                };
                localStorage['calls'] = JSON.stringify(appState);
                
                this.setState({
                    
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                   });
            }else{
                alert("Login Failed! Incorrect credentials.");
            }

        }).catch(function(error){
            alert(error);
        });
     }
     onChangeHandler =(e)=>{
        this.setState({[e.target.name]:e.target.value});
     }
    render() { 
        if(this.state.isLoggedIn)  {
            return <Redirect to="/" />
        }
        var session =JSON.parse(localStorage.getItem('calls'))
        if(session!==null && session.isLoggedIn){
            return <Redirect to='/' />
        }
        return ( 
            <div className="container">
            <form className="mt-5" onSubmit={this._submitLoginForm}>
                <legend className="text-center">Log in to your WorkPay Account</legend>
                <div className="form-group row">
                    <label className="col-2 col-form-label justify-content-right">Email address</label>
                    <div className="col-10">
                    <input onChange={ this.onChangeHandler } type="text" name='email' className="form-control" placeholder="Email address"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label">Password</label>
                    <div className="col-10">
                    <input type="password" onChange={ this.onChangeHandler } className="form-control" name="password" placeholder="Password"/>
                    </div>
                </div>
                <button className="btn btn-primary col-12" type="submit">LOGIN</button>
            </form>
            </div>
         );
    }
}
 
export default Login;