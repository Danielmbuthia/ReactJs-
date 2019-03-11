import React,{Component} from 'react';
import axios from "axios";
export default class ShowDepartment extends Component{
    constructor(props){
        super(props);
        this.cancelForm = this.cancelForm.bind(this);
        let requestParameters = this.props.record;
        this.state = {
            requestParameters:requestParameters
        };
    }
    cancelForm(){
        this.props.onFormFeedback(false, 0, 'dismissed', null, 'none');
    }
    render() {
        return (
            <div className="container">
                <div className="mt-5">
                    <legend className="text-center">Department Details</legend>
                    <div className="form-group row">
                        <div className="col-10">
                            <h6>Name: {this.state.requestParameters.name}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            &nbsp;
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-primary" onClick={this.cancelForm}>DISMISS</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}