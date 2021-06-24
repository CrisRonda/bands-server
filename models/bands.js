const Band = require("./band");
class Bands {
  constructor() {
    this.bands = [];
  }

  addBand(band = new Band()) {
    if (this.bands.length < 7) this.bands.push(band);
  }

  getBands() {
    return this.bands;
  }

  deleteBand(id = "") {
    this.bands = this.bands.filter((band) => band.id !== id);
    return this.bands;
  }
  voteBand(id = "") {
    this.bands.map((band) => {
      if (band.id === id) {
        return { ...band, votes: band.votes++ };
      }
      return band;
    });
  }
}

module.exports = Bands;
