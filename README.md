# Node Command Line Application Program Interface
A node command line application that consumes some public APIs using a HTTP client library.
This is a little application that was built to test RESTful APIs from different website. It makes use of two APIs. 
I consumed an API from [Openweather](https://openweathermap.org/api) and also [Twitter](https://dev.twitter.com/rest/public). You can actually request a weather report for a particular location and also tweet a post on your twitter timeline.

## Dependencies
To run the application, you have to install the following dependencies

```
- npm install twitter request chalk figlet clear dotenv readline --save
```

In your .env file you need to put in your API keys and ID in the appropriate fields like so:

```
consumer_keys='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
consumer_secret='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
access_token_keys='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
access_token_secret='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
openweather_key='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

the areas marked as 'x' are to filled in with the API keys and token gotten from the various API.

After installing these dependencies and getting the API details you can start the application by 
running ```node index.js``` in the command line and follow the instructions.