// declaring vairables
let allCities = [];
var someDate = new Date();
var dd = someDate.getDate();
var mm = someDate.getMonth() + 1;
var y = someDate.getFullYear();
var displayDate = mm + '.' + dd + '.' + y;

//to retrieve any previously stored searches
getSearch();

// function to call on information
function getCityInfo(cityName) {
  var APIkey = 'b328ccab8d372c776afbedb2b4434e8c';
  var oneDayURL =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityName +
    '&appid=' +
    APIkey;

  $.ajax({
    url: oneDayURL,
    method: 'GET',
  }).then(function (response) {
    // console.log(response);
    var city = response.name;
    var country = response.sys.country;
    var tempK = response.main.temp;
    var tempF = (parseFloat(tempK) - 273.15) * 1.8 + 32;
    tempF = tempF.toFixed(2);
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    var icon = response.weather[0].icon;

    $('#iconHere').attr(
      'src',
      'http://openweathermap.org/img/wn/' + icon + '@2x.png'
    );
    $('#iconHere').append(icon);
    $('#city').text(city + ', ' + country + ' - ' + displayDate);
    $('#temp').text(tempF + ' °F');
    $('#humidity').text(humidity + '%');
    $('#wind').text(wind + ' MPH');

    //placed here so that spelling mistake search result wont be pushed to main array 
    allCities.push(cityName);
    renderButtons();
    
    // creating a nesting ajax to call upon independent UV API
    var uvURL =
      'https://api.openweathermap.org/data/2.5/uvi?appid=' +
      APIkey +
      '&lat=' +
      response.coord.lat +
      '&lon=' +
      response.coord.lon;
    $.ajax({
      url: uvURL,
      method: 'GET',
    }).then(function (response) {
      var uv = response.value;
      $('#uv').text(uv);
      // giving <uv span> color according to value number
      if (response.value >= 10) {
        $('#uv').css('background-color', 'red');
      } else if (response.value < 10 && response.value > 6) {
        $('#uv').css('background-color', 'yellow');
      } else {
        $('#uv').css('background-color', 'green');
      }
    });
  }).catch(()=>{
    //to alert if there is spelling mistake in search
    alert('check spelling')
  });

  var fiveDayURL =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    cityName +
    '&appid=' +
    APIkey;

  $.ajax({
    url: fiveDayURL,
    method: 'GET',
  }).then(function (response2) {
    renderFiveDays(response2);
  });

  
}

// function to render buttons with user input City name
function renderButtons() {
  $('#searchList').html(' ');
   allCities = [...new Set(allCities)]
  //creating, setting, & appending button text as from list items in []
  for (i = 0; i < allCities.length; i++) {
    // var btn = $('<button>');
    // btn.text(allCities[i]);
    var btn = `<button id=btn>${allCities[i]}</button>`
    var removeBtn = `<button data-index='${i}' id='iconTrashCan'><i class='fa fa-trash'></i></button>`;
    $('#searchList').append(btn);
    $('#searchList').append(removeBtn);
  }
}
//to clear out search bar post submit
function resetSearchBar() {
  $('#cityInput').val('');
}

// function initiates on Submitting of City from user
// it will display city information on the page
$('#searchCity').on('click', function (event) {
  event.preventDefault();
  var cityName = $('#cityInput').val().toLowerCase();
  
  resetSearchBar();
  getCityInfo(cityName);
  storeSearch();
});

// remove button function
$('#searchList').on('click', '#iconTrashCan', function (event) {
  //getting data-index to splice from main array
  var element = event.target;
  var index = element.parentElement.getAttribute('data-index');
  allCities.splice(index, 1);
  //saving new array to local storage and rendering buttons from new array
  storeSearch();
  renderButtons();
});
// function to display information when city-named-buttons are clicked.
$('#searchList').on('click', '#btn', function () {
  // console.log($(this).text());
  var cityName = $(this).text();
  getCityInfo(cityName);
});

// function to call on five day information
function renderFiveDays(response2) {
  var fiveDayArr = getForecastForEachDay(response2.list);
  
  $('#fiveDays').text('');

  for (i = 0; i < fiveDayArr.length; i++) {
    var divTag = $('<div>');
    divTag.attr('id', 'fiveDayBox');

    var temp = $('<h5>');
    var tempK = fiveDayArr[i].main.temp;
    var tempF = (parseFloat(tempK) - 273.15) * 1.8 + 32;
    tempF = tempF.toFixed(2);
    temp.text(tempF + ' °F');

    var date = $('<h4>');
    date.text(fiveDayArr[i].dt_txt.split(' ')[0]);

    var hum = $('<h5>');
    hum.text('Humidity: ' + fiveDayArr[i].main.humidity + '%');

    var icon = $('<img>');
    icon.attr(
      'src',
      'http://openweathermap.org/img/wn/' +
        fiveDayArr[i].weather[0].icon +
        '@2x.png'
    );

    divTag.append(date);
    divTag.append(temp);
    divTag.append(hum);
    divTag.append(icon);
    $('#fiveDays').append(divTag);
  }
}
//function to create an array of 5 to use in other functions
function getForecastForEachDay(listOfForecasts) {
  var forecastArray = [];
  var currentDate = '';
  for (var i = 0; i < listOfForecasts.length; i++) {
    // We want to capture one weather object for each day in the list. Once we've captured that
    // object, we can ignore all other objects for the same day
    var dateOfListItem = listOfForecasts[i].dt_txt.split(' ')[0];
    if (dateOfListItem !== currentDate) {
      // We need to extract just the date part and ignore the time
      currentDate = dateOfListItem;
      // Push this weather object to the forecasts array
      if (forecastArray.length < 5) {
        forecastArray.push(listOfForecasts[i]);
      }
    }
  }
  return forecastArray;
}

// calling on stored items when page refreshed
function getSearch() {
  var storedSearch = JSON.parse(localStorage.getItem('cities'));
  if (storedSearch !== null) {
    allCities = storedSearch;
  }
  renderButtons();
}

// function to store user's search
function storeSearch() {
  localStorage.setItem('cities', JSON.stringify(allCities));
}
