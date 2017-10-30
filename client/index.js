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
    this.state = {
      apiUrl: "https://fcctop100.herokuapp.com/api/fccusers/top/"
    };
  }

  fetchFunction(url) {
    fetch(url)
      .then((Response) => Response.json())
      .then((findResponse) => {
        this.setState({
          data: findResponse
        });
      });
  }

  choice(allTime) {
    return allTime ? 'alltime' : 'recent';
  }

  componentWillReceiveProps(nextProps) {
    this.fetchFunction(this.state.apiUrl + this.choice(nextProps.buttonChoice));
  }

  componentDidMount() {
    this.fetchFunction(this.state.apiUrl + this.choice(false));
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
  constructor(props) {
    super(props);
    this.state = {
      allTimeButton: false,
      selected: ''
    };
  }

  recentClicked() {
    this.setState({
      allTimeButton: false,
      selected: 'recent'
    });
  }

  allTimeClicked() {
    this.setState({
      allTimeButton: true,
      selected: 'alltime'
    });
  }

  isActive(value) {
    return (value === this.state.selected) ? 'active' : 'btn';
  }

  render() {
    return (
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th></th>
              <th>Camper</th>
              <th className={this.isActive('recent')} onClick={ this.recentClicked.bind(this) }>30 Days</th>
              <th className={this.isActive('alltime')} onClick={ this.allTimeClicked.bind(this) }>All Time</th>
            </tr>
          </thead>
          <CamperList buttonChoice={this.state.allTimeButton}/>
        </table>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
