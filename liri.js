require("dotenv").config();
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const keys = require("./keys.js");
const request = require("request");
const fs = require('fs');

let command = process.argv[2];
let arg = process.argv.slice(3).join(' ');

const twitter = new Twitter(keys.twitter);
const getTweets = userName => {
    var params = { 
        screen_name: userName || 'funnyordie',
        count: 10
    };
    twitter.get('statuses/user_timeline', params, function (error, data, response) {
        if (error) throw error;

        let tweets = data.map((tweet, i)=>`${i+1}: ${tweet.text}`).join("\n");
        log(tweets);
    });
};

//  search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
const spotify = new Spotify(keys.spotify);
const getSong = trackName => {
    console.log(trackName);
    spotify.search({
        type: 'track',
        query: trackName || 'The Sign',
        limit: 1
    })
    .then( res => {
        let song = res.tracks.items[0];
        let name = song.name;
        let artist = song.artists[0].name;
        let link = song.preview_url;
        let album = song.album.name;

        let output = `Artist: ${artist}\nName: ${name}\nLink: ${link}\nAlbum: ${album}\n`;

        log(output);
    })
    .catch( err => console.log(err) )
};

const omdb = keys.omdb;
const getMovie = title => {
    // let output;
    const url = `http://www.omdbapi.com/?i=${omdb.id}&apikey=${omdb.key}&type=movie&t=${title || 'Mr. Nobody'}\n`;

    request(url, (err, res, body) => {
        if (err) throw err;
        
        let movie = JSON.parse(body);

        let title = movie.Title;
        let year = movie.Year;
        let imdbRating = movie.imdbRating;
        let tomatoes = movie.Ratings[1].Value;
        let country = movie.Country;
        let language = movie.Language;
        let plot = movie.Plot;
        let actors = movie.Actors;

        let output = `Title: ${title}\nYear: ${year}\nIMDB Rating: ${imdbRating}\nCountry: ${country}\nLanguage: ${language}\nPlot: ${plot}\nActors: ${actors}`;
        
        log(output);
    })
};

const log = response => {
    if (!response) console.log('Error, response missing.')

    let output = `> ${command} ${arg} :\n${response}\n\n`;

    // fs.appendFile( 'log.txt', response+"\n", () => console.log(response) )
    fs.appendFile( 'log.txt', output, () => console.log(output) );
}

const run = () => {
    switch (command) {
        case 'twitter':
            getTweets(arg);
            break;
        case 'spotify':
            getSong(arg);
            break;
        case 'omdb':
            getMovie(arg);
            break;
        case 'run':
            command = fs.readFile('command.txt', 'utf8', (err, data) => {
                if (err) throw err;
                [ command, arg ] = data.split(',');
                run();
            })
            break;
        default:
            break;
    }
};

run()