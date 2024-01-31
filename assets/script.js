const apiKey = "99770420a6c96e9be744dc6bef0c1618";
var city = "Liverpool";



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
    //console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    
    
    var Api5DayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" +lat+ "&lon=" +lon+ "&appid="+apiKey+ "&units=metric";
    fetch(Api5DayUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
        console.log(data);
        var fiveDayArray = [];
for (let i = 0; i < data.list.length; i += 8) {
    fiveDayArray.push({
        dateOfDay: data.list[i].dt,
        temp: data.list[i].main.temp,
        windSpeed: data.list[i].wind.speed,
        humidity: data.list[i].main.humidity
    });
}

// Initialize the HTML content outside the loop
var htmlContent = "";

for (let i = 0; i < fiveDayArray.length; i++) {
    const { dateOfDay, temp, windSpeed, humidity } = fiveDayArray[i];

    // Concatenate the HTML content for each entry
    htmlContent += `<div class="card col">
        <div class="card" style="color: #4B515D;">
            <div class="card-body p-4">
                <div class="d-flex">
                    <h6>${dayjs(dateOfDay * 1000).format('DD/MM/YYYY')}</h6>
                </div>
                <div class="d-flex flex-column text-center mt-5 mb-4">
                    <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> ${temp}°C </h6>
                    <span class="small" style="color: #868B94">Stormy</span>
                </div>
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1" style="font-size: 1rem;">
                        <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1">${windSpeed} km/h</span></div>
                        <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1">${humidity}% </span></div>
                    </div>
                    <div><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp" width="100px"></div>
                </div>
            </div>
        </div>
    </div>`;
}

// Set the concatenated HTML content to the element with ID "fiveDays"
$("#fiveDays").html(htmlContent);

        console.log(fiveDayArray);
    });

    var currentDataUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" +lon+ "&appid=" +apiKey+ "&units=metric";
    fetch(currentDataUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
        //console.log(data);
        
        $("#currentTemp").text(data.main.temp + "C");
        $("#cityName").text(data.name);
        $("#currentDate").text(dayjs(data.dt * 1000).format('DD/MM/YYYY'));
        $("#currentTime").text("Last Updated: " +dayjs(data.dt * 1000).format('HH:MM'));
        $("#messageMain").text(data.weather[0].description);
        $("#windSpeedMain").text(data.wind.speed + "KPH");
        $("#humidityMian").text(data.main.humidity + "%");
        //$("#currentTemp").text(data.main.temp + "C"); //for image
    });
  });

}
