require("dotenv").config();

const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const spotify = new Spotify(keys.spotify);
const omdb = process.env.OMDb_KEY;
const bands = process.env.BANDS_KEY;
const nodeArgs = process.argv;

function spotifyThisSong(song) {
    spotify.search({ type: 'track', query: song, limit: 1 }, function (error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        // console.log(data.tracks.items[0]);
        let songData = "Artist Name: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview URL: " + data.tracks.items[0].preview_url + "\nAlbum Name: " + data.tracks.items[0].album.name;
        console.log(songData);
        fs.appendFile("log.txt", "\n-------------\n" + songData, function (err) {
            if (err) throw err;
            console.log("Song data was appended to log.txt!");
        });
    });
};

function movieThis(movie) {
    let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + omdb;

    axios.get(queryUrl).then(function (response) {
        let movieData = "Title: " + response.data.Title + "\nReleased: " + response.data.Year + "\nIMDb Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nProduced in: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors;
        console.log(movieData);
        fs.appendFile("log.txt", "\n-------------\n" + movieData, function (err) {
            if (err) throw err;
            console.log("Movie data was appended to log.txt!");
        });
    });
};

function concertThis(bandartistname) {
    let queryUrl = "https://rest.bandsintown.com/artists/" + bandartistname + "/events?app_id=" + bands;
    axios.get(queryUrl).then(function (response) {
        console.log(response.data.length);
        for (let j = 0; j < response.data.length; j++) {
            let date = moment(response.data[j].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY");
            let concertData = "Name of Venue: " + response.data[j].venue.name + "\nVenue Location: " + response.data[j].venue.city + ", " + response.data[j].venue.country + "\nDate of Event: " + date;
            console.log(concertData);
            console.log("\n---------------\n");
            fs.appendFile("log.txt", "\n-------------\n" + "Band Name: " + bandartistname.replace("+", " ") + "\n" + concertData, function (err) {
                if (err) throw err;
            });
        };
        console.log("Concert data was appended to log.txt!");
    });
};

function init() {
    let song = "";
    let movie = "";
    let bandartistname = "";
    if (nodeArgs[2] === "spotify-this-song") {
        if (nodeArgs.length > 3) {
            
            for (let i = 3; i < nodeArgs.length; i++) {
                if (i > 3 && i < nodeArgs.length) {
                    song = song + " " + nodeArgs[i];
                }
                else {
                    song += nodeArgs[i];
                }
            }
    
        }
        else {
            song = "The Sign Ace of Base";
        }
        spotifyThisSong(song);
    
    }
    else if (nodeArgs[2] === "movie-this") {
        if (nodeArgs.length > 3) {
            for (let i = 3; i < nodeArgs.length; i++) {
    
                if (i > 3 && i < nodeArgs.length) {
                    movie = movie + "+" + nodeArgs[i];
                }
                else {
                    movie += nodeArgs[i];
                }
            }
        }
        else {
            movie = "Mr.+Nobody";
        }
        movieThis(movie);
    
    }
    else if (nodeArgs[2] === "concert-this") {
        for (let i = 3; i < nodeArgs.length; i++) {
    
            if (i > 3 && i < nodeArgs.length) {
                bandartistname = bandartistname + "+" + nodeArgs[i];
            }
            else {
                bandartistname += nodeArgs[i];
            }
        }
        concertThis(bandartistname);
    
    }
    else if (nodeArgs[2] === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            else {
                console.log(data);
                let dataArr = data.split(",");
                if (dataArr[0] === "spotify-this-song") {
                    song = dataArr[1];
                    spotifyThisSong(song);
                }
                else if (dataArr[0] === "movie-this") {
                    movie = dataArr[1].split(" ").join("+");
                    movieThis(movie);
                }
                else if (dataArr[0] === "concert-this") {
                    if (dataArr[1].split(" ").length >= 2) {
                        bandartistname = dataArr[1].split(" ").join("+").replace(/["]+/g, "");
                    }
                    else {
                        bandartistname += dataArr[1].replace(/["]+/g, "");
                    }
    
                    concertThis(bandartistname);
                }
            };
    
        });
    };
}

init();
