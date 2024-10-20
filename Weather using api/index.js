
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "f6edb9098220d58b6c997f7254b6c4c8";


weatherForm.addEventListener("submit",async(event)=>{

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            weatherDisplay(weatherData);
        }catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city ");
    }
});


async function getWeatherData(city){

    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function weatherDisplay(data){
    const {name: city, 
           main: {temp,humidity}, 
           weather: [{description,id}]} = data;
    const celsius = Math.floor(temp- 273);
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = celsius + "°C";
    humidityDisplay.textContent = "Humidity : " + humidity + "%";
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    tempDisplay.classList.add("tempDisplay");
    cityDisplay.classList.add("cityDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300) :
            return "⛈️"
        case (weatherId >= 300 && weatherId < 600) :
            return "☔";
        case (weatherId >= 600 && weatherId < 700) :
            return "❄️";
        case (weatherId >= 700 && weatherId < 800) :
            return "🌫️";
        case (weatherId === 800) :
            return "☀️";
        case (weatherId >= 801 && weatherId < 810) :
            return "🌥️";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("P");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    console.log(card);
}