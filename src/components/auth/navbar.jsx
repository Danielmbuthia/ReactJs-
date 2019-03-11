import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Login from './login';
import Registration from './registration';
import HomePage from '../HomePage';
import Logout from './logout';
import Attendance from "../home/Attendance";
import HRM from "../home/HRM";
import Payouts from "../home/Payouts";
class Navbar extends Component {

    render() {
        let session =JSON.parse(localStorage.getItem('calls'));
        if(session === null || !session.isLoggedIn){
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">WorkPay</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/registration">Registration <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/login">Sign in <span className="sr-only">(current)</span></Link>
                                </li>                                
                            </ul>
                        </div>
                    </nav>
                    <div className="App-intro">
                        <Route path="/" exact component={HomePage} />
                        <Route path="/registration" exact component={Registration} />
                        <Route path="/login" exact component={Login} />
                    </div>
                </div>
                );

        }else{
            return (    
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">WorkPay</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">   
                            
                                 <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                </li>                             
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Apps
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/home/attendance">Attendance</Link>
                                        <div className="dropdown-divider">&nbsp;</div>
                                        <Link className="dropdown-item" to="/home/payroll">Payroll</Link>
                                        <div className="dropdown-divider">&nbsp;</div>
                                        <Link className="dropdown-item" to="/home/payouts">Payouts</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">Logout({session.user.name})</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="App-intro">
                        <Route path="/" exact component={HomePage} />
                        <Route path="/logout" exact component={Logout} />
                        <Route path="/home/attendance" exact component={Attendance}/>
                        <Route path="/home/payroll" exact component={HRM}/>
                        <Route path="/home/payouts" exact component={Payouts}/>
                    </div>
                </div>
                );
        }
    }
}

export default Navbar;