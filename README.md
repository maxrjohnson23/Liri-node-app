# Liri Node App

## A Siri-inspired Node application for retrieving data from Twitter, Spotify, and OMDB

### Prerequisites
1. NodeJS - Liri requires node to be installed

2. To install node visit [NodeJS Website](https://nodejs.org/en/ "Node.js") and install node for your operating system.


### Installation
Clone the Git repository
```
$ git clone <repo>
```
Navigate to the directory and install the dependencies 
```
$ npm install
 ```

### API Keys
Liri requires the user to provide API keys for individual access to Twitter, Spotify, and OMDB
1. Create a file called ".env" in the same directory with the following structure:

    ```
    # Spotify API keys
    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret
     
    # Twitter API keys
    TWITTER_CONSUMER_KEY=your-twitter-consumer-key
    TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
    TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
    TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
     
    # OMDB API key
    OMDB_API_KEY=your-omdb-api-key
    ```
### Usage & Commands
See the --help flag for available commands and usage
```
$ node liri.js --help
```
![Liri Help](sample/help.jpg?raw=true)

#### my-tweets
Retrieve your last twenty tweets from Twitter
```
 $ node liri.js my-tweets
```

#### spotify-this-song \<song name>
Retrieve track information from Spotify.  If multiple are found, the first ten will be displayed.
```
 $ node liri.js spotify-this-song "Kickstart my Heart"
```

#### movie-this \<movie name>
Retrieve movie information from OMDB.
```
 $ node liri.js movie-this "Superbad"
```

#### do-what-it-says
Reads a request from a file named "random.txt" in the directory.  The format is: command,"parameters"
```
 $ node liri.js do-what-it-says
```
