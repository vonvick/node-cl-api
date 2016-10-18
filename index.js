#!/usr/bin/env node

// require dependencies that are needed to run the app
require('dotenv').config();
var clear = require('clear');
var chalk = require('chalk');
var figlet = require('figlet');
var readline = require('readline');
var request  = require('request');
var Twitter  = require('twitter');

var tweet = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret:process.env.access_token_secret
});

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Weather & Twitter API', { horizontalLayout: 'quarter' })
  )
);
console.log(chalk.blue('Welcome to the WEATHER and TWEET API'));

// function that is called at the beginning of the application
function intro() {
  console.log(chalk.yellow('Press "1" to get the weather of a location'));
  console.log(chalk.yellow('Press "2" to post a tweet on tweeter'));
  console.log(chalk.yellow('Type "exit" to exit the application'));
  console.log('');
}
intro();

// Initiate the Questions asked to the user
var read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
read.prompt();

read.on('line',(line) => {
  switch(line.trim()) {
    // displays the weather information of a place given by the user
    case '1':
      read.question('Enter the name of the city you want to know the weather for: ', function(answer) {
          // put in your api key in the part with "xxxxxxxxxxxxxxxxx"
          var link = "http://api.openweathermap.org/data/2.5/weather?q="+answer+"&mode=json&appid="+process.env.openweather_key;
          var results = "";
          request({
            url: link,
            qs: {from: 'Open Weather', time: +new Date()},
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
              }
          }, function(error, response, body){
            if(error) {
              console.log(chalk.red(error));
              intro();
            } else if (response.statusCode === 200) {
              var object = JSON.parse(body);
              var temp = Math.round(object.main.temp -273); 
              console.log(chalk.green('Your status code is: ',response.statusCode));
              console.log(chalk.green('The city name is: ', object.name));
              console.log(chalk.green('The weather will have: ', object.weather[0].description));
              console.log(chalk.green('The temperature is: ', temp, 'celcius'));
              console.log(chalk.green('The humidity is: ', object.main.humidity, '%'));
              console.log('');
              intro();
            } else {
              console.log(chalk.red('You did not enter a valid city'));
              console.log(chalk.red('please enter a valid city'));
              console.log('');
              intro();
            }
        });
      });
      break;

    // Displays an option to send a post request to twitter on your timeline
    case '2':
      read.question('Enter some text you want to post on twitter: ', function(answer) {
        if(answer.length < 140) {
          var results = "";
          tweet.post('statuses/update', { status: answer }, function(err, data, response) {
            if (error) {
              console.log(chalk.red(error));
            } else{
              var object = data;
              console.log(chalk.green('Your tweet has been posted. Here are some information'));
              console.log(chalk.green('Your tweet was posted at: ',object.created_at));
              console.log(chalk.green('Your tweeted: ',object.text));
              console.log(chalk.green('Your twitter name is: ',object.user.name));
              console.log(chalk.green('What you do: ',object.user.description));
              console.log(chalk.green('Your are at: ',object.user.time_zone));
              console.log('');
              intro();
            } 
          })
        } else {
          console.log(chalk.red(''));
          console.log(chalk.red('Your text is longer than 140 characters'));
          console.log(chalk.red(''));
          console.log('');
          intro();
        }
      });
      break;

    case 'exit':
      console.log(chalk.blue('Thanks for using this application'));
      read.close();
      break;

    default:
      console.log('');
      intro();
  }
});
