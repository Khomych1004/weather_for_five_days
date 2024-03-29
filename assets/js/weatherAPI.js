// API KEY
const apiKey = "8d876dd68a3e1244d91237d0f73f7818";
// Link for today
const linkToDay = "https://api.openweathermap.org/data/2.5/weather?q="
// Five days link
const linkFiveDays = "https://api.openweathermap.org/data/2.5/forecast?q="
// Request settings
const options = "&mode=json&units=metric&appid="

// Request data for today
function getWeather(cityName) {
    // Query string for today
    const queryURL = linkToDay + cityName + options + apiKey;

    fetch(queryURL)
        .then((res) => {
            if (!res.ok) { throw new Error(res.statusText); }

            return res.json();
        })
        .then((data) => {
            creatingOneDay(data);
            getWeatherFiveDays(cityName);
        })
        .catch((error) => { alert(error + "\nEnter the correct city name") });

}

// Request data for five days
function getWeatherFiveDays(cityName) {
    // Query line for five days
    const queryURL = linkFiveDays + cityName + options + apiKey;

    fetch(queryURL)
        .then((res) => { return res.json(); })
        .then((data) => { creatingFiveDays(data); });


}