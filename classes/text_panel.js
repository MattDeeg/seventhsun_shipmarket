var PIXI = require('pixi.js');
var UpdateContainer = require('./update_container');
var config = require('../config');
var eventBus = require('../utils/event_bus');
var extend = require('lodash/object/extend');

(function() {
  var scrollStack = [];
  eventBus.on('setScrollable', function(textPanel) {
    scrollStack.push(textPanel);
  });
  eventBus.on('clearScrollable', function(textPanel) {
    scrollStack = scrollStack.filter(function(w) {
      return w !== textPanel;
    });
  });

  document.addEventListener('mousewheel', function(e) {
    if (scrollStack.length) {
      e.stopImmediatePropagation();

      var textPanel = scrollStack[scrollStack.length - 1];
      var textObj = textPanel.text;
      if (textObj.maxScroll < 0) {
        var delta = e.wheelDelta > 0 ? 1 : -1;
        textObj.position.y += delta * (textObj.lineHeight || 10);
        textObj.position.y = Math.max(textObj.maxScroll, Math.min(textObj.position.y, textObj.minScroll));

        var scrollBar = textPanel.scrollBar;
        scrollBar.position.y += delta * scrollBar.scrollBy;
        scrollBar.position.y = Math.max(scrollBar.maxScroll, Math.min(scrollBar.position.y, scrollBar.minScroll));
      }
    }
  }, true);
})();



function TextPanel(text, height, width, padding) {
  UpdateContainer.call(this);

  this.interactive = true;
  this.mouseover = function() {
    eventBus.emit('setScrollable', this);
  };
  this.mouseout = function() {
    eventBus.emit('clearScrollable', this);
  };

  var twoPadding = padding * 2;

  //// Mask for text overflow

  this.maskRect = new PIXI.Graphics();
  this.maskRect.beginFill();
  this.maskRect.drawRect(0, 0, width - twoPadding - 5, height - twoPadding);
  this.maskRect.position.x = padding;
  this.maskRect.position.y = padding;
  this.maskRect.endFill();

  //// Text content

  this.text = new PIXI.Text(text, extend(config.fonts.panel, {
    wordWrap: true,
    wordWrapWidth: (width - twoPadding) * 2 - 10
  }));
  this.text.position.x = padding;
  this.text.position.y = padding;
  this.text.scale.x = 0.5;
  this.text.scale.y = 0.5;
  this.text.mask = this.maskRect;

  // Properties for scrolling
  var fontProperties = this.text.determineFontProperties(this.text.style.font);
  this.text.lineHeight = fontProperties.fontSize + this.text.style.strokeThickness;
  this.text.lineHeight *= this.text.scale.y;

  var numLinesText = Math.ceil(this.text.height / this.text.lineHeight);
  var numVisibleLinesText = Math.floor((height - twoPadding) / this.text.lineHeight);

  this.text.minScroll = padding;
  this.text.maxScroll = padding + this.text.lineHeight * (numVisibleLinesText - numLinesText);

  //// Background coloring

  this.bg = new PIXI.Graphics();
  this.bg.beginFill(0xCDCDCD, 1);
  this.bg.lineStyle(3, 0x717171, 1);
  this.bg.drawRect(0, 0, width, height);
  this.bg.endFill();
  this.bg.position.x = 0;
  this.bg.position.y = 0;

  //// Scrollbar

  this.scrollBar = new PIXI.Graphics();
  this.scrollBar.beginFill(0x666666, 1);
  var gutterHeight = height - twoPadding;

  this.scrollBar.drawRect(0, 0, 5, gutterHeight * (numVisibleLinesText / numLinesText));
  this.scrollBar.endFill();
  this.scrollBar.position.x = width - padding;
  this.scrollBar.position.y = padding;
  this.scrollBar.scrollBy = -gutterHeight / numLinesText;
  this.scrollBar.minScroll = padding + -this.scrollBar.scrollBy * (numLinesText - numVisibleLinesText);
  this.scrollBar.maxScroll = padding;

  this.addChild(this.bg);
  this.addChild(this.maskRect);
  this.addChild(this.scrollBar);
  this.addChild(this.text);
}

TextPanel.prototype = Object.create(UpdateContainer.prototype);
TextPanel.prototype.constructor = TextPanel;

TextPanel.prototype.update = function() {
  for (var i = this.children.length; i--;) {
    if (typeof this.children[i].update === 'function') {
      this.children[i].update();
    }
  }
};

module.exports = TextPanel;
