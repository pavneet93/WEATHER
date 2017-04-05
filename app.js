/*Create variables*/
var APPID = "56b64e7ce0164ffeb13f313ed0a8a007";
var temp;
var loc;
var icon;
var humidity;
var country;
var direction;
var description;
var changed=false;
var turns=0;
var weather = {};
function update(weather) {
  icon.src = "http://openweathermap.org/img/w/" + weather.icon + ".png"
  humidity.innerHTML = weather.humidity;
  direction.innerHTML = weather.direction;
  loc.innerHTML = weather.location;
  temp.innerHTML = weather.temp;
  if (turns ===0){
  changeBK(parseInt(weather.temp));
    }
  description.innerHTML = weather.description; 
   country.innerHTML = weather.country;
 
}

function submit() {
	document.getElementById("weatherholder").style.visibility="visible";
 temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");
  humidity = document.getElementById("humidity");
  direction = document.getElementById("direction");
  description = document.getElementById("description");
country= document.getElementById("country");
 
  
	  
  if (navigator.geolocation) {
    var showPosition = function(position) {
      updateByGeo(position.coords.latitude, position.coords.longitude);
    }
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    var zip = window.prompt("Could not discover your location. What is your zip code?");
    updateByZip(zip);
  } 
  /*Below code is supposed to change background but doesn't work*/

 
}

/*function to change icon*/
function changeBK(temp2){
 turns++;
  if (temp2 < 45){
 document.getElementById('iconid').src='https://image.freepik.com/free-icon/thermometer-and-a-snowflake--cold-winter-weather-symbol_318-34243.jpg';
  document.body.style.backgroundImage = "url('https://images2.alphacoders.com/683/68370.jpg')";}
  else if ((temp2 > 45) &&(temp2 < 80)){
   document.getElementById('iconid').src='https://cdn4.iconfinder.com/data/icons/perfectline-weather/512/Temperature_Medium-512.png';
    document.body.style.backgroundImage = "url('http://www.youwall.com/wallpapers/201403/sunny-blue-lake-wallpaper.jpg')";
  }else{
    document.getElementById('iconid').src='https://image.freepik.com/free-icon/thermometer-high-temperature_318-78702.jpg';
    document.body.style.backgroundImage = "url('http://2.bp.blogspot.com/-KJnC9qySGRA/UKLKae5S-ZI/AAAAAAAABc8/purHsd8LRNw/s1600/beautiful_sunshine_1920x1080.jpg')";
  }
}

function updateByGeo(lat, lon) {
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "lat=" + lat +
    "&lon=" + lon +
    "&APPID=" + APPID;
  sendRequest(url);
}

function updateByZip(zip) {
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + zip +
    "&APPID=" + APPID;
  sendRequest(url);
}

function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      
      weather.icon = data.weather[0].icon;
      weather.humidity = data.main.humidity;
    
      weather.direction = degreesToDirection(data.wind.deg)
      weather.location = data.name;
      
      weather.temp = K2F(data.main.temp);
      weather.description=data.weather[0].description;
      weather.country = ", "+(data.sys.country);
      
      update(weather);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function degreesToDirection(degrees) {
  var range = 360 / 16;
  var low = 360 - range / 2;
  var high = (low + range) % 360;
  var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  for (i in angles) {
    if (degrees >= low && degrees < high) {
     
      return angles[i];
     
    }
    low = (low + range) % 360;
    high = (high + range) % 360;
  }
  return "N";

}

function K2F(k) {
  return Math.round(k * (9 / 5) - 459.67);
}

function K2C(k) {
  return Math.round(k - 273.15);
}

function ctf() {
  var temp2 = document.getElementById("temperature").innerHTML;
  if(changed===false){
   
  var cel = (temp2 - 32) * 5/9;

    weather.temp = parseInt(cel);
    
    update(weather);
  change();
  changed=true;
    
  }else{
    temp2= (temp2 * (9 / 5)) + 32;
     weather.temp = parseInt(temp2);
    
    update(weather);
     change();
    changed=false;
  }
}
function change() 
{
    var elem = document.getElementById("myButton1");
    if (elem.value=="Change to Celsius") elem.value = "Change to Fahrenheit";
    else elem.value = "Change to Celsius";
}
