require("dotenv").config();

var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var omdb = process.env.OMDb_KEY;
var nodeArgs = process.argv;
var song = "";
var movie = "";
var bandartistname = "";


if (nodeArgs[2] === "spotify-this-song") {
    for (var i=3; i<nodeArgs.length; i++) {

        if(i>3 && i<nodeArgs.length) {
            song = song + " " + nodeArgs[i];
        }
        else {
            song += nodeArgs[i];
        }
    }

    spotify.search({ type: 'track', query: song, limit: 1},function(error,data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        console.log(data.tracks.items[0].artists[0].name, "\n" + data.tracks.items[0].name, "\n" + data.tracks.items[0].preview_url);
    })
}
else if (nodeArgs[2]==="movie-this") {
    for (var i=3; i<nodeArgs.length; i++) {

        if(i>3 && i<nodeArgs.length) {
            movie = movie + "+" + nodeArgs[i];
        }
        else {
            movie += nodeArgs[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" +omdb;

    axios.get(queryUrl).then(function(response){
        console.log("Title: " + response.data.Title + "\n","Released: " + response.data.Year + "\n","IMDb Rating: " + response.data.Ratings[0].Value + "\n", "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n", "Produced in: " + response.data.Country+ "\n", "Language: " + response.data.Language+"\n", "Plot: " + response.data.Plot+"\n", "Actors: " + response.data.Actors);
        
    })
}

else if (nodeArgs[2]==="concert-this") {
    for (var i=3; i<nodeArgs.length; i++) {

        if(i>3 && i<nodeArgs.length) {
            bandartistname = bandartistname + "+" + nodeArgs[i];
        }
        else {
            bandartistname += nodeArgs[i];
        }
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + bandartistname + "/events?app_id=codingbootcamp"
}