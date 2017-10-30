import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Camper extends Component {

  userUrl() {
    return `https://www.freecodecamp.org/${this.props.camper.username}`
  }

  render() {
    return (
      <tr>
        <td>{this.props.rank}</td>
        <td><img src={this.props.camper.img} /></td>
        <td><a href={this.userUrl()}>{this.props.camper.username}</a></td>
        <td>{this.props.camper.recent}</td>
        <td>{this.props.camper.alltime}</td>
      </tr>
    )
  }

}

class CamperList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              <th>No.</th>
              <th>Camper</th>
              <th />
              <th>30 Days</th>
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
