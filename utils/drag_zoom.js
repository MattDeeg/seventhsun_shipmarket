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
  this.zoom = Math.min(2, Math.max(0.5, this.zoom));
  this.doBounds();
};

DragZoom.prototype.doBounds = function() {
  var bX = this.bounds.x;
  var bY = this.bounds.y;
  var fuzz = 50;
  var z = this.zoom;
  this.x = Math.min(bX[1] + fuzz * z, Math.max((bX[0] - fuzz) * z + winSize.width, this.x));
  this.y = Math.min(bY[1] + fuzz * z, Math.max((bY[0] - fuzz) * z + winSize.height, this.y));

  var event = document.createEvent('HTMLEvents');
  event.initEvent('update', true, false);
  event.data = this;
  this.elem.dispatchEvent(event);
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
