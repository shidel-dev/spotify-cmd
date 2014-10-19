#!/usr/bin/env node
/*
 * spotify-cli
 * https://github.com/shidel-dev/spotify-cli
 *
 * Copyright (c) 2014 shidel.dev
 * Licensed under the MIT license.
 */

var exec = require('child_process').exec;
var spotifyCli = require('commander');


// Exec function as a string in osa
function osa(osaFunction) {
  var args = Array.prototype.slice.call(arguments, 1, arguments.length - 1);
  var done = arguments[arguments.length - 1];
  var jsonArgs = args.map(JSON.stringify);
  var functionCallString = 'JSON.stringify((' + osaFunction.toString() + ')(' + jsonArgs.join(',') + '));';
  var escapedCall = functionCallString.replace(/^\s+/g, ' ').replace(/\n/g, '').replace(/'/g, "'\\''");
  var executeString = "osascript -l JavaScript -e '" + escapedCall + "'";
  exec(executeString);
};

spotifyCli.version('0.1.0');

spotifyCli
  .command('play')
  .description('Start playback')
  .action(function(){
    osa(spotifyCli.play)
  });

spotifyCli
  .command('pause')
  .description('Pause playback')
  .action(function(){
    osa(spotifyCli.pause)
  });

spotifyCli
  .command('open')
  .description('open the spotify application')
  .action(function(){
    osa(spotifyCli.open)
  });

spotifyCli
  .command('quit')
  .description('close the spotify application')
  .action(function(){
    osa(spotifyCli.quit)
  });

spotifyCli
  .command('next')
  .description('play the next track')
  .action(function(){
    osa(spotifyCli.next)
  });

spotifyCli
  .command('previous')
  .description('play the previous track')
  .action(function(){
    osa(spotifyCli.prev)
  });

spotifyCli
  .command('prev')
  .description('play the previous track')
  .action(function(){
    osa(spotifyCli.prev)
  });

spotifyCli.play = function() {
  Application('Spotify').play();
};

spotifyCli.pause = function() {
  Application('Spotify').pause();
};

spotifyCli.open = function() {
  Application('Spotify').activate();
};

spotifyCli.quit = function() {
  Application('Spotify').quit();
};

spotifyCli.next = function() {
  Application('Spotify').nextTrack();
};

spotifyCli.prev = function() {
  Application('Spotify').previousTrack();
};

spotifyCli.parse(process.argv);
