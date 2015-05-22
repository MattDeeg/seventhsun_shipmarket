var config = require('../config');
var commodities = config.commodities;
var util = require('../utils/fns');

function Marketplace(population) {
  var c;
  for (var i = 0; i < commodities.length; i++) {
    c = commodities[i];
    this[c.name] = {
      unit: c,
      quantity: population * c.availability * util.getRandom(0.5, 1.5),
      price: c.basePrice * util.getRandom(0.5, 1.5)
    };
  }
}

Marketplace.purchase = function(ship) {

};

module.exports = Marketplace;
