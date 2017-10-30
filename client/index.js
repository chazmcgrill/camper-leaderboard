import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Camper extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.rank}</td>
        <td>{this.props.camper.username}</td>
        <td>{this.props.camper.recent}</td>
        <td>{this.props.camper.alltime}</td>
      </tr>
    )
  }
  
}

class CamperList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false
    };
  }

  componentDidMount() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then((Response) => Response.json())
      .then((findResponse) => {
        console.log(findResponse);
        this.setState({
          data: findResponse
        });
      });
  }

  render() {
    if (!this.state.data) {
      return (
        <tbody>
          <tr><td>Loading...</td></tr>
        </tbody>
      )
    }
    return (
      <tbody>
        {this.state.data.map(function(camper, i) {
          return (
            <Camper camper={camper} key={i} rank={i + 1} />
          )
        })}
      </tbody>
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
          <CamperList />
        </table>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
