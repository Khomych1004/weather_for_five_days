var apiURL = "api.openweathermap.org/data/2.5/forecast?";
var city = "q=London";
//var days = "&limit=1";
var key = "&appid=8d876dd68a3e1244d91237d0f73f7818";

apiURL = apiURL + city + key

fetch(apiURL)
.then(function (response) {
    return response.json();
}).then(function(data){
    console.log(data);
})