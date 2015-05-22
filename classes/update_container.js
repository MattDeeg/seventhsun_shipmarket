var PIXI = require('pixi.js');

function UpdateContainer() {
  PIXI.Container.call(this);
}

UpdateContainer.prototype = Object.create(PIXI.Container.prototype);
UpdateContainer.prototype.constructor = UpdateContainer;

UpdateContainer.prototype.update = function() {
  for (var i = this.children.length; i--;) {
    if (typeof this.children[i].update === 'function') {
      this.children[i].update();
    }
  }
};

module.exports = UpdateContainer;
