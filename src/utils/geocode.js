const request = require('request');
const geocode = (address, callback) => {
  const url1 =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoicmVkeW9yIiwiYSI6ImNrN2UwMnMxdzBrbjczbXB0YTdleDlpemkifQ.XdBO7w0xPjVSKsdQ7M2WKg&limit=1';
  request({ url: url1, json: true }, (err, response) => {
    if (err) {
      callback('Unable to connect to weather services', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location please try an other search', undefined);
    } else {
      const lat = response.body.features[0].center[1];
      const long = response.body.features[0].center[0];
      const place_name = response.body.features[0].place_name;
      callback(undefined, {
        lat,
        long,
        place_name
      });
    }
  });
};
module.exports = geocode;
