// API KEY
const apiKey = "8d876dd68a3e1244d91237d0f73f7818";

const link = "https://api.openweathermap.org/data/2.5/weather?q="
const options = "&mode=json&units=metric&appid="

function getWeatherToDay(nameCity) {
    let queryURL = link + nameCity + options + apiKey;

    fetch(queryURL).then((response) => { return response.json(); })
        .then((data) => { creatingOneDay(data); });
}
