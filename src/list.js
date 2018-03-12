import React from "react";
import Paper from 'material-ui/Paper';

const paperStyle = {
  height: 100,
  width: '85%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
class List extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
        weather: []
    }
  }
  componentWillReceiveProps(nextProps){
    var weatherList = nextProps.weather.list;
    if(weatherList){
      this.setState({weather: weatherList});
    } 
  }
  createList(){
    var content;
    var weather = this.state.weather;
    console.log(weather);
    if(weather && weather.length > 0){
      content = [];
      for(var i=0;i<weather.length;i++){
        var date_txt = weather[i].dt_txt;
        var date_arr = date_txt.split(" ");
        var weatherItem = weather[i].weather;
        
        if(date_arr[1] == "03:00:00"){
          var iconCode = weatherItem[0].icon;
          var iconurl = "img/w/" + iconCode + ".png";
          content.push(<Paper key={date_txt} style={paperStyle} zDepth={1}>
            <h3>weather highlight for {date_arr[0]} : {weatherItem[0].description}
              <img src={iconurl}/>
            </h3>
            
          </Paper>);
        }
      }
    }else{
      content = <h4>No data to show</h4>;
    }
    return content;
  }
  render(){
    return (
      <div>
        <h2>Weather for coming 5 days</h2>
        {this.createList()}
      </div>
    );
  }
}

export default List;