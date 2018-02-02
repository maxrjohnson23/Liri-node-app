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

program.command('my-tweets').description('Retrieve your latest 20 tweets').action(retrieveTweets);
// program.command('spotify-this-song', 'Retrieve song information');
// program.command('movie-this');
// program.command('do-what-it-says');

program.parse(process.argv);

// my-tweets
function retrieveTweets() {
    twitterClient.get('statuses/user_timeline', {count: 20}, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            console.log("#### Your Tweets ####");
            tweets.forEach(t => {
                console.log(`- ${t.text}`);
            });
        }
        else {
            console.log("An error occurred!");
            console.log(error);
        }
    });
}

// spotify-this-song

// movie-this

// do-what-it-says

