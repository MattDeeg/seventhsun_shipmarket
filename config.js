module.exports = {
  fonts: {
    station: {
      font: '32px icelandregular',
      fill: 0xFFFFFF,
      stroke: 0x000000,
      strokeThickness: 4
    },
    panel: {
      font: '60px icelandregular',
      fill: 0x999999,
      stroke: 0x777777,
      strokeThickness: 4
    }
  },
  bounds: {
    x: [0, 2000],
    y: [0, 2000]
  },
  numStations: 20,
  numShips: 10,
  commodities: [
    {
      name: 'Fuel',
      basePrice: 500,
      volatility: 0,
      availability: 1
    },
    {
      name: 'Gems',
      basePrice: 10000,
      volatility: 0,
      availability: 1
    },
    {
      name: 'Electronics',
      basePrice: 2000,
      volatility: 0,
      availability: 1
    }
  ]
};
