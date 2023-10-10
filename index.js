const weatherObj = {
    "NameLocation": "Tampa",
    "CountryCode" : "US",
    "Description" : "Sunny",
    "Temperature" : "28.5",
    "FeelsLike" : "100",
    "WindSpeed" : "0",
    "Humidity" : "99"
};

API_KEY = "110b3a82bcab673410b3b256b2d406af";

async function getCurrentWeather(lat, lon){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    }
}
async function getCoordinates(name){
    try{
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5appid=${API_KEY}`, {mode:"cors"});
        const data = await response.json();
        const latLon = {
            lat: data[0].lat,
            lat: data[0].lon,
        }
        console.log(data[0].lat);
        console.log(data[0].lon);
    } catch {}
}

async function weather(name){
    try{
        const coordinates = getCoordinates(name);
        const data = await getCurrentWeather ((await coordinates).lat, (await coordinates).lon)
        const NameLocation = data.name
        const CountryCode = data.sys.country;
        const Description = data.weather[0].description;
        const Temperature = data.main.temperature;
        const FeelsLike = data.main.feels_like;
        const WindSpeed = data.main.humidity;

        return {
            NameLocation,
            CountryCode,
            Description,
            Temperature,
            FeelsLike,
            WindSpeed,
            Humidity,
        }
    } catch {

    }
}
getCoordinates("London");

const renderWeatherComponent = (weatherObj) => {
    const main = document.createElement("main");
    document.querySelector("body").appendChild(main);

    const locationName = document.createElement("h1");
    locationName.textContent = `${weatherObj.NameLocation}, ${weatherObj.CountryCode}`;
    main.appendChild(locationName);

    const Description = document.createElement("h2");
    Description.id = "Description";
    Description.textContent = `${weatherObj.Description}`;
    main.appendChild(Description);

    const bottomContainer = document.createElement("div");
    bottomContainer.id = "bottomContainer";
    main.appendChild(bottomContainer);

    const leftSide = document.createElement("div");
    leftSide.id = "leftSide";
    bottomContainer.appendChild(leftSide);

    const temperature = document.createElement("h2");
    temperature.id = "temperature";
    temperature.textContent = `${weatherObj.Temperature}`;
    leftSide.appendChild(temperature);

    const units = document.createElement("h4");
    units.id = "units";
    units.textContent = "K";
    leftSide.appendChild(units);

    const rightSide = document.createElement("div");
    rightSide.id = "rightSide";
    bottomContainer.appendChild(rightSide);

    const FeelsLike = document.createElement("p");
    FeelsLike.id = "FeelsLike";
    FeelsLike.textContent =
        `Feels Like: ${weatherObj.FeelsLike} `;
    rightSide.appendChild(FeelsLike);

    const WindSpeed = document.createElement("p");
    WindSpeed.id = "Wind";
    WindSpeed.textContent = `Wind: ${weatherObj.WindSpeed}`;
    rightSide.appendChild(WindSpeed);

    const Humidity = document.createElement("p");
    Humidity.id = "Humidity";
    Humidity.textContent = `Humidity: ${weatherObj.Humidity} %`;
    rightSide.appendChild(Humidity);

}
async function renderer(weatherObject, first = false){
    const weatherData = await weatherObject;
    if(first == true){
        renderWeatherComponent(weatherData);
    }
    else {
        document.querySelector("main").remove();
        document.querySelector("input").value == "";
        renderWeatherComponent(weatherData);
    }
}

document.querySelector("form").addEventListener("submit", (event)=> {
    event.preventDefault();
    renderer(weather(document.querySelector("input").value));
})

renderer(weather("lyon"),true);
