const express = require('express');
const bodyParser = require('body-parser');
const https = require('node:https');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Rendering 

app.get('/',function(req,res){

   res.sendFile(__dirname +'/index.html');
});

app.post('/',function(req,res){
     
  const input = req.body.CityName;
  const query = input;
  const apiKey = process.env.API_KEY;
  const units = "metric";  
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey + '&units='+ units;

  https.get(url,function(response){

    console.log(response.statusCode);

    response.on('data',function(d){
     const weatherData = JSON.parse(d);
     const temp = weatherData.main.temp;
     const feels_like = weatherData.main.feels_like;
     const weatherDes = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon ;
     const city = weatherData.name;

     const iconImage = " https://openweathermap.org/img/wn/" + icon + "@2x.png";
      
     console.log("Temperature: " + temp + "Celsius");
     console.log("Feels like: " + feels_like + "Celsius");
     console.log("Description: " + weatherDes);
     console.log("Icon: " + icon );
     
     res.render('report',{Temperature : temp, FeelsLike:feels_like, Desc : weatherDes,icon:iconImage});
    
    });

  });
  
});


app.listen(port,function(){
    console.log("Server is running on port 3000 ");
});