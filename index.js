const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./socket");

const PORT = process.env.PORT | 4000;
const PUBLIC_PATH = path.resolve(__dirname, "public");

app.use(express.static(PUBLIC_PATH));

io.on("connection", (client) => {
  console.log("Cliente conectado");
  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(PORT, (err) => {
  if (err) {
    throw new Error("Ocurrio un error");
  }
  console.log(`Server Listen in ${PORT} `);
});
