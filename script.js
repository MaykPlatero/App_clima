const searchInput = document.querySelector("#searchInput");
searchButton = document.querySelector("#searchBtn");
weatherIcon = document.querySelector(".weather-icon");
windSpeed = document.querySelector(".wind");
humidity = document.querySelector(".humidity");
weather = document.querySelector(".temp");
city = document.querySelector(".city");
API = "c7377c7305e6798286b1883817b0075e";

const setWeatherDetails = (data) => {
  console.log(data);
  city.innerHTML = data.name;
  weather.innerHTML = Math.round(data.main.temp - 273.15) + "°c";
  humidity.innerHTML = data.main.humidity + "%";
  windSpeed.innerHTML = data.wind.speed + "km/h";
  switch (data.weather[0].main) {
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      break;
    case "Clear":
      weatherIcon.src = "images/clear.png";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      break;
    case "Mist":
      weatherIcon.src = "images/mist.png";
      break;
    case "Snow":
      weatherIcon.src = "images/snow.png";
      break;
    case "Drizzle":
      weatherIcon.src = "images/drizzle.png";
      break;
  }
};

const callAPI = (id) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${id}`
  )
    .then((response) => {
      if (!response.ok) {
        alert("Verifique o nome da cidade e tente novamente!");
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setWeatherDetails(data);
    })
    .catch((error) => console.log(error));
};

searchButton.addEventListener("click", (e) => {
  if (searchInput.value == "") {
    alert("Por Favor Digite o nome de uma cidade.");
  } else {
    callAPI(API);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButton.click();
  }
});

searchButton.click();