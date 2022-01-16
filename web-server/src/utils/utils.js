const request = require("request");

const geocode = (address, callback) => {
  const urlMap = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmlzY3VpdC10aGUtY2F0IiwiYSI6ImNreWE5aDV1ODAzOWMycG84Y3hsNHliN3gifQ.ukP2nuaEqf35iMGHH5HdFA&limit=1`;

  request({ url: urlMap, json: true }, (error, response) => {
    if (error) {
      callback("unable", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable", undefined);
    } else {
      const latitude = response.body.features[0].center[1];
      const longitude = response.body.features[0].center[0];
      const location = response.body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

const forecast = (lat, long, func) => {
  const url = `http://api.weatherstack.com/current?access_key=2dbbdf6ee6219df15f0bc77f217ef491&query=${lat},${long}&units=m`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      func(`there's an error`);
    } else if (response.body.error) {
      func(`somthin's wrong with yo location`);
    } else {
      func(
        undefined,
        `${response.body.current.weather_descriptions[0]}. the temperature is ${response.body.current.temperature} and feels like ${response.body.current.feelslike}`
      );
    }
  });
};

module.exports = {
  geocode,
  forecast,
};
