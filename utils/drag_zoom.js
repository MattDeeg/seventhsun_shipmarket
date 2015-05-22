var winSize = require('./window_size');

var DragZoom = function(elem, x, y, z, bounds) {
  this.x = x;
  this.y = y;
  this.zoom = z;
  this.bounds = bounds;
  this.dragging = false;
  this.previousPos = null;

  this.elem = elem;
  this.sprites = [];

  var start = this.dragStart.bind(this);
  var move = this.dragMove.bind(this);
  var end = this.dragEnd.bind(this);
  elem.addEventListener('mousedown', start);
  elem.addEventListener('touchstart', start);
  elem.addEventListener('mousemove', move);
  elem.addEventListener('touchmove', move);
  elem.addEventListener('mouseup', end);
  elem.addEventListener('touchend', end);
  document.addEventListener('mouseleave', end);

  elem.addEventListener('mousewheel', this.wheel.bind(this));
};

function getEventCoordinates(e) {
  var obj = (e.touches && e.touches.length === 1) ? e.touches[0] : e;
  return {
    x: obj.pageX,
    y: obj.pageY
  };
}

DragZoom.prototype.dragStart = function(e) {
  this.dragging = true;
  this.previousPos = getEventCoordinates(e);
};

DragZoom.prototype.dragMove = function(e) {
  if (this.dragging) {
    var thisPos = getEventCoordinates(e);

    this.x += thisPos.x - this.previousPos.x;
    this.y += thisPos.y - this.previousPos.y;

    this.doBounds();

    this.previousPos = thisPos;
  }
};

DragZoom.prototype.dragEnd = function() {
  this.dragging = false;
};

DragZoom.prototype.wheel = function(e) {
  this.zoom += 0.1 * (e.wheelDelta > 0 ? 1 : -1);
  this.zoom = Math.min(1.5, Math.max(0.5, this.zoom));
  this.doBounds();
};

var eventBus = require('./event_bus');
DragZoom.prototype.doBounds = function() {
  var bX = this.bounds.x;
  var bY = this.bounds.y;
  var fuzz = 50;
  var z = this.zoom;

  var minX = (-bX[1] - fuzz) * z + winSize.width;
  var maxX = (bX[0] + fuzz) * z;

  var minY = (-bY[1] - fuzz) * z + winSize.height;
  var maxY = (bY[0] + fuzz) * z;

  this.x = Math.min(maxX, Math.max(minX, this.x));
  this.y = Math.min(maxY, Math.max(minY, this.y));

  eventBus.emit('update', this);
};

DragZoom.prototype.addEventListener = function(type, handler) {
  var self = this;
  this.elem.addEventListener(type, function(e) {
    if (e.data === self) {
      handler(e);
    }
  });
};

DragZoom.prototype.addSprite = function(sprite, ratio) {

};

module.exports = function(elem, x, y, zoom, bounds) {
  return new DragZoom(elem, x, y, zoom, bounds);
};
