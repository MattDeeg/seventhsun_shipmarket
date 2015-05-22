module.exports = {};

var container;
var stations = [];
var ships = [];

var config = require('./config');
var Station = require('./classes/station');
var Ship = require('./classes/ship');
module.exports.setup = function() {
  var PIXI = require('pixi.js');
  container = new PIXI.Container();

  stations = [];
  for (var i = 0; i < config.numStations; i++) {
    stations[i] = new Station();
    container.addChild(stations[i]);
  }
  Ship.stations = stations;

  ships = [];
  for (i = 0; i < config.numShips; i++) {
    ships[i] = new Ship();
    container.addChild(ships[i]);
  }

  return container;
};

module.exports.update = function() {
  for (var i = stations.length; i--;) {
    stations[i].update();
  }
  for (i = ships.length; i--;) {
    ships[i].update();
  }
};
