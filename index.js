#!/usr/bin/env node

// require dependencies that are needed to run the app
require('dotenv').config();
var readline = require('readline');
var request  = require('request');
var Twitter  = require('twitter');

var tweet = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret:process.env.access_token_secret
});

console.log('Welcome to the WEATHER and TWEET API');
console.log('Press any Key to see the prompt...')

// function that is called at the beginning of the application
// function intro() {
//   console.log('Press "1" to get the weather of a location');
//   console.log('Press "2" to post a tweet on tweeter');
//   console.log('Type "exit" to exit the application');
// }
// intro();

// Initiate the Questions asked to the user
var read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
read.prompt();

read.on('line',(line) => {
  read.question('Enter the name of the city you want to know the weather for: ', function(answer) {
    // put in your api key in the part with "xxxxxxxxxxxxxxxxx"
    var link = "http://api.openweathermap.org/data/2.5/weather?q="+answer+"&mode=json&appid="+process.env.openweather_key;
    var results = "";
    request({
      url: link, //URL to hit
      qs: {from: 'Open Weather', time: +new Date()}, //Query string data
      method: 'GET',
      headers: { 
          'Content-Type': 'application/json; charset=utf-8'
        }
      }, function(error, response, body){
        if(error) {
          console.log(error);
        } else {
          var object = JSON.parse(body);
          console.log('Your status code is: ',response.statusCode);
          console.log('The city name is: ', object.name);
          console.log('The weather will have: ', object.weather[0].description);
          console.log('The temperature is: ', object.main.temp -273, 'celcius');
          console.log('The humidity is: ', object.main.humidity, '%');
          console.log('');
        }
    });
    read.close();
    })
    
})