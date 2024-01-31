const apiKey = "99770420a6c96e9be744dc6bef0c1618";
var city = "Liverpool";
//var lat = "";
//var lon = "";
// var coordsApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" +city+ "&limit=1&appid=" +apiKey;
//var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" +lat+ "&lon=" +lon+ "&appid=" +apiKey+ "&units=metric";
//var currentDataUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" +lon+ "&appid=" +apiKey+ "&units=metric";
//console.log(coordsApiUrl);


$("#search-addon").on("click", function() {
city = $("#searchBox").val();
getData(city);
});


function getData(city){

var coordsApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" +city+ "&limit=1&appid=" +apiKey;
fetch(coordsApiUrl)
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    
    
    var Api5DayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" +lat+ "&lon=" +lon+ "&appid="+apiKey+ "&units=metric";
    fetch(Api5DayUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
        //console.log(data);
    });

    var currentDataUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" +lon+ "&appid=" +apiKey+ "&units=metric";
    fetch(currentDataUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
        console.log(data);
        $("#currentTemp").text(data.main.temp + "C");
        $("#cityName").text(data.name);
        $("#currentDate").text(dayjs().format('DD/MM/YYYY'));
        $("#currentTime").text(dayjs().format('HH:MM'));
        $("#messageMain").text(data.weather[0].description);
        $("#windSpeedMain").text(data.wind.speed + "KPH");
        $("#humidityMian").text(data.main.humidity + "%");
        //$("#currentTemp").text(data.main.temp + "C"); //for image
    });
  });

}
