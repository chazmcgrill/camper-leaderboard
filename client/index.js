import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TableData extends Component {
  render() {
    return (
        <tr>
          <td>1</td>
          <td>Tester</td>
          <td>200</td>
          <td>4396</td>
        </tr>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Camper</th>
              <th>Last 30 Days</th>
              <th>All Time</th>
            </tr>
          </thead>
          <tbody>
            <TableData />
          </tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
