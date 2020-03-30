$(document).ready(function () {
    //Getting the time on initial upload
    var date = new Date();

    $("#search-button").on('click', function() {
        var cityInput = $("#search-bar").val();
        updateCityStats(cityInput);
    })



    function updateCityStats(cityName) {
        var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=635d437441ea04900582285c2e4d3a35&cnt=42`;
        $.ajax({
            url: queryURL,
            success: function (response) {
                console.log(response)
                updatePage(response)
            },
            error: function () {
                console.log("Unable to identify location - OpenAPI");
            }
        });
    }

    function updateCityUV(cityObject) {
        var UVObject = "yo";
        var queryURL = `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=635d437441ea04900582285c2e4d3a35&lat=${cityObject.city.coord.lat}&lon=${cityObject.city.coord.lon}`;
        $.ajax({
            url: queryURL,
            success: function (response) {
                updateUVIndex(response);
            },
            error: function () {
                console.log("Unable to identify location - OpenAPI");
            }
        });
    }

    function updatePage(cityObject) {
        weatherCurrent = cityObject.list[0].main;
        updateTitle(cityObject.city.name, cityObject.city.country, date);
        updateTemp(weatherCurrent.temp);
        updateHumidity(weatherCurrent.humidity);
        updateWindSpeed(cityObject.list[0].wind.speed)
        updateCityUV(cityObject)
        fiveDayForecast();
        addCityToHistory();
    }

    function updateTitle(city, country, time) {
        $("#name-city").text(`${city}, ${country} (${time.getDate()}/${time.getMonth() + 1}/${time.getYear()+1900})`)
    }

    function updateTemp(temperature) {
        $("#temperature").text(`Temperature: ${(temperature-273.15).toFixed(2)} C`)
    }

    function updateHumidity(humidity) {
        $("#humidity").text(`Humidity: ${humidity}%`)
    }

    function updateWindSpeed(windSpeed) {
        $("#wind-speed").text(`Wind Speed: ${(windSpeed*1.609).toFixed(2)} KPH`)
    }

    function updateUVIndex(UVIndex) {
        console.log(UVIndex)
        $("#UV-index-color").text(`${UVIndex[0].value}`)
    }

    function fiveDayForecast() {
        console.log("yeah")
    }

    function addCityToHistory() {
        console.log("yeah")
    }

});