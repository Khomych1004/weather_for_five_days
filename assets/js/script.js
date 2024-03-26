var city = '';
var date = '';
var icon = '';
var iconLink = '';
var temp = '';
var wind = '';
var humidity = '';

var numberButtons = 0;

// Creates tags and populates them with today's data
function creatingOneDay(data) {
  $("#today").empty();
  city = (data.name);
  date = dayjs.unix(data.dt).format("DD-MM-YYYY");
  icon = (data.weather[0].icon);
  iconLink = ("https://openweathermap.org/img/wn/" + icon + "@2x.png");
  temp = (data.main.temp.toFixed(2));
  wind = (data.wind.speed.toFixed(2));
  humidity = (data.main.humidity);

  let forecastDiv = $("<div>");
  forecastDiv.css({ "border": "solid black 1px", "padding": "5px", "color": "black" });

  // City
  let forecastCity = $("<h2>");
  forecastCity.text(city);
  forecastDiv.append(forecastCity);

  // Date
  let forecasDate = $("<p>");
  forecasDate.text("( " + date + " )");
  forecastDiv.append(forecasDate);

  // Weather Icon
  let forecastIcon = $(`<img src="${iconLink}">`);
  forecastDiv.append(forecastIcon);

  // Temperature
  let forecastTemp = $("<p>");
  forecastTemp.text("Temp: " + temp + " °C");
  forecastDiv.append(forecastTemp);

  // Wind
  let forecastWind = $("<p>");
  forecastWind.text("Wind: " + wind + " km/h");
  forecastDiv.append(forecastWind);

  // Humidity
  let forecastHumidity = $("<p>");
  forecastHumidity.text("Humidity: " + humidity + " %");
  forecastDiv.append(forecastHumidity);

  $("#today").append(forecastDiv);
}

// Creates tags and populates them with data in five days
function creatingFiveDays(data) {
  $("#forecast").empty();

  let title = $("<h3>");
  title.addClass("title");
  title.css({
    "font-weight": "bold",
    "padding-left": "0"
  })
  title.text("5-Day Forecast:");

  $("#forecast").append(title);

  for (let i = 0; i < data.list.length; i++) {
    if (data.list[i].dt_txt.includes("12:00:00")) {
      date = dayjs.unix(data.list[i].dt).format("DD-MM-YYYY");
      icon = (data.list[i].weather[0].icon);
      iconLink = ("https://openweathermap.org/img/wn/" + icon + "@2x.png");
      temp = (data.list[i].main.temp.toFixed(2));
      wind = (data.list[i].wind.speed.toFixed(2));
      humidity = (data.list[i].main.humidity);

      // 5-day Forecast Grid Layout
      let grid = $("<div>");
      grid.addClass("col-sm-12 col-md-12 col-lg-2");

      // 5-day Forecast Cards
      let card = $("<div>");
      card.addClass("card");
      grid.append(card);

      // 5-day Forecast Card Body's
      let cardBody = $("<div>");
      cardBody.addClass("card-body");
      cardBody.css({
        "text-align": "left",
        "background-color": "#303d50",
        "color": "white",
        "padding": "10px"
      })
      card.append(cardBody);

      // 5-day Forecast Card Title
      let cardTitle = $("<h6>");
      cardTitle.addClass("card-title");
      cardTitle.text("( " + date + " )");
      cardBody.append(cardTitle);

      // 5-day Forecast Card Icon
      let cardIcon = $(`<img src="${iconLink}">`);
      cardIcon.css({
        "height": "75px",
        "width": "75px"
      });
      cardBody.append(cardIcon);

      // 5-day Forecast Card Temp
      let cardTemp = $("<p>");
      cardTemp.text("Temp: " + temp + " °C")
      cardBody.append(cardTemp);

      // 5-day Forecast Card Wind
      let cardWind = $("<p>");
      cardWind.text("Wind: " + wind + " km/h")
      cardBody.append(cardWind);

      // 5-day Forecast Card Humidity
      let cardHumidity = $("<p>");
      cardHumidity.text("Humidity: " + humidity + " %")
      cardBody.append(cardHumidity);

      $("#forecast").append(grid);
    }
  }
}

// A button is created to re-query the city's weather from history
function addButton(cityName) {

  if (numberButtons < 10) {
    let btn = $("<button>");
    btn.attr('id', numberButtons);
    btn.addClass("btn btn-secondary col-12 mt-2 previous-search");
    btn.text(cityName);

    btn.on("click", (event) => {
      event.preventDefault();
      let historyCityName = $(event.target).text();
      getWeather(historyCityName);
    });

    $("#history").append(btn);

    localStorage.setItem(numberButtons, cityName);

    numberButtons++;
  } else {

    let idBtn = idBtnNext = "";
    let moveCityName = "";
    let key = ""

    for (let i = 1; i < 10; i++) {
      idBtn = "#" + (i - 1)
      idBtnNext = "#" + i

      moveCityName = $(idBtnNext).text()

      $(idBtn).text(moveCityName);

      key = (i - 1)
      localStorage.setItem(key, moveCityName);
    }

    idBtn = "#" + (numberButtons - 1)
    $(idBtn).text(cityName);

    key = (numberButtons - 1)
    localStorage.setItem(key, cityName);
  }

}

// Binding a handler for clicking the search button
function buttonOnClick() {

  $("#search-button").on("click", function (event) {
    event.preventDefault();
    let cityName = $("#search-input").val().trim();
    if (cityName !== "") {

      getWeather(cityName);
      addButton(cityName);

      $("#search-input").val('');
    } else {
      alert("Please enter a city!");
      return;
    }
  });

}

//Loading from local storage
function loadingFromLS() {
  let historyBtnName;
  for (let i = 0; i < 10; i++) {
    historyBtnName = localStorage.getItem(i);

    if (historyBtnName != null) {
      addButton(historyBtnName)
    } else {
      return;
    }
  }
}

$(document).ready(() => {
  buttonOnClick()
  loadingFromLS()
});
