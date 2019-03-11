import React, { Component } from 'react';
import Table from "./Table";
const $ = require('jquery');

class SampleTableTestor extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        const _columns = [
            {
                title: 'Name',
                data: 'name'
            },
            {
                title: 'Email',
                data: 'email'
            },
            {
                title: 'Department',
                data: 'department.name'
            },
            {
                title: 'First Book',
                data: 'books.0'
            },
            {
                title: 'Next of Kin',
                data: 'next_of_keen[, ]'
            },
            {
                title: 'Reference',
                data: null,
                render:function(data, type, full, meta){
                    return full.name+' ('+full.email+')';
                }
            },
            {
                title: 'Actions',
                data: null,
                render:function(data, type, full, meta){
                    const linkEdit = "<button id='details'>Details</button>";

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
        const _data = [
            {'name':'John', 'email':'john@example.com', 'department':{'id':123, 'name':'Marketing'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Mary', 'email':'mary@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Alex', 'email':'alex@example.com', 'department':{'id':567, 'name':'Security'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Tom', 'email':'tom@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'John', 'email':'john@example.com', 'department':{'id':123, 'name':'Marketing'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Mary', 'email':'mary@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Alex', 'email':'alex@example.com', 'department':{'id':567, 'name':'Security'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Tom', 'email':'tom@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'John', 'email':'john@example.com', 'department':{'id':123, 'name':'Marketing'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Mary', 'email':'mary@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Alex', 'email':'alex@example.com', 'department':{'id':567, 'name':'Security'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Tom', 'email':'tom@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'John', 'email':'john@example.com', 'department':{'id':123, 'name':'Marketing'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Mary', 'email':'mary@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Alex', 'email':'alex@example.com', 'department':{'id':567, 'name':'Security'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Tom', 'email':'tom@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'John', 'email':'john@example.com', 'department':{'id':123, 'name':'Marketing'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Mary', 'email':'mary@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Alex', 'email':'alex@example.com', 'department':{'id':567, 'name':'Security'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Tom', 'email':'tom@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'John', 'email':'john@example.com', 'department':{'id':123, 'name':'Marketing'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Mary', 'email':'mary@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Alex', 'email':'alex@example.com', 'department':{'id':567, 'name':'Security'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
            {'name':'Tom', 'email':'tom@example.com', 'department':{'id':234, 'name':'Accounting'}, 'books':['The Riders','The Hunters'], 'next_of_keen':['brother','sister']},
        ];
        this.state = {
            columns: _columns,
            data: _data
        }
    }
    render() {
        return (
            <div className="container">
                <legend className="text-center">Employees</legend>
                <Table columns={this.state.columns} data={this.state.data}/>
            </div>
        );
    }
    handleClick(e, rowData){
        alert('clicked: '+e.target.id+' '+e.target.nodeName.toLowerCase()+' '+rowData.name);
    }
}

export default SampleTableTestor;
