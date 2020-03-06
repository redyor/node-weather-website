const request = require('request');
const weather = (lat, long, callback) => {
  const url =
    'https://api.darksky.net/forecast/ffbc7c8efcb942ee5820572b02ece70a/' +
    lat +
    ',' +
    long;
  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find Location , API Error!', undefined);
    } else {
      const currently = body.currently;
      //console.log(body.daily.data[0]);
      callback(
        undefined,
        body.daily.data[0].summary +
          ' it is currently ' +
          currently.temperature +
          ' degree with ' +
          currently.precipProbability +
          ' % of rain. Hight :' +
          body.daily.data[0].temperatureHigh +
          ' Low : ' +
          body.daily.data[0].temperatureLow
      );
    }
  });
};
module.exports = weather;
