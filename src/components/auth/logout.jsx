import React,{Component} from 'react';

import {Redirect} from 'react-router-dom';

export default class Logout extends Component{
    constructor(props){
        super(props);
        this.state ={
            isLoggedIn: false,
             user: {}
        };
    }
    render(){
        localStorage.setItem('calls',JSON.stringify(this.state));
        return <Redirect to="/" />
    }
}