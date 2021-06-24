const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("El Cuarteto de Nos"));
bands.addBand(new Band("Heroes del Silencio"));
bands.addBand(new Band("Caramelos de Cianuro"));
bands.addBand(new Band("Amaranthe"));

io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("emitir-mensaje", (payload) => {
    client.broadcast.emit("nuevo-mensaje", payload);
  });

  client.on("vote-band", ({ id }) => {
    bands.voteBand(id);
    io.emit("active-bands", bands.getBands());
  });
  client.on("add-band", ({ name }) => {
    bands.addBand(new Band(name));
    io.emit("active-bands", bands.getBands());
  });
  client.on("delete-band", ({ id }) => {
    bands.deleteBand(id);
    io.emit("active-bands", bands.getBands());
  });
});
