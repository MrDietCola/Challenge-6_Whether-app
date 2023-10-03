
searchInputBtn.on('click', function() {
  var searchInput = $('#search-input').val()
  console.log(searchInput);
  var geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + ',ISO3166&limit=5&appid=8a3a661ef5387155c9e648d48ea692f7';
  var lat;
  var lon;
    
  fetch(geocodeApiUrl)
    .then(function (response) {
    if (response.ok) {
      return response.json();
      }
    })
    .then(function (locRes) {
      console.log(locRes);
      for (var i = 0; i < locRes.length; i++) {
        // printResults(locRes.results[i]);
        if (locRes[i].country === 'US') {
          lat = locRes[i].lat
          lon = locRes[i].lon
          console.log(lat + '   ' + lon);
          weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=8a3a661ef5387155c9e648d48ea692f7&units=imperial&limit=6';
          // console.log(weatherApiUrl);
          getWeather()
        }
      }
    })
})

var temps = [];
function getWeather() {
  fetch(weatherApiUrl)
    .then(function (response) {
    if (response.ok) {
      return response.json();
      }
    })
    .then(function (locRes) {
      console.log(locRes.list);
      for (var i = 0; i < locRes.list.length; i+=8) {
        console.log(dayjs(locRes.list[i].dt_txt).format('MM/DD/YYYY') + ' ' + locRes.list[i].main.temp + ' ' + locRes.list[i].weather[0].icon + ' ' + locRes.list[i].main.humidity + ' ' + locRes.list[i].wind.speed);
        // create elements for weather day card
        var cardDiv = $('<div>')
        var cardBodyDiv = $('<div>')
        var dateH2 = $('<h2>')
        var iconImg = $('<img>')
        var tempP = $('<p>')
        var windP = $('<p>')
        var humidityP = $('<p>')
        // create text value for each element
        dateH2.text(dayjs(locRes.list[i].dt_txt).format('MM/DD/YYYY'))
        iconImg.src = 'http://openweathermap.org/img/w/' + locRes.list[i].weather[0].icon + '.png';
        console.log(iconImg.src);
        iconImg.alt = 'weather icon';
        tempP.text(locRes.list[i].main.temp + '°F')
        windP.text(locRes.list[i].wind.speed + 'm/s')
        humidityP.text(locRes.list[i].main.humidity + '%')
        // add classes to each element
        cardDiv.addClass('card col g-0 m-0 gx-0')
        cardBodyDiv.addClass('card-body')
        dateH2.addClass('card-title')
        tempP.addClass('card-text')
        windP.addClass('card-text')
        humidityP.addClass('card-text')
        // append elments to page
        $('#forecast').append(cardDiv)
        cardDiv.append(cardBodyDiv)
        cardBodyDiv.append(dateH2, iconImg, tempP, windP, humidityP)

      }
  })
}


// var dayData = data.list[i];
// var date = dayjs(dayData.dt_txt).format('MM/DD/YYYY');