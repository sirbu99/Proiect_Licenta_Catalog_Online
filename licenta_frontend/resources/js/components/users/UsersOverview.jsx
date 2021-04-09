import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';

class UsersOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            columns: [],
            count: 0,
        };

        this.loadData();
    }

    componentDidMount(){
        this.loadData();
    }

    loadData() {
        // TODO: Ajax call to load users data
        const data = [
            {first_name: 'Vadim', last_name: 'Sirbu'},
            {first_name: 'Simona', last_name: "Sirbu"},
        ];

        const columns = _.chain(data)
            .first()
            .keys()
            .map((field) => ({
                name: _.capitalize(field.replace('_', ' ')),
                selector: field,
                sortable: true,
            }))
            .value();

        this.setState({
            data,
            columns,
        })
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">User list</h2>
                </div>
                <div className="card-body">
                    <DataTable
                        noHeader
                        pagination
                        paginationServer
                        columns={this.state.columns}
                        data={this.state.data}
                        paginationTotalRows={this.state.count}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(UsersOverview);
