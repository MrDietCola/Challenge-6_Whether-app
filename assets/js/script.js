const searchInputBtn = $('#search-btn');
let weatherApiUrl;
// localStorage.clear()
let forecastApiUrl;
const storedSearches = JSON.parse(localStorage.getItem("searches")) || [];
var searchInput;

searchInputBtn.on('click', function() {
  searchInput = $('#search-input').val();
  getInfo()
})


function getInfo() {
  clear();
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
      if (locRes.length === 0) {
        const cardDiv = $('<div>')
        const cardBodyDiv = $('<div>')
        const dateH2 = $('<h2>')
        cardDiv.addClass('card w-100 g-0 m-0 gx-0')
        cardBodyDiv.addClass('card-body g-0')
        dateH2.addClass('card-title ')
        dateH2.text('No city found')
        $('#weather').append(cardDiv)
        cardDiv.append(cardBodyDiv)
        cardBodyDiv.append(dateH2)
      } else {
            const lat = locRes[0].lat;
            const lon = locRes[0].lon;
            forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=8a3a661ef5387155c9e648d48ea692f7&units=imperial&limit=6';
            weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=8a3a661ef5387155c9e648d48ea692f7&units=imperial&limit=6';
            getForecast();
            getWeather();
      }

    })
    .catch(error => console.error('Error fetching geocode:', error));
};

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
      storedSearches.unshift(locRes.name);
      localStorage.setItem("searches", (JSON.stringify(storedSearches)));
      const recentSearchBtn = $('<a>');
      recentSearchBtn.text(locRes.name)
      recentSearchBtn.addClass('btn btn-secondary w-100 my-3')
      $('#recent-searches').append(recentSearchBtn)
      recentSearchBtn.on('click', function() {
        searchInput = locRes.name;
        getInfo()
      })
      const cardDiv = $('<div>')
      const cardBodyDiv = $('<div>')
      const dateH2 = $('<h2>')
      const iconImg = $('<img>')
      const tempP = $('<p>')
      const windP = $('<p>')
      const humidityP = $('<p>')
      dateH2.text(locRes.name + ' ' + dayjs(locRes.dt_txt).format('MM/DD/YYYY'))
      iconImg.attr('src', 'http://openweathermap.org/img/w/' + locRes.weather[0].icon + '.png');
      iconImg.attr('alt', 'weather icon');
      tempP.text(locRes.main.temp + '°F')
      windP.text(locRes.wind.speed + 'm/s')
      humidityP.text(locRes.main.humidity + '%')
      cardDiv.addClass('card w-100')
      cardBodyDiv.addClass('card-body text-center')
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

function recentSearches() {
  console.log(storedSearches);
  for (let i = 0; i < storedSearches.length; i++) {
    console.log();
    const recentSearchBtn = $('<a>');
    recentSearchBtn.text(storedSearches[i])
    recentSearchBtn.addClass('btn btn-secondary w-100 my-3')
    $('#recent-searches').append(recentSearchBtn)
    recentSearchBtn.on('click', function() {
      searchInput = storedSearches[i];
      getInfo()
    })
  }
}

recentSearches()