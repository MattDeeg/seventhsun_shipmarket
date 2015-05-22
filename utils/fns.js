module.exports = {};

var getRandomInt = module.exports.getRandomInt = function(min, max) {
  if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomInt = module.exports.getRandom = function(min, max) {
  if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
};

window.getVectorAngle = module.exports.getVectorAngle = function(current, target) {
  return Math.atan2(target.y - current.y, target.x - current.x);
};

window.getMovementVector = module.exports.getMovementVector = function(angle, speed) {
  var x = Math.sin(angle) * speed;
  var y = Math.cos(angle) * -speed;
  return { x: x, y: y };
};
