const getWeather = address => {
  const txtlocation = document.querySelector('.location');
  const txtforecast = document.querySelector('.forecast');
  const txterror = document.querySelector('.error');
  txtlocation.textContent = 'Loading...';
  txtforecast.textContent = '';
  txterror.textContent = '';
  var opts = {
    method: 'GET',
    headers: {}
  };
  fetch('/weather?address=' + address, opts).then(function(response) {
    response.json().then(function(body) {
      if (body.error) {
        console.log(body.error);
        txtlocation.textContent = '';
        txterror.textContent = body.error;
      } else {
        console.log(body.forecast);
        console.log(body.location);
        txtlocation.textContent = body.location;
        txtforecast.textContent = body.forecast;
      }
    });
  });
};

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const address = searchInput.value;
  console.log(address);
  getWeather(address);
});
