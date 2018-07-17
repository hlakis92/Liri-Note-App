require("dotenv").config();
//const variables that should stay the same
const OMDBrequest = require("request");
const keys = require("./keys");
const fs = require("fs");
const spotify = require("node-spotify-api");
const twitter = require("twitter");
//variable for user inputs
var command = process.argv[2]
//// Allows the user to input movies that have more than one word
var args = process.argv.slice(3).join("+");

run(command, args);
//switch statements to run each command in Liri
function run(cmd, arg){
    switch(cmd){
        case "my-tweets":
            tweets();
            break;
        case "spotify-this-song":
            spotify(arg);
            break;
        case "movie-this":
            movies(arg);
            break;
        case "do-what-it-says":
            doIt(arg);
            break;
    }
}


function movies(title){
    var queryUrl = "http://www.omdbapi.com/t=" + title.trim() + "&y=&plot=short&apikey=trilogy";
    OMDBrequest(queryUrl, function (err, response, data) {
        if (!err && response.statusCode === 200) {
            let obj = JSON.parse(data)
            console.log('')
            console.log("Title: " + obj.Title);
            console.log("Release Year: " + obj.Year);
            console.log("IMDB Rating: " + obj.imdbRating);
            console.log("Rotten Tomatoes rating: " + obj.Ratings[1].Value);
            console.log("Production Location: " + obj.Country);
            console.log("Language: " + obj.Language);
            console.log("Movie Plot: " + obj.Plot);
            console.log("Main Actors: " + obj.Actors);
        } else {
            return console.log("Error");
        }
    })
}

function tweets() {
    var client = new Twitter(keys.twitter);
    client.get("statuses/home_timeline", function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet => {
                console.log("User Name: " + tweet.user.name);
                console.log("Tweet Time: " + tweet.created_at);
                console.log("Tweet Content: " + tweet.text);
                console.log("-------------------------------");
            });
        } else {
            console.log("No Tweets to Show")
        }
    });
}