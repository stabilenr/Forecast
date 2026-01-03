let apiKey = "109f833e331a8e73of380d4a6cb25ft3";

function searchCity(city) {
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&units=metric&key=${apiKey}`;
  axios.get(apiURL).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector(".current-temperature-value").innerHTML = Math.round(
    response.data.temperature.current
  );
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hours}:${minutes}`;
}

document.querySelector("#current-date").innerHTML = formatDate(new Date());
