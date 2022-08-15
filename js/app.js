let btn = document.getElementById('btn');
let cities = document.getElementById('cities');
let display = document.getElementById('display');


btn.addEventListener('click', async function(){
    try{
        if(cities.value.length < 1){
            window.alert("please enter city names");
        }else{
            let cityList = cities.value;
            let cityArr = cityList.split(",");
            let reqObj = {
                "cities": cityArr
            }
            reqObj = JSON.stringify(reqObj);
            console.log(reqObj);
    
            let response = await fetch("https://stweatherapp.herokuapp.com/getWeather", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: reqObj
            });
    
            let weatherInfo = await response.json();
            weatherInfo = weatherInfo.weather;
            let cityBoxs = "";
           for(const city in weatherInfo){
            let temp = parseFloat(weatherInfo[city]);
            cityBoxs += `<div class="city-box">
            <div class="mycity">
                <img src="./img/weather.png" alt="weather">
             
                <h2>${city}</h2>
            </div>
            <h3>${temp}°C</h3>
             
           </div>`;
    
           }
    
           display.innerHTML = cityBoxs;
           cities.value = "";
    
        }
    }catch(err){
        if(err){
            console.error(err);
        }
    }
});