require("dotenv").config();

var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var omdb = process.env.OMDb_KEY;
var bands = process.env.BANDS_KEY;
var nodeArgs = process.argv;
var song = "";
var movie = "";
var bandartistname = "";

function spotifyThisSong() {
    spotify.search({ type: 'track', query: song, limit: 1},function(error,data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        // console.log(data.tracks.items[0]);
        console.log("Artist Name: "+ data.tracks.items[0].artists[0].name, "\nSong Name: " + data.tracks.items[0].name, "\nPreview URL: " + data.tracks.items[0].preview_url, "\nAlbum Name: "+data.tracks.items[0].album.name);
    })
}

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" +omdb;

    axios.get(queryUrl).then(function(response){
        console.log("Title: " + response.data.Title,"\nReleased: " + response.data.Year,"\nIMDb Rating: " + response.data.Ratings[0].Value, "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value, "\nProduced in: " + response.data.Country, "\nLanguage: " + response.data.Language, "\nPlot: " + response.data.Plot, "\nActors: " + response.data.Actors);
        
    });
};

function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandartistname + "/events?app_id=" + bands;
    axios.get(queryUrl).then(function(response){
        for (var j=0; j<response.data.length; j++) {
            var date = moment(response.data[j].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY");
            console.log("Name of Venue: " + response.data[j].venue.name, "\nVenue Location: "+response.data[j].venue.city+ ", "+response.data[j].venue.country, "\nDate of Event: "+date);
            console.log("\n---------------\n");
        };
        
    });
};

if (nodeArgs[2] === "spotify-this-song") {
    if (nodeArgs.length>3) {
        for (var i=3; i<nodeArgs.length; i++) {

            if(i>3 && i<nodeArgs.length) {
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
    spotifyThisSong();
    
}
else if (nodeArgs[2]==="movie-this") {
    if (nodeArgs.length>3) {
        for (var i=3; i<nodeArgs.length; i++) {

            if(i>3 && i<nodeArgs.length) {
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
    movieThis();
    
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
    concertThis();
    
}
else if (nodeArgs[2]==="do-what-it-says") {
    fs.readFile("random.txt","utf8",function(error, data) {
        if (error) {
            return console.log(error);
        }
        else {
            console.log(data);
            var dataArr = data.split(",");
            if (dataArr[0]==="spotify-this-song") {
                song = dataArr[1];
                spotifyThisSong();
            }
            else if (dataArr[0]==="movie-this") {
                movie = dataArr[1].split(" ").join("+");
                movieThis();
            }
            else if (dataArr[0]==="concert-this") {
                bandartistname = dataArr[1].split(" ").join("+");
                concertThis();
            }
        };
        
    });
};
