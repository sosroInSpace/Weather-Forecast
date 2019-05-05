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
        console.log(response.timezone);
        let timezone = `<div class="time-zone">${response.timezone}</div>'`

        document.getElementById('weather-wrapper').innerHTML = timezone;

        response.data.forEach(function(sevendays){
          // change date format
          let origin_date = new Date(sevendays.valid_date);
          // get days 
          let day = origin_date.toString();
          day = day.substring(0, 4);


          // max temp
          let min_temp = sevendays.min_temp;
          let max_temp = sevendays.max_temp;

          // description

          let description = sevendays.weather.description;

          // weather description

           const markup = 

          `<div class="weather-col">
              <div class="days-displayed">
                ${day}
              </div>
              <div class="weather-description">
              ${description}
              </div>
             
                <div class="weather-min-max">
                  <span>max temp </span><span>${max_temp}°c</span>
                </div>
                <div class="weather-min-max">
                  <span>min temp </span><span>${min_temp}°c</span>
                </div>
          </div>`;

          document.getElementById('weather-wrapper').innerHTML += markup;

        });



       

     
      } else {

        // Errored.
        reject();

      }
    }
  };
        
  xhr.open("GET", "https://api.weatherbit.io/v2.0/forecast/daily?city=" + city +"," + country_code + "&days=7&key=b1c6bd1420294862b9b444b0a99f4f3c");
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


  render() {
    return (
      <div className="App">
        <section id="weather-wrapper">
          <div className="loader-wrapper">
            <div class="loader">
              <svg viewBox="0 0 80 80">
                  <circle id="test" cx="40" cy="40" r="32"></circle>
              </svg>
            </div>

            <div class="loader triangle">
                <svg viewBox="0 0 86 80">
                    <polygon points="43 8 79 72 7 72"></polygon>
                </svg>
            </div>

            <div class="loader">
                <svg viewBox="0 0 80 80">
                    <rect x="8" y="8" width="64" height="64"></rect>
                </svg>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
