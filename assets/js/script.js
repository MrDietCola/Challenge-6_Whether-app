const searchInputBtn = $('#search-btn');
let weatherApiUrl;
let forecastApiUrl;
const storedSearches = JSON.parse(localStorage.getItem("searches")) || [];

searchInputBtn.on('click', function() {
  clear();
  const searchInput = $('#search-input').val();
  console.log(searchInput);
  const geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + ',ISO3166&limit=5&appid=8a3a661ef5387155c9e648d48ea692f7';
  
  fetch(geocodeApiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(locRes => {
      console.log(locRes);
      if (locRes.length === 1) {
        const cardDiv = $('<div>')
        const cardBodyDiv = $('<div>')
        const dateH2 = $('<h2>')
        cardDiv.addClass('card w-100 g-0 m-0 gx-0')
        cardBodyDiv.addClass('card-body g-0')
        dateH2.addClass('card-title')
        dateH2.text('No city found')
        $('#weather').append(cardDiv)
        cardDiv.append(cardBodyDiv)
        cardBodyDiv.append(dateH2)
      } else {
        for (let i = 0; i < locRes.length; i++) {
          if (locRes[i].country === 'US') {
            const lat = locRes[i].lat;
            const lon = locRes[i].lon;
            console.log(lat + '   ' + lon);
            forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=8a3a661ef5387155c9e648d48ea692f7&units=imperial&limit=6';
            weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=8a3a661ef5387155c9e648d48ea692f7&units=imperial&limit=6';
            getForecast();
            getWeather();
          }
        }
      }
    })
    .catch(error => console.error('Error fetching geocode:', error));
});

function getWeather() {
  fetch(weatherApiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(locRes => {
      console.log(locRes);
      const cardDiv = $('<div>')
      const cardBodyDiv = $('<div>')
      const dateH2 = $('<h2>')
      const iconImg = $('<img>')
      const tempP = $('<p>')
      const windP = $('<p>')
      const humidityP = $('<p>')
      dateH2.text(locRes.name + ' ' + dayjs(locRes.dt_txt).format('MM/DD/YYYY'))
      iconImg.attr('src', 'http://openweathermap.org/img/w/' + locRes.weather[0].icon + '.png');
      console.log(iconImg.attr('src'));
      iconImg.attr('alt', 'weather icon');
      tempP.text(locRes.main.temp + '°F')
      windP.text(locRes.wind.speed + 'm/s')
      humidityP.text(locRes.main.humidity + '%')
      cardDiv.addClass('card w-100')
      cardBodyDiv.addClass('card-body')
      dateH2.addClass('card-title')
      tempP.addClass('card-text')
      windP.addClass('card-text')
      humidityP.addClass('card-text')
      $('#weather').append(cardDiv)
      cardDiv.append(cardBodyDiv)
      cardBodyDiv.append(dateH2, iconImg, tempP, windP, humidityP);
    })
    .catch(error => console.error('Error fetching weather:', error));
}

function getForecast() {
  fetch(forecastApiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(locRes => {
      console.log(locRes.list);
      for (let i = 0; i < locRes.list.length; i += 8) {
        const cardDiv = $('<div>')
        const cardBodyDiv = $('<div>')
        const dateH2 = $('<h2>')
        const iconImg = $('<img>')
        const tempP = $('<p>')
        const windP = $('<p>')
        const humidityP = $('<p>')
        dateH2.text(dayjs(locRes.list[i].dt_txt).format('MM/DD/YYYY'))
        iconImg.attr('src', 'http://openweathermap.org/img/w/' + locRes.list[i].weather[0].icon + '.png');
        console.log(iconImg.attr('src'));
        iconImg.attr('alt', 'weather icon');
        tempP.text(locRes.list[i].main.temp + '°F')
        windP.text(locRes.list[i].wind.speed + 'm/s')
        humidityP.text(locRes.list[i].main.humidity + '%')
        cardDiv.addClass('card col mar-0')
        cardBodyDiv.addClass('card-body mar-0')
        dateH2.addClass('card-title')
        tempP.addClass('card-text')
        windP.addClass('card-text')
        humidityP.addClass('card-text')
        $('#forecast').append(cardDiv)
        cardDiv.append(cardBodyDiv)
        cardBodyDiv.append(dateH2, iconImg, tempP, windP, humidityP);
      }
    })
    .catch(error => console.error('Error fetching forecast:', error));
}

function clear() {
  $('#weather').empty();
  $('#forecast').empty();
}