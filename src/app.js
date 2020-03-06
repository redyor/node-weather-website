const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const app = express();
const port = process.env.PORT || 3000;
// Define path for express config
app.use(express.static(path.join(__dirname, '../public')));
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handle bar engine and vies location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Redyor Elrojo'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Redyor Elrojo'
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This page is suppose to help you!',
    name: 'Redyor Elrojo'
  });
});

// Weather Api
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'you must provide an address' });
  }
  geocode(req.query.address, (error, { lat, long, place_name } = {}) => {
    if (error) {
      return res.send({ error });
    }
    //   console.log('Data:' + JSON.stringify(data));

    weather(lat, long, (error, weatherdata) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: weatherdata,
        location: place_name,
        address: req.query.address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Article Not found!',
    name: 'Redyor Elrojo'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page Not found!',
    name: 'Redyor Elrojo'
  });
});

app.listen(port, () => {
  console.log('Server is up on port : 3000');
});
