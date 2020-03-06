const request = require("request-promise");

const API_KEY = "004792ede5315ccf9e58a2342e7c8b6a";

class Weather {
  static retrieveByCity(city, callback) {
    request({
      uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`,
      json: true
    })
      .then(function(res) {
        callback(res);
      })
      .catch(function(err) {
        console.log(err);
        callback({ error: "could not reach OpenWeatherMap API." });
      });
  }
}

module.exports = Weather;
