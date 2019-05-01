import React, { Component } from 'react';

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
        console.log(this.response);
     


      } else {

        // Errored.

      }
    }
  };
        
  xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + city  + "," + country_code + "&units=metric&mode=xml&appid=3f4980b5e728317c64daa9a921b89166");
  xhr.send(); 

});




// get current 7 day forecast for area.

const main = async () => {

  const ipAddress = await getIpAddress();

  const locationData = await getLocationData(ipAddress);

  const location = JSON.parse(locationData);

  const city = location.city;
  const country_code = location.country_code;

  console.log(country_code);
  console.log(city);



  const forecastdata = await getForecastData(city, country_code);

  console.log(forecastdata);

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
