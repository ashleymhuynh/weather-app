//create a function to display current time
function getDate() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

let currentTime = document.querySelector("#currentdate");
currentTime.innerHTML = getDate();

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#searched-city");
  let currentCity = document.querySelector("#current-city");
  //display city name
  currentCity.innerHTML = inputCity.value;
  fetchData(inputCity.value);
  //cler input value
  inputCity.value = "";
}

async function fetchData(inputCity) {
  const apiKey = "650fb9db077f61ca16fc2d3df93a734e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=imperial`;
  try {
    const response = await axios.get(apiUrl);
    const cityInfo = response.data;
    console.log(cityInfo);
    displayTemperature(cityInfo);
  } catch (error) {
    console.error(error.message);
  }
}

function displayTemperature(cityInfo) {
  let descriptionElement = document.getElementById("weather-description");
  let iconElement = document.getElementById("weather-icon");
  let highTempElement = document.getElementById("currenthightemp");
  let lowTempElement = document.getElementById("currentlowtemp");

  let description = cityInfo.weather[0].description;
  descriptionElement.innerHTML = description;
  let icon = cityInfo.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", description);

  let highTemp = Math.round(cityInfo.main.temp_max);
  let lowTemp = Math.round(cityInfo.main.temp_min);
  highTempElement.innerHTML = `${highTemp}º`;
  lowTempElement.innerHTML = `${lowTemp}º`;
}

fetchData("Los Angeles");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);