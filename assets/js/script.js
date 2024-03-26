// TEST CITY
var testCity = "London";

var numberButtons = 0;

// Creates tags and populates them with today's data
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
  todaysDate.text("( " + date + " )");
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
  todaysForecastHumidity.text("Humidity: " + humidity + " %");
  todaysForecastDiv.append(todaysForecastHumidity);

  $("#today").append(todaysForecastDiv);
}

// Creates tags and populates them with data in five days
function creatingFiveDays(data) {
  $("#forecast").empty();

  var title = $("<h3>");
  title.addClass("title");
  title.css({
    "font-weight": "bold",
    "padding-left": "0"
  })
  title.text("5-Day Forecast:");

  $("#forecast").append(title);

  for (var i = 0; i < data.list.length; i++) {
    if (data.list[i].dt_txt.includes("12:00:00")) {
      var date = dayjs.unix(data.list[i].dt).format("DD-MM-YYYY");
      var icon = (data.list[i].weather[0].icon);
      var iconLink = ("https://openweathermap.org/img/wn/" + icon + "@2x.png");
      var temp = (data.list[i].main.temp.toFixed(2));
      var wind = (data.list[i].wind.speed.toFixed(2));
      var humidity = (data.list[i].main.humidity);

      // 5-day Forecast Grid Layout
      var grid = $("<div>");
      grid.addClass("col-sm-12 col-md-12 col-lg-2");

      // 5-day Forecast Cards
      var card = $("<div>");
      card.addClass("card");
      grid.append(card);

      // 5-day Forecast Card Body's
      var cardBody = $("<div>");
      cardBody.addClass("card-body");
      cardBody.css({
        "text-align": "left",
        "background-color": "#303d50",
        "color": "white",
        "padding": "10px"
      })
      card.append(cardBody);

      // 5-day Forecast Card Title
      var cardTitle = $("<h6>");
      cardTitle.addClass("card-title");
      cardTitle.text("( " + date + " )");
      cardBody.append(cardTitle);

      // 5-day Forecast Card Icon
      var cardIcon = $(`<img src="${iconLink}">`);
      cardIcon.css({
        "height": "75px",
        "width": "75px"
      });
      cardBody.append(cardIcon);

      // 5-day Forecast Card Temp
      var cardTemp = $("<p>");
      cardTemp.text("Temp: " + temp + " °C")
      cardBody.append(cardTemp);

      // 5-day Forecast Card Wind
      var cardWind = $("<p>");
      cardWind.text("Wind: " + wind + " km/h")
      cardBody.append(cardWind);

      // 5-day Forecast Card Humidity
      var cardHumidity = $("<p>");
      cardHumidity.text("Humidity: " + humidity + " %")
      cardBody.append(cardHumidity);

      $("#forecast").append(grid);
    }
  }
}

// A button is created to re-query the city's weather from history
function addButton(cityName) {

  // let matches = document.querySelectorAll(".history_btn").length;
  // console.log(matches)
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
    var cityName = $("#search-input").val().trim();
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
    }
  }
}

$(document).ready(() => {
  buttonOnClick()
  loadingFromLS()
});
