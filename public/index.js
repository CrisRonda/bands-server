const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
let myNewChart;
let ids = [];
let labels = [];
let colors = [];
const socket = io();

const snackbar = document.getElementById("snackbar");
const canvas = document.querySelector("#my-canvas");

for (let index = 0; index < 150; index++) {
  colors.push(randomColor());
}

function showSnackbar(bandName) {
  snackbar.className = "show";
  snackbar.textContent = "+1 vote: " + bandName;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

function socketConnection() {
  socket.on("connect", function () {
    console.log("Conectado con el server");
  });
  socket.on("disconnect", function () {
    console.log("Desconectado con el server");
  });
  socket.on("active-bands", function (payload) {
    renderChart(payload);
  });
}

function renderChart(data) {
  const ctx = canvas.getContext("2d");
  labels = data.map((item) => item.name);
  const _data = data.map((item) => item.votes);
  ids = data.map((item) => item.id);
  if (myNewChart != undefined) {
    myNewChart.destroy();
  }

  myNewChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          label: "App Bands Flutter!!!",
          backgroundColor: colors,
          data: _data,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "App bands flutter",
      },
      responsive: true,
      // maintainAspectRatio: false,
      cutoutPercentage: 80,
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return (
              data["labels"][tooltipItem["index"]] +
              ": " +
              data["datasets"][0]["data"][tooltipItem["index"]] +
              " Votes"
            );
          },
        },
      },
    },
  });
}
canvas.onclick = function (evt) {
  var activePoints = myNewChart.getElementsAtEvent(evt);
  if (activePoints[0]) {
    var chartData = activePoints[0]["_chart"].config.data;
    var idx = activePoints[0]["_index"];

    var label = chartData.labels[idx];

    const indexSelected = labels.findIndex((item) => item === label);
    socket.emit("vote-band", { id: ids[indexSelected] });
    showSnackbar(label);
  }
};
function main() {
  socketConnection();
}
main();
