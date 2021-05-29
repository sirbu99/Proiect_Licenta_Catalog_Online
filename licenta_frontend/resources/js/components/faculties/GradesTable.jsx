import { Grid, Input, Select } from 'react-spreadsheet-grid'
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class GradesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
        const rows = [
            { id: 'user1', name: 'John Doe', positionId: 'position1' },
            // and so on...
        ];
    }
    render (){
        <Grid
        columns={[
            {
            title: () => 'Name',
            value: (row, { focus }) => {
                return (
                    <Input
                        value={row.name}
                        focus={focus}
                    />
                );
            }
            }, {
            title: () => 'Position',
            value: (row, { focus }) => {
                return (
                    <Select
                        value={row.positionId}
                        isOpen={focus}
                        items={somePositions}
                    />
                );
            }
            }
        ]}
        rows={rows}
        getRowKey={row => row.id}
        />
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GradesTable));