import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const id=search.slice(6);
  return id;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const urlObj=await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const cityObj=await urlObj.json();
    return cityObj;
  }
  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let divElement=document.getElementById('data');
  adventures.forEach(advObj=>{
    let innerElement=document.createElement('div');
    innerElement.setAttribute('class',"col-sm-6 col-md-6 col-lg-3 mb-3")
   innerElement.innerHTML=`
  <a href="detail/?adventure=${advObj.id}" id=${advObj.id}>
  <div class="card activity-card">
  <div class='category-banner'>${advObj.category}</div>
  <img src="${advObj.image}" alt=${advObj.name}>
  <div class="d-flex justify-content-between w-100 p-3 pb-0">
    <h5 class="card-text">${advObj.name}</h5>
    <p class="card-text">₹${advObj.costPerHead}</p>
  </div>
  <div class="d-flex justify-content-between w-100 p-3 pb-0">
    <h5 class="card-text">Duration</h5>
    <p class="card-text">${advObj.duration} Hours</p>
  </div>
  </div>
  </a>`
divElement.append(innerElement);
  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let durObj=[];
  list.forEach(listObj =>{
    if(listObj.duration >=low && listObj.duration <=high){
      durObj.push(listObj);
    }
  })
  return durObj;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together
  let filterObj=[];
  list.forEach(listObj =>{
    categoryList.forEach(catObj =>{
      if(catObj==listObj.category){
        filterObj.push(listObj)
      }
    })
  })
  return filterObj;
}
function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs
  if(filters.category.length >0){
    list=filterByCategory(list,filters.category);
  }
  if(filters.duration != ""){
    if(filters.duration=='12+'){
      list=filterByDuration(list,'12','10000');
    }
    let dur=filters.duration.split("-");
    list=filterByDuration(list,dur[0],dur[1]);
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs
  let a=JSON.parse(window.localStorage.getItem('filters'));
  return a;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  for(let i=0;i<filters["category"].length;i++){
    let pElement=document.createElement("p");
    pElement.className="category-filter";
    pElement.innerText=filters["category"][i];
    document.getElementById("category-list").appendChild(pElement);
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
