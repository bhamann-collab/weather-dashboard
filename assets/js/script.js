$(document).ready(function () {
    var api_key = "635d437441ea04900582285c2e4d3a35";
    var cityName = "Balaklava,AU"
    var dayCount = 6;
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${api_key}`;
    
    $("#search-button").on('click', getCity)

    function getCity() {
        $.ajax({
            url: queryURL,
            success: function (response) {
                console.log(response.city.name);
            },
            error: function () {
                console.log("Unable to identify location - OpenAPI");
            }
        });
    }
    
});