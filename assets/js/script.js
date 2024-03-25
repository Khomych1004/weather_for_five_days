// TEST CITY
var testCity = "London";

// Creates tags and fills them with data
function creatingOneDay(data) {
  $("#today").empty();
  var city = (data.name);
  var date = dayjs.unix(data.dt).format("DD-MM-YYYY");
  var icon = (data.weather[0].icon);
  var iconLink = ("https://openweathermap.org/img/wn/" + icon + "@2x.png");
  var temp = (data.main.temp.toFixed(2));
  var wind = (data.wind.speed.toFixed(2));
  var humidity = (data.main.humidity);

  var todaysForecastDiv = $("<div>");
  todaysForecastDiv.css({ "border": "solid black 1px", "padding": "5px", "color": "black" });

  // City
  var todaysForecastCity = $("<h2>");
  todaysForecastCity.text(city);
  todaysForecastDiv.append(todaysForecastCity);

  // Date
  var todaysDate = $("<p>");
  todaysDate.text("(" + date + ")");
  todaysForecastDiv.append(todaysDate);

  // Weather Icon
  var todaysForecastIcon = $(`<img src="${iconLink}">`);
  todaysForecastDiv.append(todaysForecastIcon);

  // Temperature
  var todaysForecastTemp = $("<p>");
  todaysForecastTemp.text("Temp: " + temp + " °C");
  todaysForecastDiv.append(todaysForecastTemp);

  // Wind
  var todaysForecastWind = $("<p>");
  todaysForecastWind.text("Wind: " + wind + " km/h");
  todaysForecastDiv.append(todaysForecastWind);

  // Humidity
  var todaysForecastHumidity = $("<p>");
  todaysForecastHumidity.text("Humidity: " + humidity + "%");
  todaysForecastDiv.append(todaysForecastHumidity);

  $("#today").append(todaysForecastDiv);
}

//makes an API request and displays the received data on the screen
getWeatherToDay(testCity)



