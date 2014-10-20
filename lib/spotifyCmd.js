#!/usr/bin/env node

/*
 * spotify-cmd
 * https://github.com/shidel-dev/spotify-cmd
 *
 * Copyright (c) 2014 shidel.dev
 * Licensed under the MIT license.
 */

var exec = require('child_process').exec;
var spotifyCmd = require('commander');

// Exec function as a string in osa
spotifyCmd.osa = function(osaFunction) {
  var args = Array.prototype.slice.call(arguments, 1, arguments.length - 1);
  var jsonArgs = args.map(JSON.stringify);
  var functionCallString = 'JSON.stringify((' + osaFunction.toString() + ')(' + jsonArgs.join(',') + '));';
  var escapedCall = functionCallString.replace(/^\s+/g, ' ').replace(/\n/g, '').replace(/'/g, "'\\''");
  var executeString = "osascript -l JavaScript -e '" + escapedCall + "'";
  exec(executeString);
};

spotifyCmd.version('0.2.2');

spotifyCmd
  .command('play')
  .description('Start playback')
  .action(function(){
    spotifyCmd.osa(spotifyCmd.play)
  });

spotifyCmd
  .command('pause')
  .description('Pause playback')
  .action(function(){
    spotifyCmd.osa(spotifyCmd.pause);
  });

spotifyCmd
  .command('open')
  .description('open the spotify application')
  .action(function(){
    spotifyCmd.osa(spotifyCmd.open);
  });

spotifyCmd
  .command('quit')
  .description('close the spotify application')
  .action(function(){
    spotifyCmd.osa(spotifyCmd.quit);
  });

spotifyCmd
  .command('next')
  .description('play the next track')
  .action(function(){
    spotifyCmd.osa(spotifyCmd.next);
  });

spotifyCmd
  .command('previous')
  .description('play the previous track')
  .action(function(){
    spotifyCmd.osa(spotifyCmd.prev);
  });

spotifyCmd
  .command('prev')
  .description('play the previous track')
  .action(function(){
    spotifyCmd.osa(spotifyCmd.prev);
  });

spotifyCmd.play = function() {
  Application('Spotify').play();
};

spotifyCmd.pause = function() {
  Application('Spotify').pause();
};

spotifyCmd.open = function() {
  Application('Spotify').activate();
};

spotifyCmd.quit = function() {
  Application('Spotify').quit();
};

spotifyCmd.next = function() {
  Application('Spotify').nextTrack();
};

spotifyCmd.prev = function() {
  Application('Spotify').previousTrack();
};

spotifyCmd.parse(process.argv);
