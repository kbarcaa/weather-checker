var searchInput = document.querySelector("#searchText");
var searchForm = document.querySelector("#searchForm");
var searchList = document.querySelector("#searchList");
var searches = [];

init();

function renderSearch(){

  searchList.innerHTML = "";


  for(var i=0; i<searches.length;i++){
    var search = searches[i];
    var li = document.createElement("li");
    var searchAsButtons = document.createElement("button");
    searchAsButtons.textContent = search
    li.appendChild(searchAsButtons)
    //li.textContent = search;
    li.setAttribute("data-index", i);
    searchList.append(li)
  }
}

function init(){
  var storedSearch = JSON.parse(localStorage.getItem("cities"));

  if(storedSearch !==null){
    searches = storedSearch;
  }
  renderSearch()
}

function storeSearch (){
  localStorage.setItem("cities", JSON.stringify(searches));
}

searchForm.addEventListener("submit", function(event){
  event.preventDefault();

  var searchText = searchInput.value.trim();

  if( searchText === ""){
    return;
  }
  searches.push(searchText);
  searchInput.value = "";

  storeSearch();
  renderSearch();
})
