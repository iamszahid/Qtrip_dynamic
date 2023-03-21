import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("from init()");
  console.log(config.backendEndpoint);
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
   const urlObj=await fetch(`${config.backendEndpoint}/cities`);
   const cityObj=await urlObj.json();
   return cityObj;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  let divElement=document.getElementById('data');
  let innerElement=document.createElement('div');
  innerElement.setAttribute('class',"col-6 col-sm-6 col-lg-3 mb-4");
  innerElement.innerHTML=`<a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
  <img src="${image}" class="tile-img" alt="${city} img" />
  <div class="tile-text text-center">
  <h6 class="">${city}</h6>
  <p class="">${description}</p>
</div>
</div>
</a>`
divElement.append(innerElement);
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
}

export { init, fetchCities, addCityToDOM };
