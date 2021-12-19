const baseUrl = "";
const currentYear = "2021";
const years = [
  { nr: "2018", bgColor: "rgba(255, 99, 132, 0.2)", borderColor: "rgb(255, 99, 132)", },
  { nr: "2019", bgColor: "rgba(255, 205, 86, 0.2)", borderColor: "rgb(255, 205, 86)", },
  { nr: "2020", bgColor: "rgba(75, 192, 192, 0.2)", borderColor: "rgb(75, 192, 192)", },
  { nr: "2021", bgColor: "rgba(153, 102, 255, 0.2)", borderColor: "rgb(153, 102, 255)", },
];

// Helpers
const getById = (id) => document.getElementById(id);

function datalabelsYFormatter() {
  return {
    datalabels: {
      color: "rgba(0, 0, 0, 0.9)",
      formatter: (value, ctx) => value.y,
    }
  };
}

function chartTitle(text) {
  return {
    title: {
      display: true,
      font: { size: 24, },
      text,
    }
  };
}

function scaleWithText(text) {
  return {
    title: {
      display: true,
      font: { size: 14, },
      text,
    }
  };
}

function yearDatasetDefaults(year) {
  return {
    label: year.nr,
    backgroundColor: year.bgColor,
    borderColor: year.borderColor,
    borderWidth: 1,
    hidden: year.nr !== currentYear,
  };
}

Chart.register(ChartDataLabels);

window.addEventListener("DOMContentLoaded", async () => {
  // TODO: try/catch around loading the data
  // TODO: Parallelize fetches
  const alldata = [];
  await Promise.all(years.map(async year => {
    const response = await fetch(`${baseUrl}/${year.nr}/results-sanitzed.json`);
    alldata.push({
      ...year,
      responses: await response.json(),
    })
  }));

  alldata.sort((a, b) => b.nr.localeCompare(a.nr));

  const charts = {};

  // operatingSystem
  let data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      data: year.responses.reduce((result, current) => {
        let item = result.find(i => i.x === current["OS"]);
        if (!item) {
          item = { x: current["OS"], y: 0 };
          result.push(item);
        }
        item.y++;
        return result;
      }, []).filter(i => i.y > 20) // TODO: Don"t just filter the rest out!
    }))
  };
  
  charts["operatingSystem"] = new Chart(getById("operatingSystem").getContext("2d"), {
    type: "bar",
    data,
    options: {
      plugins: {
        ...chartTitle("Operating System"),
        ...datalabelsYFormatter(),
      },
      scales: {
        y: scaleWithText("Number of responses"),
      },
    },
  });


});