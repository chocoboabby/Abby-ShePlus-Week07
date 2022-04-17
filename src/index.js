let now = new Date();

function formatDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = days[today.getDay()];
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${date} ${hours}:${minutes}`;

  return time;
}

let timeAndDate = document.querySelector("#time-date");
timeAndDate.innerHTML = formatDate(now);

function displayWeather(response) {
  console.log(response.data);
  document.querySelector(
    "#city-name"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "76bd1c0ff8311a8d7f2ae10658044361";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayWeather);
}

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let submitButton = document.querySelector("#city-form");
submitButton.addEventListener("submit", enterCity);

//bonus
function searchLocation(position) {
  let apiKey = "76bd1c0ff8311a8d7f2ae10658044361";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let clickCurrentLocation = document.querySelector(".location-pin");
clickCurrentLocation.addEventListener("click", searchCurrentLocation);

//para lumabas na default search ito kung sakaling walang data sa indexhtml
searchCity("Davao");
