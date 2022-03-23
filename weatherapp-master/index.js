const searchForm = document.querySelector(".search-loaction");
const cityValue = document.querySelector(".search-loaction input");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const timeImage = document.querySelector(".card-top img");
const cardInfo = document.querySelector(".back-card");

const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
};
const isDayTime = (icon) => {
    if (icon.includes("d")) {
        return true;
    } else {
        return false;
    }
};
const updateWeatherApp = (city) => {
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-mid row">
            <div class="col-8 text-center temp">
              <span>${spitOutCelcius(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${spitOutCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${spitOutCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${spitOutCelcius(city.main.feels_like)}&deg;C</p>
              <span>Feels Like</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <span>Humidity</span>
            </div>
            <div class="col text-center">
              <p>${city.wind.speed}m/s</p>
              <span>Wind speed</span>
            </div>
            <div class="col text-center">
              <p>${city.clouds.all}%</p>
              <span>Cloudiness</span>
            </div>
          </div>
    `;
    if (isDayTime(imageName)) {
        timeImage.setAttribute("src", "img/day.svg");
        if (cityName.classList.contains("text-white")) {
            cityName.classList.remove("text-white");
        } else {
            cityName.classList.add("text-black");
        }
    } else {
        timeImage.setAttribute("src", "img/night.svg");
        if (cityName.classList.contains("text-black")) {
            cityName.classList.remove("text-black");
        } else {
            cityName.classList.add("text-white");
        }
    }

    cardInfo.classList.remove("d-none");
};

const updateForecastView = (data) => {
    const forecastDays = data.daily.slice(1, 6)
    const elm = document.createElement('div')
    const text = forecastDays.map(day => {
        const date = new Date(day.dt * 1000)
        const formattedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)
        return `<div class="forecast">
        <div class="date">
        <p>${formattedDate}</p>
        </div>
        <div class="temp1">
        <p class="high">${day.temp.max}ºC</p>  
        <p class="low">${day.temp.min}ºC</p> 
        </div>
        </div>`
    })
    elm.innerHTML = text
    cardBody.append(elm)
}

//add an event listner to the form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    searchForm.reset();

    requestCity(citySearched)
        .then(({ mainData, forecastData }) => {
            updateWeatherApp(mainData);
            updateForecastView(forecastData);
        })
        .catch((error) => {
            console.log(error);
        });
});