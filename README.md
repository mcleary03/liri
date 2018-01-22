# LIRI

## Language Interpretation and Recognition Interface

LIRI takes in commands and logs the output to a file as well as printing to the console

To run this app, enter ```node liri.js <command> <argument>``` in the console

### LIRI takes the following commands:
* ```twitter <userName>```
* ```spotify <songName>```
* ```omdb <movieName>```
* ```run```
  
#### ```twitter```
* logs 10 most recent tweets from a user

#### ```spotify```
* logs Name, Artist, Spotify Preview Link, Album

#### ```omdb```
* logs Title, Year, IMDB Rating, Country, Language, Plot, Actors

#### ```run```
* logs results of whatever command is saved in run.txt file
* contents of run.txt should be ```<command>,<argument>``` i.e. spotify,gangnam style
