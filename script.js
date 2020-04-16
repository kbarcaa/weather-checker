
var allCities = [];

function getCityInfo(cityName){

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
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    //var uv = response.

    $("#city").text(city + ", " + country);
    $("#temp").text(tempF + " degress Farenheit");
    $("#humidity").text(humidity + "%");
    $("#wind").text(wind + "MPH");
  })
}

$("#searchList").on("click", "button", function(){
  console.log($(this).text());
  var cityName =$(this).text();
  getCityInfo(cityName);
})

function renderButtons(){
  $("#searchList").html("");
  for(i=0;i<allCities.length;i++){
    var btn = $("<button>");
    btn.text(allCities[i]);
    $("#searchList").append(btn)
  }
}


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
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    //var uv = response.

    $("#city").text(city + ", " + country);
    $("#temp").text(tempF + " degress Farenheit");
    $("#humidity").text(humidity + "%");
    $("#wind").text(wind + "MPH");
  })
  storeSearch();
})


getSearch();

function getSearch(){
  var storedSearch = JSON.parse(localStorage.getItem("cities"));
  if (storedSearch !== null){
    allCities = storedSearch;
  }
  renderButtons();
}


function storeSearch(){
  localStorage.setItem("cities", JSON.stringify(allCities));
};
























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






