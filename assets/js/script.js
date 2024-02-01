var link = "http://api.openweathermap.org/data/2.5/forecast?q=";
var city = "London";
var key = "&appid=8d876dd68a3e1244d91237d0f73f7818";

var apiURL = link + city + key;

fetch(apiURL)
.then(function (response) {
    console.log(response.json());
    //return response.json();
}).then(function(data){
    console.log(data);
});

console.log("test");