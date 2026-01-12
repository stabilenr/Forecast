const apiKey = "109f833e331a8e73of380d4a6cb25ft3";
const units = "metric";

function searchCity(city) {
  const apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&units=${units}&key=${apiKey}`;
  axios.get(apiURL).then(displayWeather).catch(handleError);
}

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector(".current-temperature-value").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector(".current-temperature-icon").innerHTML =
    getDayNightEmoji(response.data.time);

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );

  document.querySelector("#current-date").innerHTML = formatDate(
    new Date(response.data.time * 1000)
  );

  getForecast(response.data.coordinates);
}

function getForecast(coordinates) {
  const apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayForecast).catch(handleError);
}

function displayForecast(response) {
  const data = response.data.daily;
  let forecastHTML = "";

  data.slice(1, 7).forEach((day) => {
    forecastHTML += `
      <div class="current-forecast-day">
        <div class="current-forecast-date">${formatDay(day.time)}</div>
        <img class="current-forecast-icon" src="${day.condition.icon_url}" 
          alt="${day.condition.description}"/>
        <div class="current-forecast-temperatures">
          <div class="current-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="current-forecast-temperature">
          ${Math.round(day.temperature.minimum)}°
          </div>
        </div>
      </div>
    `;
  });
  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  const city = document.querySelector("#search-input").value.trim();
  if (city) searchCity(city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  const days = [
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

function formatDay(unixTime) {
  const date = new Date(unixTime * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getDayNightEmoji(unixTime) {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();

  if (hours >= 6 && hours < 18) {
    return "☀️"; // Daytime emoji
  } else {
    return "🌙"; // Nighttime emoji
  }
}

function handleError(error) {
  console.log("API error:", error);
  alert("Sorry, we couldn't retrieve that city. Please try again.");
}

const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Paris");
