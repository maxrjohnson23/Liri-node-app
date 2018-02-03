#!/usr/bin/env node
// Import dependencies
require('dotenv').config();
const fs = require('fs');
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
program.command('movie-this [movie...]').description('Retrieve movie information from OMDB').action(movie => retrieveMovieInfo(movie));
program.command('do-what-it-says').description('Perform functions defined in random.txt').action(performActionFromFile);
// program.command('do-what-it-says');
// program.command('movie-this');

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
    if (song.length !== 0) {
        // Song name can have multiple words
        searchQuery = song.join(" ");
    } else {
        // Default to "The Sign" by Ace of Base
        console.log('No track specified - here\'s one for you');
        searchQuery = "The Sign - Ace of Base"
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
function retrieveMovieInfo(movie) {
    let movieQuery = null;
    if (movie.length !== 0) {
        // Movie name can have multiple words
        movieQuery = movie.join(" ");
    } else {
        // If no movie provided, default to Mr. Nobody
        movieQuery = "Mr. Nobody";
    }

    request(`http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${movieQuery}`, (err, res, body) => {
        if (err) {
            console.log(`An error occurred: ${err}`);
        } else {
            let movieData = JSON.parse(body);

            if (movieData.Error) {
                // API error indicated in the body
                console.log(`An error occurred: ${movieData}`);
            } else {
                // Call was successful, print the movie data
                printMovieData(movieData);
            }
        }
    })
}

// helper function for formatting movie data
function printMovieData(movieData) {
    console.log('#### OMDB Movie Information ####');
    console.log(`Title: ${movieData.Title}`);
    console.log(`Year released: ${movieData.Year}`);
    console.log(`IMDB Rating: ${movieData.imdbRating}`);
    // Search array of rating sources for Rotten Tomatoes
    console.log(`Rotten Tomatoes Rating: ${movieData.Ratings.find(r => r.Source === 'Rotten Tomatoes').Value}`);
    console.log(`Countries of production: ${movieData.Language}`);
    console.log(`Plot: ${movieData.Plot}`);
    console.log(`Actors: ${movieData.Actors}`);
}


// do-what-it-says
function performActionFromFile() {
    // Read file data from random.txt
    fs.readFile('./random.txt', 'utf8', (err, contents) => {
        if (err) {
            throw err;
        }

        // Contents specified as command-name,"Multiple params"
        let command = contents.slice(0, contents.indexOf(','));
        let params = contents.slice(contents.indexOf(',') + 1);

        // Remove quotes and arrayify the params
        params = params.replace(/"/g, '').split(" ");
        console.log(params);

        // determine which command to call
        switch (command) {
            case "my-tweets": {
                retrieveTweets();
                break;
            }
            case "spotify-this-song": {
                retrieveSongInfo(params);
                break;
            }
            case "movie-this": {
                retrieveMovieInfo(params);
                break;
            }
            default: {
                console.log('Invalid command specified');
            }
        }
    })
}
