import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Parser as FormulaParser } from 'hot-formula-parser';
import Row from './Row';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';

/**
 * Table creates a table with x rows and y columns
 */
class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      gradeInfo: {
        student_id: '',
        subject_id: '',
        date_diff: '',
        grade: '',
      }
    }
    this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
    this.routeUniversityId = _.get(this.props, 'match.params.id', null);

    this.tableIdentifier = `tableData-${props.id}`

    // Initialize the formula parser on demand
    this.parser = new FormulaParser()

    // When a formula contains a cell value, this event lets us
    // hook and return an error value if necessary
    this.parser.on('callCellValue', (cellCoord, done) => {
      const x = cellCoord.column.index + 1
      const y = cellCoord.row.index + 1

      // Check if I have that coordinates tuple in the table range
      if (x > this.props.x || y > this.props.y) {
        throw this.parser.Error(this.parser.ERROR_NOT_AVAILABLE)
      }

      // Check that the cell is not self referencing
      if (this.parser.cell.x === x && this.parser.cell.y === y) {
        throw this.parser.Error(this.parser.ERROR_REF)
      }

      if (!this.state.data[y] || !this.state.data[y][x]) {
        return done('')
      }

      // All fine
      return done(this.state.data[y][x])
    })

    // When a formula contains a range value, this event lets us
    // hook and return an error value if necessary
    this.parser.on('callRangeValue', (startCellCoord, endCellCoord, done) => {
      const sx = startCellCoord.column.index + 1
      const sy = startCellCoord.row.index + 1
      const ex = endCellCoord.column.index + 1
      const ey = endCellCoord.row.index + 1
      const fragment = []

      for (let y = sy; y <= ey; y += 1) {
        const row = this.state.data[y]
        if (!row) {
          continue
        }

        const colFragment = []

        for (let x = sx; x <= ex; x += 1) {
          let value = row[x]
          if (!value) {
            value = ''
          }

          if (value.slice(0, 1) === '=') {
            const res = this.executeFormula({ x, y }, value.slice(1))
            if (res.error) {
              throw this.parser.Error(res.error)
            }
            value = res.result
          }

          colFragment.push(value)
        }
        fragment.push(colFragment)
      }

      if (fragment) {
        done(fragment)
      }
    })
  }


  componentDidMount() {
    this.fetchGrades();
  }

  fetchGrades(event) {
    event && event.preventDefault();
    let apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/grades?type=display`;
    if (this.props.subjectId) {
      apiUrl += `&subjectId=${this.props.subjectId}`;
    }
    if (this.props.year) {
      apiUrl += `&year=${this.props.year}`;
    }
    if (this.props.halfYear) {
      apiUrl += `&halfYear=${this.props.halfYear}`;
    }
    if (this.props.group) {
      apiUrl += `&group=${this.props.group}`;
    }
    try {
      fetch(apiUrl, {
        headers: {
          'Authorization': this.props.auth.user.api_token
        }
      })
        .then((response) => response.json())
        .then((data) => this.setState({ data: data, isLoaded: true }));

    } catch (error) {
      console.error(error);
    };
  }

  /**
   * Force an update of the component
   */
  updateCells = () => {
    this.forceUpdate()
  }

  /**
   * Executes the formula on the `value` usign the FormulaParser object
   */
  executeFormula = (cell, value) => {
    this.parser.cell = cell
    let res = this.parser.parse(value)
    if (res.error != null) {
      return res // tip: returning `res.error` shows more details
    }
    if (res.result.toString() === '') {
      return res
    }
    if (res.result.toString().slice(0, 1) === '=') {
      // formula points to formula
      res = this.executeFormula(cell, res.result.slice(1))
    }

    return res
  }

  handleChangedCell = ({ x, y }, value) => {
    const modifiedData = Object.assign({}, this.state.data);
    modifiedData[x] = {
      date_diff: x,
      student_id: this.props.headerY[y - 1].id,
      grade: value,
    };
    this.setState({
      data: modifiedData,
      gradeInfo: {
        ...this.state.gradeInfo,
        grade: value,
        student_id: modifiedData[x].student_id,
        date_diff: modifiedData[x].date_diff,
        subject_id: this.props.subjectId
      }
    }, this.saveData.bind(this))
  }

  saveData() {
    const postApiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/grades/${this.props.subjectId}/edit`;
    const headers = {
      'Authorization': this.props.auth.user.api_token
    }
    try {
      axios.post(postApiUrl, this.state.gradeInfo, { headers })
        .then(() => this.props.history.push(`/universities/${this.routeUniversityId}/${this.routeFacultyId}/grades-table`));
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const rows = []
    for (let y = 0; y < this.props.y + 1; y += 1) {
      const sortedRowData = {};
      const studentGrades = [];
      for (let i = 0; i < Object.keys(this.state.data).length; i++) {
        const studentData = Object.values(this.state.data);
        if (this.props.headerY[y - 1] && studentData[i].student_id === this.props.headerY[y - 1].id) {
          studentGrades.push(studentData[i]);
        }
      }
      const rowData = this.state.data[y] || {};
      const rowValues = Object.values(rowData);
      if (rowValues[1]) {
        for (let i = 0; i < studentGrades.length; i++) {
          sortedRowData[studentGrades[i].date_diff] = studentGrades[i].grade.toString();
        }
        rows.push(
          <Row
            handleChangedCell={this.handleChangedCell}
            executeFormula={this.executeFormula}
            updateCells={this.updateCells}
            key={y}
            y={y}
            x={this.props.x + 1}
            rowData={sortedRowData}
            headerY={this.props.headerY[y - 1]}
          />,
        )
      }
    }
    return (
      <div>
        {rows}
      </div>
    )
  }
}

Table.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  id: PropTypes.string,
  saveToLocalStorage: PropTypes.bool,
}

Table.defaultProps = {
  saveToLocalStorage: true,
  id: 'default',
}

const mapStateToProps = (state) => ({
  auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(Table));