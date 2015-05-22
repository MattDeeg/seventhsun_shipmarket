var PIXI = require('pixi.js');
var winSize = require('../utils/window_size');

function Grid (lineColor, boundsColor, bounds) {
  PIXI.Container.call(this);

  this.grid = new PIXI.Graphics();

  this.border = new PIXI.Graphics();

  this.lineColor = lineColor;
  this.boundsColor = boundsColor;
  this.offsetBounds = bounds;

  this.addChild(this.grid);
  this.addChild(this.border);
}

Grid.prototype = Object.create(PIXI.Container.prototype);
Grid.prototype.constructor = Grid;

Grid.prototype.update = function() {
  var gridSize = 100;
  this.grid.clear();
  this.border.clear();

  var filterX = new PIXI.filters.BlurXFilter();
  filterX.blur = 1;

  var filterY = new PIXI.filters.BlurYFilter();
  filterY.blur = 1;

  this.grid.filters = [ filterX, filterY ];
  this.border.filters = [ filterX, filterY ];

  var bX = this.offsetBounds.x;
  var bY = this.offsetBounds.y;

  this.grid.lineStyle(2, 0x2DC8D2, 1);
  for (var x = bX[0]; x < bX[1]; x += gridSize) {
    this.grid.moveTo(x, 0);
    this.grid.lineTo(x, bY[1]);
  }
  this.grid.endFill();

  for (var y = bY[0]; y < bY[1]; y += gridSize) {
    this.grid.moveTo(0, y);
    this.grid.lineTo(bX[1], y);
  }
  this.grid.endFill();

  this.border.lineStyle(2, 0xFF0000, 1);
  this.border.moveTo(bX[0], bY[0]);
  this.border.lineTo(bX[1], bY[0]);
  this.border.lineTo(bX[1], bY[1]);
  this.border.lineTo(bX[0], bY[1]);
  this.border.lineTo(bX[0], bY[0]);

  this.border.endFill();
};

module.exports = Grid;
