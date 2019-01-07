require("dotenv").config();

var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
//var omdb = new OMDb(keys.omdb);
var nodeArgs = process.argv;
var song = "";

if (process.argv[2] === "spotify-this-song") {
    for (var i=3; i<nodeArgs.length; i++) {

        if(i>3 && i<nodeArgs.length) {
            song = song + " " + nodeArgs[i];
        }
        else {
            song += nodeArgs[i];
        }
    }
    console.log(song);
    spotify.search({ type: 'track', query: song, limit: 1},function(error,data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        console.log(data.tracks.items[0].artists.name);
    })
}