import React, { Component } from 'react';
import './App.css';
import List from './list';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import cities from './data/cities.json';
import key from './config/keys.json';

const style = {
  margin: 12
};

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
        location: '',
        weather: {}
    }
    this.getWeather = this.getWeather.bind(this);
  }
  handleUpdateInput (t) { this.setState({ location: t }) }
  handleSelect (t) { this.setState( { location: '' }) }
  getWeather(){
    var self = this;
    var location = this.state.location;
    var baseUrl = 'data/2.5/forecast?';
    var appid = 'appid=' + key.apiKey;
    var locationUrl = '&q=' + location ;
    axios.get(baseUrl + appid + locationUrl + '&mode=json')
    .then(function(response){
      var weatherData = response.data;
      self.setState({ weather: weatherData });
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
        <AppBar
          title="WeatherApp"
        />
        <div>
            <AutoComplete floatingLabelText="Type city name"
            filter={AutoComplete.fuzzyFilter} dataSource={cities}
            maxSearchResults={5} searchText={this.state.location}
            onUpdateInput={this.handleUpdateInput.bind(this)}/>
            <RaisedButton label="Show Weather" primary={true} style={style}
            onClick={this.getWeather} />
        </div>
        
        
        <List weather={this.state.weather}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
