$(document).ready(function () {

  //Uses local storage to get the previous cities that was searched
  if(localStorage.getItem("city archive") !== null) {
    $("#previous-cities").replaceWith(localStorage.getItem("city archive"));
    var recentCity = $("#previous-cities").children()[0].innerHTML
    //Latest city searched gets displayed when the website loads
    updateCityStats(recentCity, false);
  } 
  

    //Getting the time on initial upload
    var date = new Date();
    //When pressing enter, the searched city will appear in the archives and the weather statistics will be displayed if the name exists
    $("#search-bar").keyup(function(event) {
      if (event.keyCode === 13) {
          $("#search-button").click();
      }
  });

    //When clicking on the Search button, The city gets saved to the search history and the function that holds the AJAX call gets called
    $("#search-button").on('click', function() {
      var addCity = true;
      var cityInput = $("#search-bar").val();
      updateCityStats(cityInput, addCity);
    })

    //Clicking on a previous city that has been searched will give you weather conditions 
    $("#previous-cities").on('click', '.city-archive' , function(){
      var addCity = false;
      var cityInput = $(this).text()
      updateCityStats(cityInput, addCity);
    })


    //Function that holds the AJAX call to get the information of the weather for a chosen city. Once when the call is successful, we go to the main powerhouse function
    function updateCityStats(cityName, addCity) {
        var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=635d437441ea04900582285c2e4d3a35&cnt=42`;
        $.ajax({
            url: queryURL,
            success: function (response) {
                updatePage(response, addCity)
            },
            error: function () {
                console.log("Unable to identify location - OpenAPI");
            }
        });
    }

    //Function that holds the AJAX call to get the UV index information for a chosen city. Once when the call is sucessful, we go to a syncronous function that will change the dom relating to the UV index.
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

    //This function is the main control source to change the page's content if there is an AJAX call
    function updatePage(cityObject, addCity) {
        weatherCurrent = cityObject.list[0].main;
        updateTitle(cityObject.city.name, cityObject.city.country, date);
        updateTemp(weatherCurrent.temp);
        updateHumidity(weatherCurrent.humidity);
        updateWindSpeed(cityObject.list[0].wind.speed)
        updateCityUV(cityObject)
        fiveDayForecast(cityObject, date);
        addCityToHistory(cityObject.city.name, addCity);
        date = new Date();
    }

    //Updates the name, country and date of the current city being viewed
    function updateTitle(city, country, time) {
        $("#name-city").text(`${city}, ${country} (${time.getDate()}/${time.getMonth() + 1}/${time.getYear()+1900})`)
    }

    //Updates the temperature for today of the current city being viewed
    function updateTemp(temperature) {
        $("#temperature").text(`Temperature: ${(temperature-273.15).toFixed(2)} C`)
    }

    //Updates the humitity for today of the current city being viewed
    function updateHumidity(humidity) {
        $("#humidity").text(`Humidity: ${humidity}%`)
    }

    //Updates the wind speed for today of the current city being viewed
    function updateWindSpeed(windSpeed) {
        $("#wind-speed").text(`Wind Speed: ${(windSpeed*1.609).toFixed(2)} KPH`)
    }

    //Gives you the color of the UV index depending on the value
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

    //This function inserts the Temperature, the Humidity and the image for the the next five days of that particular city
    function fiveDayForecast(city, time) {

      var date = [];
      var month = [];
      var year = [];
      for(var i = 0; i < 5; i++){
        time.setDate(time.getDate() + 1)
        date[i] = time.getDate()
        month[i] = time.getMonth() + 1
        year[i] = time.getYear() + 1900;
      }

        //displays weather conditions for the next 5 days
        $("#day-one").find(".temp").text(`Temp: ${(city.list[9].main.temp-273.15).toFixed(2)} C`);
        $("#day-one").find(".humid").text(`Humidity: ${city.list[9].main.humidity}%`);
        $("#day-one").find(".date").text(`${date[0]}/${month[0]}/${year[0]}`)
        chooseImage(city.list[9].weather[0].main, $("#day-one"));


        $("#day-two").find(".temp").text(`Temp: ${(city.list[17].main.temp-273.15).toFixed(2)} C`);
        $("#day-two").find(".humid").text(`Humidity: ${city.list[17].main.humidity}%`);
        $("#day-two").find(".date").text(`${date[1]}/${month[1]}/${year[1]}`)
        chooseImage(city.list[17].weather[0].main, $("#day-two"));


        $("#day-three").find(".temp").text(`Temp: ${(city.list[25].main.temp-273.15).toFixed(2)} C`);
        $("#day-three").find(".humid").text(`Humidity: ${city.list[25].main.humidity}%`);
        $("#day-three").find(".date").text(`${date[2]}/${month[2]}/${year[2]}`)
        chooseImage(city.list[25].weather[0].main, $("#day-three"));
        

        $("#day-four").find(".temp").text(`Temp: ${(city.list[33].main.temp-273.15).toFixed(2)} C`);
        $("#day-four").find(".humid").text(`Humidity: ${city.list[33].main.humidity}%`);
        $("#day-four").find(".date").text(`${date[3]}/${month[3]}/${year[3]}`)
        chooseImage(city.list[33].weather[0].main, $("#day-four"));
        

        $("#day-five").find(".temp").text(`Temp: ${(city.list[39].main.temp-273.15).toFixed(2)} C`);
        $("#day-five").find(".humid").text(`Humidity: ${city.list[39].main.humidity}%`);
        $("#day-five").find(".date").text(`${date[4]}/${month[4]}/${year[4]}`)
        chooseImage(city.list[39].weather[0].main, $("#day-five"));

    }

    //Adds a recently searched city to the search history while storing it in local storage
    function addCityToHistory(cityInput, addCity) {
      if(addCity === true){
        $('#previous-cities').prepend(`<li class="city-archive">${cityInput}</li>`);
        localStorage.setItem("city archive", $("#previous-cities")[0].outerHTML)
      }
    }

    //Chooses images to represent the current state of the weather. It will represent an image for Rain, Snow, Clouds and Clear
    function chooseImage(weatherStatus, day) {
      switch(weatherStatus) {
        case "Rain":
          day.find(".img-indicator").attr('src', './assets/img/svg/wi-rain.svg')
          break;
        case "Snow":
          day.find(".img-indicator").attr('src', './assets/img/svg/wi-snow.svg')
          break;
        case "Clouds":
          day.find(".img-indicator").attr('src', './assets/img/svg/wi-cloud.svg')
          break;
        case "Clear":
          day.find(".img-indicator").attr('src', './assets/img/svg/wi-day-sunny.svg')
          break;
        default:
          day.find(".img-indicator").src = "./assets/img/svg/wi-cloud.svg"
      } 
    }

});