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