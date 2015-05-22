var shipTextures = [
  new PIXI.Texture.fromImage('imgs/ships/ship1_blue.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship1_green.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship1_orange.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship1_red.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship2_blue.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship2_green.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship2_orange.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship2_red.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship3_blue.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship3_green.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship3_orange.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship3_red.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship4_black.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship4_blue.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship4_green.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship4_red.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship5_black.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship5_blue.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship5_green.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship5_red.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship6_black.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship6_blue.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship6_green.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship6_red.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship7_black.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship7_blue.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship7_green.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship7_red.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship8_black.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship8_blue.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship8_green.png'),
  new PIXI.Texture.fromImage('imgs/ships/ship8_red.png')
];

var util = require('../utils/fns');
var config = require('../config');

function Ship() {
  PIXI.Sprite.call(this, shipTextures[util.getRandomInt(shipTextures.length)]);
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.scale.x = 0.1;
  this.scale.y = 0.1;

  this.location = Ship.stations[util.getRandomInt(Ship.stations.length)];
  this.position.x = this.location.position.x;
  this.position.y = this.location.position.y;

  this.inFlight = false;
  this.speed = util.getRandom(1, 2);
  this.setRandomLaunch();
}

Ship.prototype = Object.create(PIXI.Sprite.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.setRandomLaunch = function() {
  setTimeout(function() {
    this.launch();
  }.bind(this), util.getRandomInt(1000, 5000));
};

function getLaunchTarget(currentStation) {
  var validStations = Ship.stations.slice().filter(function(st) {
    return st !== currentStation;
  });
  return validStations[util.getRandomInt(validStations.length)];
}

Ship.prototype.launch = function() {
  if (!this.inFlight) {
    this.inFlight = true;
    this.target = getLaunchTarget(this.location);
    this.rotation = util.getVectorAngle(this.position, this.target.position) + Math.PI / 2;
  }
};

Ship.prototype.update = function() {
  if (this.inFlight) {
    var vector = util.getMovementVector(this.rotation, this.speed);
    this.position.x += vector.x;
    this.position.y += vector.y;
    if (vector.x > 0 && this.position.x > this.target.position.x ||
        vector.x < 0 && this.position.x < this.target.position.x) {
      if (vector.y > 0 && this.position.y > this.target.position.y ||
          vector.y < 0 && this.position.y < this.target.position.y) {
        // this.rotation = Math.PI / 2;
        this.position.x = this.target.position.x;
        this.position.y = this.target.position.y;
        this.location = this.target;
        this.inFlight = false;
        this.setRandomLaunch();
      }
    }
  }
};

module.exports = Ship;
