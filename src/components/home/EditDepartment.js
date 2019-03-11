import React,{Component} from 'react';
import axios from "axios";
import Helper from "../common/Helper";
export default class EditDepartment extends Component{
    constructor(props){
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        const sessionData = JSON.parse(localStorage.getItem('calls'));
        const isLogedIn = (sessionData !== null && sessionData.isLoggedIn);
        const token = isLogedIn?sessionData.user.auth_token:'ahaa';
        let requestParameters = Helper.copy(this.props.record);
        requestParameters['token']=token;
        this.state = {
            isLogedIn :isLogedIn,
            requestParameters:requestParameters
        };
    }
    submitForm (){
        axios.put("/departments/"+this.state.requestParameters.id,this.state.requestParameters).then((response)=>{
            if(response.data.success){
                this.props.onFormFeedback(true, response.status, response.data.message, response.data.data);
            }else{
                alert('failed: ');
            }
        }).catch((error)=>{
            if(error.response.status == 401){
                this.props.onFormFeedback(true, error.response.status, error.response.statusText, this.state.requestParameters);
            }else{
                alert(error.toLocaleString());
            }
        });
    };
    onChangeHandler (e){
        const requestParameters = this.state.requestParameters;
        requestParameters[e.target.name] = e.target.value;
        this.setState({
            requestParameters:requestParameters
        });
    };
    cancelForm(){
        this.props.onFormFeedback(false, 0, 'canceled', null);
    }
    render() {
        return (
            <div className="container">
                <div className="mt-5">
                    <legend className="text-center">Edit Department</legend>
                    <div className="form-group row">
                        <label className="col-2 col-form-label justify-content-right">Name</label>
                        <div className="col-10">
                            <input value={this.state.requestParameters.name} onChange={this.onChangeHandler} type="text" name='name' className="form-control" placeholder="Department Name"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-primary" onClick={this.submitForm}>SUBMIT</button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-secondary" onClick={this.cancelForm}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}