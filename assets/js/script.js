var city = "London";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&mode=json&units=metric&appid=" + apiKey;


fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    $("#today").empty();
    var cityName = (data.name);
    var forecastDate = dayjs.unix(data.dt).format("DD-MM-YYYY");
    var forecastIcon = (data.weather[0].icon);
    var forcastIconLink = ("https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png");
    var forecastTemp = (data.main.temp.toFixed(2));
    var forecastWind = (data.wind.speed.toFixed(2));
    var forecastHumidity = (data.main.humidity);

    var todaysForecastDiv = $("<div>");
    todaysForecastDiv.css({ "border": "solid black 1px", "padding": "5px", "color": "black" });

    // City Name
    var todaysForecastCity = $("<h2>");
    todaysForecastCity.text(cityName);
    todaysForecastDiv.append(todaysForecastCity);

    // Today's Date
    var todaysDate = $("<p>");
    todaysDate.text("(" + forecastDate + ")");
    todaysForecastDiv.append(todaysDate);

    // Weather Forecast Icon
    var todaysForecastIcon = $(`<img src="${forcastIconLink}">`);
    todaysForecastDiv.append(todaysForecastIcon);

    // Temperature Forecast
    var todaysForecastTemp = $("<p>");
    todaysForecastTemp.text("Temp: " + forecastTemp + " °C");
    todaysForecastDiv.append(todaysForecastTemp);

    // Wind Forecast
    var todaysForecastWind = $("<p>");
    todaysForecastWind.text("Wind: " + forecastWind + " km/h");
    todaysForecastDiv.append(todaysForecastWind);

    // Humidity Forecast
    var todaysForecastHumidity = $("<p>");
    todaysForecastHumidity.text("Humidity: " + forecastHumidity + "%");
    todaysForecastDiv.append(todaysForecastHumidity);

    $("#today").append(todaysForecastDiv);
  });
