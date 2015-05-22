var stationNames = [
  'Aahmes', 'Amenemhebi', 'Amentotankhatra', 'Ankhfkhons', 'Anon', 'Anp', 'Anputeleptuf', 'Ansapata', 'Anua', 'Anubis', 'Anum', 'Anzety',
  'Arienkhut', 'Asim', 'Aspurta', 'Asten', 'Asychis', 'Atakheramen', 'Bai', 'Bakari', 'Basa', 'Baut', 'Bennebenskhauf', 'Binra', 'Chafkem',
  'Dsja-khons', 'Edfu', 'Fadil', 'Fenyang', 'Hakizimana', 'Hapi-ankh', 'Har-ana-k-af-shat', 'Har-benen', 'Har-hor', 'Har-machis', 'He-rerem',
  'Heru', 'Heti', 'Hor-hiun-amif', 'Hui', 'Kambuzia', 'Ken-amen', 'Khaem-pe', 'Khuenaten', 'Khut-hotep', 'Ludim', 'Massui', 'Men-nu', 'Ment-em-saf',
  'Mentu-em-ankh', 'Met-su-khons', 'Methusuphis', 'Nasch-ti-nebef', 'Nepherites', 'Nubiti', 'Nun', 'Osir-hapi', 'Osymundyas', 'Pa-mau', 'Pa-ra-nefer',
  'Pah-os', 'Pasiuenkha', 'Pataikos', 'Pausiris', 'Pe-tep-munkh', 'Pen-en-aau', 'Pen-huiban', 'Pen-piei', 'Pent-aur', 'Per-ui', 'Pesahi', 'Pheles',
  'Pie-aei', 'Ptei', 'Ra-amen-mern-ba', 'Ra-nefer-ab', 'Ra-sha-ankh', 'Rashaken', 'Rhotamenti', 'Sa-ei-nub-eu', 'Se-ra-nefer-tai', 'Sebekem',
  'Sepi', 'Seti-peti-nubti', 'Shafra', 'Shakanasa', 'Sharu-sha-ta-kata', 'Sheshanka', 'Sma-em-nekht-ef', 'SobkSesochris', 'Ta', 'Tahu', 'Tehuti',
  'Thi', 'Thoth', 'Tota', 'Tum', 'Tutankhamun', 'Tutu', 'Uahbra', 'Uer-mu', 'Ur-atum', 'User-son', 'Yahya', 'Zuka'
];

var stationTextures = [
  new PIXI.Texture.fromImage('imgs/stations/blue.png'),
  new PIXI.Texture.fromImage('imgs/stations/green.png'),
  new PIXI.Texture.fromImage('imgs/stations/red.png'),
  new PIXI.Texture.fromImage('imgs/stations/yellow.png')
];

var TWO_PI = Math.PI * 2;
var MAX_ROTATION_SPEED = Math.PI * 0.02;
var util = require('../utils/fns');
var config = require('../config');
var Marketplace = require('./marketplace');

function getName() {
  var i = util.getRandomInt(stationNames.length);
  var name = stationNames[i];
  stationNames.splice(i, 1);
  return name;
}

function Station() {
  PIXI.Container.call(this);
  this.interactive = true;

  this.sprite = new PIXI.Sprite(stationTextures[util.getRandomInt(3)]);
  this.sprite.interactive = true;
  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.5;
  this.sprite.scale.x = 0.25;
  this.sprite.scale.y = 0.25;
  this.addChild(this.sprite);

  this.name = getName();
  this.text = new PIXI.Text(this.name, config.fonts.station);
  this.text.anchor.x = 0.5;
  this.text.anchor.y = -1;
  this.text.scale.x = 0.5;
  this.text.scale.y = 0.5;
  this.text.visible = false;
  this.addChild(this.text);

  this.position.x = util.getRandomInt(config.bounds.x[0], config.bounds.x[1]) | 0;
  this.position.y = util.getRandomInt(config.bounds.y[0], config.bounds.y[1]) | 0;

  this.population = util.getRandomInt(500, 1000);
  this.marketplace = new Marketplace(this.population);

  var self = this;
  this.click = function() {
    console.log(self);
  };

  this.sprite.mouseover = function() {
    self.text.visible = true;
  };

  this.sprite.mouseout = function() {
    self.text.visible = false;
  };

  this.rotationSpeed = util.getRandom(-MAX_ROTATION_SPEED, MAX_ROTATION_SPEED);
}

Station.prototype = Object.create(PIXI.Container.prototype);
Station.prototype.constructor = Station;

Station.prototype.update = function() {
  this.sprite.rotation = (this.sprite.rotation + this.rotationSpeed + TWO_PI) % TWO_PI;
};

module.exports = Station;
