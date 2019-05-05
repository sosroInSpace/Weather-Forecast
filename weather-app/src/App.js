import React, { Component } from 'react';
import './App.scss';

/*
  Helper function for getting the users's IP address.
*/

const getIpAddress = async () => {

  const response = await fetch("https://api.ipify.org?");
  const text = await response.text();

  return text;

};

/*
  Helper function to get location data with IP address.
*/

const getLocationData = (ipAddress) => new Promise((resolve, reject) => {

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {

        // Was successful.
        resolve(this.responseText);

      } else {

        // Errored.
        reject();

      }
    }
  };
        
  xhr.open("GET", "http://api.ipstack.com/" + ipAddress + '?access_key=9fdca36557ede803d98746f821b8829a');
  xhr.send(); 

});


const getForecastData = (city, country_code) => new Promise((resolve, reject) => {

const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(response) {
    if (this.readyState === 4) {
      if (this.status === 200) {

        // Was successful.

        const response = JSON.parse(this.response);

        console.log(response);
        // weather description

     
      } else {

        // Errored.
        reject();

      }
    }
  };
        
  xhr.open("GET", "https://api.weatherbit.io/v2.0/forecast/daily?city=" + city +"," + country_code + "&days=8&key=b1c6bd1420294862b9b444b0a99f4f3c");
  xhr.send(); 

});




// get current 7 day forecast for area.

const main = async () => {

  const ipAddress = await getIpAddress();
  const locationData = await getLocationData(ipAddress);
  const location = JSON.parse(locationData);
  const city = location.city;
  const country_code = location.country_code;



  const forecastdata = await getForecastData(city, country_code);

  const weatherinfo = JSON.parse(forecastdata);



  console.log(weatherinfo.description);
  const result = document.getElementById('result');



};


main();

/*
  Base react component.
*/

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
    };
  }

  componentDidMount() {



  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="result">
          </div>
        </header>
      </div>
    );
  }
}

export default App;
