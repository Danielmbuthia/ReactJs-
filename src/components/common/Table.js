import React, { Component } from 'react';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class Table extends Component {
    constructor(props){
        super(props);
        this.reloadTableData = this.reloadTableData.bind(this);
    }
    render() {
        return (
            <div className={"table table-striped table-bordered table-hover"}>
                <table ref="main" className={'table'}/>
            </div>
        );
    }
    componentDidMount() {
        $(this.refs.main).DataTable({
            data:this.props.data,
            columns:this.props.columns,
            responsive:true
        })
    }
    componentWillUnmount() {
        $(this.refs.main).DataTable().destroy();
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.reloadTableData(nextProps.data);
        return false;
    }
    reloadTableData(data){
        const table = $(this.refs.main).DataTable();
        table.clear();
        table.rows.add(data);
        table.draw();
    }
}

export default Table;
