const apiKey = "99770420a6c96e9be744dc6bef0c1618";
var city = "london";//$(".searchBox").value;
var coordsApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" +city+ "&limit=1&appid=" + apiKey;
//var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" +lat+ "&lon=" +lon+ "&appid="+apiKey;

//console.log(coordsApiUrl);

fetch(coordsApiUrl)
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" +lat+ "&lon=" +lon+ "&appid="+apiKey;
    fetch(apiUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
        console.log(data);
    });
  });