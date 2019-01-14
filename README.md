# LIRI Bot
LIRI Bot is a Node.js application in which the user can enter one of four commands into command line and the application will return data based on the command. The data is returned to the console as well as appended to the log.txt file.

If the command is "spotify-this-song" and then a song name, the application makes a request to the Spotify API and returns the song artist, song name, a preview URL, and the album name. If the user does not enter a song name, then the application will default to "The Sign" by Ace of Base.
![Video of spotify-this-song command](/Gifs/spotify-this-song.gif)

If the command is "movie-this" and a movie name, the application uses the axios Node package to make a request to the OMDB API and return title, release year, IMDb rating, Rotten Tomatoes rating, country where it was produced, language, plot, and actors. If the user does not enter a movie name, the application will default to "Mr. Nobody."
![Video of movie-this command](/Gifs/movie-this.gif)

If the command is "concert-this" and a band or artist, the application uses the axios Node package to make a request to the Bands in Town API and return the following information for each of the band's events in the coming year: name of venue, venue city and country, and date of the event.
![Video of concert-this command](/Gifs/concert-this.gif)

For the "do-what-it-says" command, the application reads the random.txt file, separates the command from the song/movie/band name by splitting at the comma, and executes the correct command.
![Video of do-what-it-says command](/Gifs/do-what-it-says.gif)
