// console.log('test');

// function searchApi(query, format) {
//   var locQueryUrl = 'https://www.loc.gov/search/?fo=json';

//   if (format) {
//     locQueryUrl = 'https://www.loc.gov/' + format + '/?fo=json';
//   }

//   locQueryUrl = locQueryUrl + '&q=' + query;

//   fetch(locQueryUrl)
//     .then(function (response) {
//       if (!response.ok) {
//         throw response.json();
//       }

//       return response.json();
//     })
//     .then(function (locRes) {
//       // write query to page so user knows what they are viewing
//       resultTextEl.textContent = locRes.search.query;

//       console.log(locRes);

//       if (!locRes.results.length) {
//         console.log('No results found!');
//         resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
//       } else {
//         resultContentEl.textContent = '';
//         for (var i = 0; i < locRes.results.length; i++) {
//           printResults(locRes.results[i]);
//         }
//       }
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }
var searchInputBtn = $('#search-btn')


// var geocodeApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'

// var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

// fetch(geocodeApiUrl)
var weatherApiUrl;

// searchInputBtn.on('click', function() {
//   var searchInput = $('#search-input').val()
//   console.log(searchInput);
//   var geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + ',ISO3166&limit=5&appid=8a3a661ef5387155c9e648d48ea692f7';
//   var lat;
//   var lon;
  // fetch(geocodeApiUrl)
  // .then(function (response) {
  //   if (!response.ok) {
  //           throw response.json();
  //         }
  //         // console.log(response);
  //         return response.json();
  //       })
  //       .then(function (locRes) {
  //               // write query to page so user knows what they are viewing
  //               // resultTextEl.textContent = locRes.search.query;
          
  //               console.log(locRes);
          
  //               // if (!locRes.results.length) {
  //                 console.log('No results found!');
  //                 // resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
  //               // } else {
  //                 // resultContentEl.textContent = '';
  //                 for (var i = 0; i < locRes.results.length; i++) {
  //                   // printResults(locRes.results[i]);
  //                   console.log(locRes.results[i]);
  //                   if (locRes.results[i].country === 'US') {
  //                     lat = locRes.results[i].lat
  //                     lon = locRes.results[i].lon
  //                     console.log(lat + '   ' + lon);
  //                   }
                    
  //                 }
                // }
              // })
              // .catch(function (error) {
              //   console.error(error);
              // });
              // .then(function (response) {
              //   if (!response.ok) {
              //     throw response.json();
              //   }
              //   // console.log(response);
              //   return response.json();
              // })
    
              // var weatherApiUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=8a3a661ef5387155c9e648d48ea692f7';
              // fetch(weatherApiUrl)
              // .then(function (locRes) {
              //         // write query to page so user knows what they are viewing
              //         // resultTextEl.textContent = locRes.search.query;
                
              //         console.log(locRes);
                
              //         if (!locRes.results.length) {
              //           console.log('No results found!');
              //           // resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
              //         } else {
              //           // resultContentEl.textContent = '';
              //           for (var i = 0; i < locRes.results.length; i++) {
              //             // printResults(locRes.results[i]);
              //             console.log(locRes.results[i]);
              //           }
              //         }
              //       })
              //       // .catch(function (error) {
              //       //   console.error(error);
              //       // });      
// })






// fetch(geocodeApiUrl)
//   .then(function (response) {
//    if (response.ok) {
//      return response.json();
//     }
//   })
//   .then(function (locRes) {
//     // console.log(locRes);
//     for (var i = 0; i < locRes.length; i++) {
//       // printResults(locRes.results[i]);
//       if (locRes[i].country === 'US') {
//         lat = locRes[i].lat
//         lon = locRes[i].lon
//         console.log(lat + '   ' + lon);
//         weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=8a3a661ef5387155c9e648d48ea692f7&units=imperial&limit=6';
//         // console.log(weatherApiUrl);
//         getWeather()
//       }
//     }
//   })

//   // weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=8a3a661ef5387155c9e648d48ea692f7';
//   // fetch(weatherApiUrl)
//   //   .then(function (response) {
//   //   if (response.ok) {
//   //     return response.json();
//   //     }
//   //   })
//   //   .then(function (locRes) {
//   //     console.log(locRes);
//   //   })
//   // getWeather()
// })

// var temps = [];
// function getWeather() {
//   // console.log('checked');
//   fetch(weatherApiUrl)
//     .then(function (response) {
//     if (response.ok) {
//       return response.json();
//       }
//     })
//     .then(function (locRes) {
//       console.log(locRes);
//       // for (var i = 0; i < locRes.list.length; i+=8) {
//       //   console.log(locRes.list[i].main.temp);
//       //   if ($('#day-1'))
//       //   // temps.push([i, locRes.list[i].main.temp])
//       // }
//       // console.log(temps);
//     })
// }

// $('.temp').each(function () {
  // if ($(this).text() === "") {
    // $(this).text(i)
    // console.log("temp");
  // }
  // console.log('temp');
// })

// var dayDisplayed = [false, false, false, false, false, false]
//  $('.temp').each(function () {
//   if (this.text() = ""){
//     $('.temp').text(i)
//   }
//  })




searchInputBtn.on('click', function() {
  var searchInput = $('#search-input').val()
  console.log(searchInput);
  var geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + ',ISO3166&limit=5&appid=8a3a661ef5387155c9e648d48ea692f7';
  var lat;
  var lon;
  var days = [
  {
    date: '',
    condition: [],
    temps: [],
    wind: [],
    humidity: []
  },
  {
    question: "What is the tiny piece at the end of a shoelace called?",
    choices: ["Aglet", "Turne", "Bean", "Stitch"],
    answer: "Aglet"
  },
  {
    question: "What year did Facebook first launch?",
    choices: ["2008", "2006", "2004", "2002"],
    answer: "text 32"
  },
  {
    question: "What was the coffee shop called in the hit TV show Friends",
    choices: ["Central Park", "Park Central", "Central Perk", "Downtown Coffee"],
    answer: "Central Perk"
  }
  ]
    
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
      console.log(locRes);
    })
}