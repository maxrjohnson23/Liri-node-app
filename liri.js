#!/usr/bin/env node
// Import dependencies
require('dotenv').config();
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const program = require('commander');


// Configure apps with key information
const spotifyClient = new Spotify(keys.spotify);
const twitterClient = new Twitter(keys.twitter);

// Use commander to handle commands and help info
program.command('my-tweets').description('Retrieve your latest 20 tweets').action(retrieveTweets);
// [song...] indicates multiple parameters or words can follow
program.command('spotify-this-song [song...]').description('Retrieve Spotify information for song(s)').action(song => retrieveSongInfo(song));
// program.command('movie-this');
// program.command('do-what-it-says');

program.parse(process.argv);


// my-tweets
function retrieveTweets() {
    twitterClient.get('statuses/user_timeline', {count: 20}, function (err, tweets, response) {
        if (err || response.statusCode !== 200) {
            console.log('An error occurred:');
            console.log(err);
        }
        else {
            console.log('#### Your Tweets ####');
            tweets.forEach(t => {
                console.log(`${t.created_at} : ${t.text}`);
            });
        }
    });
}

// spotify-this-song
function retrieveSongInfo(song) {
    let searchQuery = null;
    if (song) {
        // Song name can have multiple words
        searchQuery = song.join(" ");
    } else {
        // Default to "The Sign" by Ace of Base
        searchQuery = "The Sign"
    }

    spotifyClient.search({type: 'track', query: searchQuery, limit: '5'}, function (err, data) {
        if (err) {
            return console.log('An error occurred: ' + err);
        }

        // Display track information in the console
        data.tracks.items.forEach(s => {
            console.log("##### Song Info #####");
            console.log(`Artist: ${s.artists.map(a => a.name)}`);
            console.log(`Song Name: ${s.name}`);
            console.log(`Album: ${s.album.name}`);
            console.log(`Preview: ${s.preview_url || "<link not available>"}`);
            console.log('\n');
        });
    });
}

// movie-this


// do-what-it-says

