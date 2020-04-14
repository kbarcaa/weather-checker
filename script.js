var searchText = document.getElementById("searchText")
var searchButton = document.getElementById("searchButton")
var ulTag = document.getElementById("ul")



searchButton.addEventListener("click", function(){
  var liTag = document.createElement("li")
  var listButtons = document.createElement("button")
  listButtons.textContent = searchText.value
  
  liTag.appendChild(listButtons)
  ulTag.appendChild(liTag)
  
  
  storeItem();
})

function storeItem(){
  localStorage.setItem("city", searchText.value)
}

getItem()
function getItem(){
  var storedSearch = localStorage.getItem("city")
  
}


// init();

// function renderCity (){
//   // Clearing searches
//   ulTag.innerHTML = "";

//   // rending a new <li> for each search
//   for (var i=0; i<searches.length; i++){
//     var searches = searches[i];

//     var liTag = document.createElement("li");
//     var listButtons = document.createElement("button");
//     listButtons.textContent = searchText.value;
//     liTag.setAttribute("data-index", i)
//     liTag.appendChild(listButtons);
//     ulTag.appendChild(liTag)
//   }
// }
// function init(){
//   var storedSearches=JSON.parse(localStorage.getItem("cities"));
//   if (storedSearches !== null){
//     searches = storedSearches;
//   }
//   renderCity();
// }

// function storeCity(){
//   localStorage.setItem("cities", JSON.stringify(searches));
// }

// searchForm.addEventListener("submit", function(){
//   var search = searchText.value.trim();

//   if(search === ""){
//     return;
//   }
//   searches.push(search);
//   searchText.value = "";

//   storeCity();
//   renderCity();
// })


// var cityHistory = searchText.value.trim()
// localStorage.setItem("city", cityHistory);
// var lastUser = JSON.parse(localStorage.getItem("city"))
// liTag.textContent = lastUser.cityHistory


// getItems();
// function getItems(){
//   var storedItems = localStorage.getItem("city");
  
//   if (storedItems !== null && storedItems.length){
//     storedCity = JSON.parse(JSON.stringify(storedItems));
//   }
//   if (storedCity.length){
//     liTag.textContent = userInput;
//   }

// };
