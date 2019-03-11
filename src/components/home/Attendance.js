import React,{Component} from 'react';
import Table from "../common/Table";
import axios from "axios";
import CreateDepartment from "./CreateDepartment";
import DeleteDepartment from "./DeleteDepartment";
import EditDepartment from "./EditDepartment";
import ShowDepartment from "./ShowDepartment";
import {Redirect} from "react-router-dom";
const $ = require('jquery');
export default class Attendance extends Component{
    constructor(props){
        super(props);
        this.tokenInvalid = this.tokenInvalid.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.create = this.create.bind(this);
        this.onCreateDepartmentFeedback = this.onCreateDepartmentFeedback.bind(this);
        this.onDeleteDepartmentFeedback = this.onDeleteDepartmentFeedback.bind(this);
        this.onEditDepartmentFeedback = this.onEditDepartmentFeedback.bind(this);
        this.onShowDepartmentFeedback = this.onShowDepartmentFeedback.bind(this);
        const _columns = [
            {
                title: 'Department Name',
                data: 'name'
            },
            {
                title: 'Actions',
                data: null,
                render:function(data, type, full, meta){
                    const linkEdit = "<button id='show'>Details</button>";

                    const linkDetails = "<button id='edit'>Edit</button>";

                    const linkDelete = "<button id='delete'>Delete</button>";

                    return linkDetails + " | " + linkEdit + " | " + linkDelete;
                },
                createdCell:(td, cellData, rowData, row, col)=>{
                    $(td).click((e)=>{
                        this.handleClick(e, rowData);
                    })
                }
            }
        ];
        const _data = [];
        const sessionData = JSON.parse(localStorage.getItem('calls'));
        const isLogedIn = (sessionData !== null && sessionData.isLoggedIn);
        const token = isLogedIn?sessionData.user.auth_token:null;
        const requestParameters = {token:token};
        this.state = {
            isLogedIn :isLogedIn,
            columns: _columns,
            requestParameters : requestParameters,
            data: _data,
            createForm: {open:false},
            deleteForm: {open:false, record:null},
            editForm: {open:false, record: null},
            showForm: {open:false, record: null}
        };
    }
    componentDidMount() {
        axios.get("/departments", {
            params: this.state.requestParameters
        }).then((response)=>{
            if(response.data.success){
                //alert("Data get Successful! "+JSON.stringify(json.data));

                this.setState({
                    data: response.data.data
                });
            }else{
                alert("Data get Failed! "+JSON.stringify(response.data));
            }
        }).catch((error)=>{
            if(error.response.status){
                this.tokenInvalid();
            }
        });
    }

    render() {
        if(!this.state.isLogedIn){
            return <Redirect to="/logout" />;
        }
        return (
            <div className="container">
                <legend className="text-center">Departments</legend>
                <hr/>
                {this.state.createForm.open?
                    <CreateDepartment onFormFeedback={this.onCreateDepartmentFeedback}/> :
                    this.state.deleteForm.open?
                        <DeleteDepartment record={this.state.deleteForm.record} onFormFeedback={this.onDeleteDepartmentFeedback}/> :
                        this.state.editForm.open?
                            <EditDepartment record={this.state.editForm.record} onFormFeedback={this.onEditDepartmentFeedback}/> :
                            this.state.showForm.open?
                                <ShowDepartment record={this.state.showForm.record} onFormFeedback={this.onShowDepartmentFeedback}/> :
                                <div>
                                    <button className="btn btn-secondary" onClick={this.create}>Create New</button>
                                    <br/><br/>
                                    <Table columns={this.state.columns} data={this.state.data}/>
                                </div>
                }
            </div>
        );
    }
    handleClick(e, rowData){
        const action = e.target.id;
        if(action == 'delete'){
            this.delete(rowData);
        }else if(action == 'edit'){
            this.edit(rowData);
        }else if(action == 'show'){
            this.show(rowData);
        }
    }
    create(){
        this.setState({
            createForm: {open:true}
        });
    }
    show(record){
        this.setState({
            showForm: {open:true, record:record}
        });
    }
    delete(record){
        this.setState({
            deleteForm: {open:true, record:record}
        });
    }
    edit(record){
        this.setState({
            editForm: {open:true, record:record}
        });
    }
    onCreateDepartmentFeedback(success, statusCode, message, record){
        const data = this.state.data;
        if(success){
              data.push(record);
        }
        this.setState({
            createForm: {open:false},
            data: data
        });
        if(statusCode == 401){
            this.tokenInvalid();
        }
        alert(message);
    }
    onShowDepartmentFeedback(success, statusCode, message, record, extraAction){
        //THE extraAction is meant for any action that the child can execute on the displayed item e.g deleting or editing
        //In which case, the the record can be removed or updated respectively
        this.setState({
            showForm: {open:false},
        });
    }
    onDeleteDepartmentFeedback(success, statusCode, message, record){
        let data = this.state.data;
        if(success){
            data = data.filter(function(row) {
                return row.id != record.id
            });
        }
        this.setState({
            deleteForm: {open:false},
            data: data
        });
        if(statusCode == 401){
            this.tokenInvalid();
        }
        alert(message);
    }
    onEditDepartmentFeedback(success, statusCode, message, record){
        let data = this.state.data;
        if(success){
            data = data.filter(function(row) {
                return row.id != record.id
            });
            data.push(record);
        }
        this.setState({
            editForm: {open:false},
            data: data
        });
        if(statusCode == 401){
            this.tokenInvalid();
        }
        alert(message);
    }
    tokenInvalid(){
           this.setState({
               isLogedIn:false
           });
    }
}