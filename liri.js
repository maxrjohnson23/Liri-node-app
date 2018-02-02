#!/usr/bin/env node
// Import dependencies
require('dotenv').config();
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const program = require('commander');


// Configure apps with key information
const spotifyApi = new Spotify(keys.spotify);
const twitterClient = new Twitter(keys.twitter);

program.command('my-tweets',).action(retrieveTweets);
program.command('spotify-this-song').action(retrieveTweets);
program.command('movie-this').action(retrieveTweets);
program.command('do-what-it-says').action(retrieveTweets);

program.parse(process.argv);

// my-tweets
function retrieveTweets() {
    // twitterClient.get('favorites/list', function(error, tweets, response) {
    //     if(error) throw error;
    //     console.log(tweets);  // The favorites.
    //     console.log(response);  // Raw response object.
    // });
    console.log("Retrieving tweets");
    twitterClient.get('statuses/user_timeline', { count: 20 }, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        else {
            console.log(error);
        }
    });
}

// spotify-this-song

// movie-this

// do-what-it-says

