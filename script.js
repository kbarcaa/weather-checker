var allCities = [];

// function to call on information
function getCityInfo(cityName){

  var APIkey = "b328ccab8d372c776afbedb2b4434e8c"
  var oneDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
  
  $.ajax({
    url: oneDayURL,
    method: "GET"
  }).then(function(response){

    var city = response.name;
    var country = response.sys.country;
    var tempK = response.main.temp;
    var tempF = (parseFloat(tempK) - 273.15)*1.80+32;
    tempF = tempF.toFixed(2);
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    
    $("#city").text(city + ", " + country);
    $("#temp").text(tempF + " degress Farenheit");
    $("#humidity").text(humidity + "%");
    $("#wind").text(wind + "MPH");

    // creating a nesting ajax to call upon independent UV API.
    var uvURL =  "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(response){
      var uv = response.value;
      $("#uv").text(uv);

      // giving <uv span> color according to value number
      if(response.value >= 10){
        $("#uv").css("background-color", "red")
      } else if(response.value < 10 && response.value > 6) {
        $("#uv").css("background-color", "yellow")
      } else {
        $("#uv").css("background-color", "green")
      }
    })
  })
}

// function to render buttons with user input City name
function renderButtons(){
  $("#searchList").html("");
  for(i=0;i<allCities.length;i++){
    var btn = $("<button>");
    btn.text(allCities[i]);
    $("#searchList").append(btn)
  }
}

// function initiates on Submitting of City from user
// it will display city information on the page
$("#searchCity").on("click", function(event){

  event.preventDefault();
  var cityName = $("#cityInput").val();
  allCities.push(cityName);
  renderButtons();
  
  var APIkey = "b328ccab8d372c776afbedb2b4434e8c"
  var oneDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
  
  $.ajax({
    url: oneDayURL,
    method: "GET"
  }).then(function(response){
    console.log(oneDayURL);
    console.log(response);
    var city = response.name;
    var country = response.sys.country;
    var tempK = response.main.temp;
    var tempF = (parseFloat(tempK) - 273.15)*1.80+32;
    tempF = tempF.toFixed(2)
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
  
    $("#city").text(city + ", " + country);
    $("#temp").text(tempF + " degress Farenheit");
    $("#humidity").text(humidity + "%");
    $("#wind").text(wind + "MPH");

    // creating a nesting ajax to call upon independent UV API.
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(response){
      var uv = response.value;
      $("#uv").text(uv);

      // giving <uv span> color according to value number
      if(response.value >= 10){
        $("#uv").css("background-color", "red")
      } else if(response.value < 10 && response.value > 6) {
        $("#uv").css("background-color", "yellow")
      } else {
        $("#uv").css("background-color", "green")
      }
    })

  })


  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey;
  
  $.ajax({
    url: fiveDayURL,
    method: "GET"
  }).then(function(response2){
    console.log(fiveDayURL);
    console.log(response2);
    console.log(response2.list)
    // console.log(fiveDayArr)
    renderFiveDays(response2);
  })

  storeSearch();
})


// function to display information when city-named-buttons are clicked.
$("#searchList").on("click", "button", function(){
  console.log($(this).text());
  var cityName =$(this).text();
  getCityInfo(cityName);

  var APIkey = "b328ccab8d372c776afbedb2b4434e8c"
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey;
  
  $.ajax({
    url: fiveDayURL,
    method: "GET"
  }).then(function(response2){
    // console.log(fiveDayArr)
    renderFiveDays(response2);
  })
})

// function to call on five day information
function renderFiveDays(response2){

  var fiveDayArr = getForecastForEachDay(response2.list);
  console.log(fiveDayArr)

  $("#fiveDays").text("");


  for(i=0; i<fiveDayArr.length; i++){

    var divTag = $("<div>")
    divTag.attr("id", "fiveDayBox")

    var temp = $("<h3>")
    var tempK = fiveDayArr[i].main.temp;
    var tempF = (parseFloat(tempK) - 273.15)*1.80+32;
    tempF = tempF.toFixed(2)
    temp.text("Temp: " + tempF)

    var date = $("<h4>")
    date.text("Date: " + fiveDayArr[i].dt_txt.split("")[0]);
    
    divTag.append(date)
    divTag.append(temp)
    
    $("#fiveDays").append(divTag)

  }
};
//function to create an array of 5 to use in other functions
function getForecastForEachDay(listOfForecasts){
  var forecastArray=[];
  var currentDate = "";
  for(var i=0; i<listOfForecasts.length; i++){
    // We want to capture one weather object for each day in the list. Once we've captured that
    // object, we can ignore all other objects for the same day
    var dateOfListItem = listOfForecasts[i].dt_txt.split(" ")[0];
    if( dateOfListItem !== currentDate ){
      // We need to extract just the date part and ignore the time
      currentDate = dateOfListItem;
      // Push this weather object to the forecasts array
      if( forecastArray.length < 5 ){
        forecastArray.push(listOfForecasts[i]);
      }
    }
  }
  return forecastArray;
}

// calling on stored items when page refreshed
getSearch();
function getSearch(){
  var storedSearch = JSON.parse(localStorage.getItem("cities"));
  if(storedSearch !==null){
    allCities = storedSearch;
  }
renderButtons();
}

// function to store user's search
function storeSearch(){
  localStorage.setItem("cities", JSON.stringify(allCities));
}






///////////////////////////////////

// function getFiveDay(){

//   var cityName = $("#cityInput").val();

//   var APIkey = "b328ccab8d372c776afbedb2b4434e8c"
//   var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey;
  
//   $.ajax({
//     url: fiveDayURL,
//     method: "GET"
//   }).then(function(response2){
//     console.log(fiveDayURL);
//     console.log(response2);
//     console.log(getForecastForEachDay(response2.list))

//     var fiveDayArr = getForecastForEachDay(response2.list);
    

//     // $("#monday").text(response2.list[0].main.temp)
//     // $("#tuesday").text(response2.list[1].main.temp)
//     // $("#wednesday").text(response2.list[2].main.temp)
//     // $("#thursday").text(response2.list[3].main.temp)
//     // $("#friday").text(response2.list[4].main.temp)

//   })
// }

// $("#fiveDay").text("");

    // for (i=0; i<fiveDayArr.length; i++){

    //   var div = $("<div>");
    //   var date = $("<h3>");
    //   date.text("Date: " + fiveDayArr[i].dt_txt.split(" ")[0])

    //   var tempK = response2.main.temp;
    //   var tempF = (parseFloat(tempK) - 273.15)*1.80+32;
    //   tempF = tempF.toFixed(2)
    //   tempF.text("Temp: " + tempF)

    //   div.append(date).append(tempF)
    //   $("#fiveDay").append(div)

    // }


/*
  The 5-Day Forecast actually breaks down each day's forecast into hour blocks of 3, which will be 
  really hard to parse. The function below will solve the problem: 
    1) Create a global variable called forecastArray
    2) After you make your 5-Day Forecast API call, call this function and pass in the list of weather objects
        (response.list)
    3. Once this function is done, your global forecast array will be populated.
    4. Then loop through that array to create the 5 blue blocks at the bottom
    5. You're welcome.  :)
  */ 

// var searchInput = document.querySelector("#searchText");
// var searchForm = document.querySelector("#searchForm");
// var searchList = document.querySelector("#searchList");
// var searches = [];

// init();

// function renderSearch(){

//   searchList.innerHTML = "";


//   for(var i=0; i<searches.length;i++){
//     var search = searches[i];
//     var li = document.createElement("li");
//     var searchAsButtons = document.createElement("button");
//     searchAsButtons.textContent = search
//     li.appendChild(searchAsButtons)
//     //li.textContent = search;
//     li.setAttribute("data-index", i);
//     searchList.append(li)
//   }
// }

// function init(){
//   var storedSearch = JSON.parse(localStorage.getItem("cities"));

//   if(storedSearch !==null){
//     searches = storedSearch;
//   }
//   renderSearch()
// }

// function storeSearch (){
//   localStorage.setItem("cities", JSON.stringify(searches));
// }

// searchForm.addEventListener("submit", function(event){
//   event.preventDefault();

//   var searchText = searchInput.value.trim();

//   if( searchText === ""){
//     return;
//   }
//   searches.push(searchText);
//   searchInput.value = "";

//   storeSearch();
//   renderSearch();
//   oneDayWeather();
// })


// // WEATHER STUFF 
// // var cityName = search;

// function oneDayWeather(){

//   var cityName = searches
//   var APIkey = "b328ccab8d372c776afbedb2b4434e8c"
//   var oneDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
//   // var oneDayURL = "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=" + APIkey;
  
  
//   $.ajax({
//     url: oneDayURL,
//     method: "GET"
//   }).then(function(response){
//     console.log(oneDayURL);
//     console.log(response);
  
//   var city = response.name;
//   var country = response.sys.country;
//   var tempK = response.main.temp;
//   var tempF = (parseFloat(tempK) - 273.15)*1.80+32;
//   var humidity = response.main.humidity;
//   var wind = response.wind.speed;
//   //var uv = response.
  
//   $("#city").text(city + ", " + country);
//   $("#temp").text(tempF + " degress Farenheit");
//   $("#humidity").text(humidity + "%");
//   $("#wind").text(wind + "MPH");
//   })


// }






