var PF = require('pathfinding');
var matrix = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0],
];
var grid = new PF.Grid(matrix);
var finder = new PF.AStarFinder();
var path = finder.findPath(1, 2, 4, 2, grid);

/////////////////////////////////////////////////////////////////////

window.onload = function() {
  var eventBus = require('./utils/event_bus');
  var PIXI = require('pixi.js');
  window.PIXI = PIXI;
  var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  // create an new instance of a pixi stage
  var interactive = true;
  var stage = new PIXI.Stage(0x66FF99, interactive);
  window.stage = stage;

  var winSize = require('./utils/window_size');

  var config = require('./config');
  var bounds = config.bounds;
  var startX = bounds.x[1] / -2;
  var startY = bounds.y[1] / -2;

  // create a renderer instance
  // var renderer = new PIXI.CanvasRenderer(winSize.width, winSize.height);
  var renderer = PIXI.autoDetectRenderer(winSize.width, winSize.height);

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimFrame( animate );

  // create a texture from an image path
  var texture = PIXI.Texture.fromImage('imgs/bg.jpg');
  var tilingSprite = new PIXI.extras.TilingSprite(texture, winSize.width, winSize.height);
  stage.addChild(tilingSprite);

  var UpdateContainer = require('./classes/update_container');
  var stageContainer = new UpdateContainer();
  stage.addChild(stageContainer);

  var Grid = require('./classes/grid');
  var graphics = new Grid(0x2DC8D2, 0xFF0000, bounds);

  window.stage = stage;

  var dragZoom = require('./utils/drag_zoom');
  var gridPos = dragZoom(document, startX, startY, 1, bounds);
  window.gridPos = gridPos;

  var setPositions = function() {
    stageContainer.position.x = gridPos.x;
    stageContainer.position.y = gridPos.y;
    stageContainer.scale.x = gridPos.zoom;
    stageContainer.scale.y = gridPos.zoom;

    tilingSprite.tilePosition.x = gridPos.x * 0.8;
    tilingSprite.tilePosition.y = gridPos.y * 0.8;
    tilingSprite.tileScale.x = gridPos.zoom * 0.4;
    tilingSprite.tileScale.y = gridPos.zoom * 0.4;
  };
  eventBus.on('update', setPositions);
  setPositions();

  var world = require('./world');
  stageContainer.addChild(graphics);
  stageContainer.addChild(world.setup());

  function animate() {
    for (var i = stage.children.length; i--;) {
      if (typeof stage.children[i].update === 'function') {
        stage.children[i].update();
      }
    }
    world.update();

    requestAnimFrame( animate );

    // render the stage
    renderer.render(stage);
  }
};
