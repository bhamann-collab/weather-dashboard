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
        fiveDayForecast(cityObject);
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
        var UVIndexValue = UVIndex[0].value;
        if(UVIndexValue <= 2) {
            $("#UV-index-color").css("background", "green");
        } else if (UVIndexValue <= 5) {
            $("#UV-index-color").css("background", "#CCCC00");
        } else if (UVIndexValue <= 7) {
            $("#UV-index-color").css("background", "orange");
        } else {
            $("#UV-index-color").css("background", "red");
        }
        $("#UV-index-color").text(`${UVIndexValue}`);
    }

    function fiveDayForecast(city) {
        $("#day-one").find(".temp").text(`Temp: ${(city.list[9].main.temp-273.15).toFixed(2)} C`)
        $("#day-one").find(".humid").text(`Humidity: ${city.list[9].main.humidity}%`)

        $("#day-two").find(".temp").text(`Temp: ${(city.list[17].main.temp-273.15).toFixed(2)} C`)
        $("#day-two").find(".humid").text(`Humidity: ${city.list[17].main.humidity}%`)

        $("#day-three").find(".temp").text(`Temp: ${(city.list[25].main.temp-273.15).toFixed(2)} C`)
        $("#day-three").find(".humid").text(`Humidity: ${city.list[25].main.humidity}%`)

        $("#day-four").find(".temp").text(`Temp: ${(city.list[33].main.temp-273.15).toFixed(2)} C`)
        $("#day-four").find(".humid").text(`Humidity: ${city.list[33].main.humidity}%`)

        $("#day-five").find(".temp").text(`Temp: ${(city.list[39].main.temp-273.15).toFixed(2)} C`)
        $("#day-five").find(".humid").text(`Humidity: ${city.list[39].main.humidity}%`)
    }

    function addCityToHistory() {
        console.log("yeah")
    }

});