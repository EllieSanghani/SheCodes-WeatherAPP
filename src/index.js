let now = new Date();
let formatDate = document.querySelector("#current-date");

let minutes = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinutes = minutes[now.getMinutes()];
let currentYear = now.getFullYear();
let currentMonth = months[now.getMonth()];
let currentDay = days[now.getDay()];

formatDate.innerHTML = ` ${currentHour}:${currentMinutes} ${currentDay}, ${currentMonth} ${currentDate} ${currentYear} `;

function showTemp(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);

  celciusTemperature = response.data.main.temp;

  document.querySelector(".dayTemp").innerHTML = `${currentTemperature}°`;
  let currentHumidity = Math.round(response.data.main.humidity);
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${currentHumidity}%`;
  let currentWindSpeed = Math.round(response.data.wind.speed);
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `Wind Speed: ${currentWindSpeed}mph`;

  let conditions = response.data.weather[0].main;
  document.querySelector(
    "#currentWeather"
  ).innerHTML = `Conditions: ${conditions}`;

  let iconElement = document.querySelector("#mainIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showForecast(response) {
  let weekForecast = document.querySelector("#forecast");
  let forecast = response.data.list[0];

  weekForecast.innerHTML = ` 
           <div class="col-3">
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              id="icon"
              class="emoji"
            />
            <div class="col-12">
              <h5 class="temp">
                <strong class="day"> ${Math.round(
                  forecast.main.temp_max
                )}° </strong> <span> 12°</span> 
              </h5>
              <div class="col-12">
                <p>Monday</p>
              </div>
            </div>
          </div>
          <div class="vl"></div> `;
}

function search(event) {
  event.preventDefault();
  let apiKey = "087f0ef7dd56ce65c496f8db8c2c8fa0";
  let cityName = document.querySelector("#search-city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
let currentTemp = document.querySelector("#search-form");
currentTemp.addEventListener("submit", search);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "087f0ef7dd56ce65c496f8db8c2c8fa0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemp);
}

function currentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector(".location");
button.addEventListener("click", currentPosition);

function fahrenheitConversion(event) {
  event.preventDefault();
  let fConversion = document.querySelector(".dayTemp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  fConversion.innerHTML = Math.round(fahrenheitTemperature) + "°";
}

function celciusConversion(event) {
  event.preventDefault();
  let fConversion = document.querySelector(".dayTemp");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  fConversion.innerHTML = Math.round(celciusTemperature) + "°";
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitConversion);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", celciusConversion);
