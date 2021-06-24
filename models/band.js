const { v4: uuidV4 } = require("uuid");

class Band {
  constructor(name) {
    this.id = uuidV4();
    this.name = name;
    this.votes = 1;
  }
}

module.exports = Band;
