// creating base variables
const searchInputBtn = $('#search-btn');
localStorage.clear()
let weatherApiUrl;
let forecastApiUrl;
const storedSearches = JSON.parse(localStorage.getItem("searches")) || [];
var searchInput;
// event listener for the search input button
searchInputBtn.on('click', function() {
  searchInput = $('#search-input').val();
  getInfo()
})
// fetching the api and applying the search input to the url
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
    // getting info from api and creating telling user that no city found if the results array is empty
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
        // changes container size
        $('#search-container').removeClass('col-12');
        $('#weather-container').removeClass('col-12');
        $('#weather-container').addClass('col-9');
        $('#search-container').addClass('col-3');
        // getting lat and lon from api call and applying to url for next api
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
// api call to get the current day weather data
function getWeather() {
  fetch(weatherApiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    // navigating the data from api call and creating a new card element on the page
    .then(locRes => {
      // adding search input to local storage and creating an anchor for recent search
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
      // logic for creating the current day weather card
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
// calling the api for the 5 day forcast
function getForecast() {
  fetch(forecastApiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    // creating a card for each of the 5 days, increasing index by 8 because the data returns an array of 40 to cover 5 days
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
// clearing current div to allow for next search item to be seen
function clear() {
  $('#weather').empty();
  $('#forecast').empty();
}
// displaying local storage of searches to the recent buttons
function recentSearches() {
  for (let i = 0; i < storedSearches.length; i++) {
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
