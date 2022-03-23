const key = "b272886ee0ac13f4cf4ee8180dd212ae";

const requestCity = async(city) => {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather";
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const mainData = await response.json();
    const coord = mainData.coord;
    const forecastData = await getForecast5days(coord);
    return { mainData, forecastData };
};

const getForecast5days = async(coord) => {
    const baseURL = "https://api.openweathermap.org/data/2.5/onecall";
    const query = `?lat=${coord.lat}&lon=${coord.lon}&appid=${key}&exclude=current,minutely,hourly&units=metric`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);
    const data = await response.json();
    return data;
};