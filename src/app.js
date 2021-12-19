const baseUrl = "";
const currentYear = "2021";
const years = [
  { nr: "2018", bgColor: "rgba(255, 99, 132, 0.2)", borderColor: "rgb(255, 99, 132)", },
  { nr: "2019", bgColor: "rgba(255, 205, 86, 0.2)", borderColor: "rgb(255, 205, 86)", },
  { nr: "2020", bgColor: "rgba(75, 192, 192, 0.2)", borderColor: "rgb(75, 192, 192)", },
  { nr: "2021", bgColor: "rgba(153, 102, 255, 0.2)", borderColor: "rgb(153, 102, 255)", },
];

Chart.register(ChartDataLabels);

// Helpers
const getById = (id) => document.getElementById(id);

function datalabelsYFormatter() {
  return {
    datalabels: {
      color: "rgba(0, 0, 0, 0.9)",
      formatter: (value, ctx) => value.y || "",
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

function singleAnswerReducer(key) {
  return (result, current) => {
    let item = result.find(i => i.x === current[key]);
    if (!item) {
      item = { x: current[key], y: 0 };
      result.push(item);
    }
    item.y++;
    return result;
  };
}

function multiAnswerReducer(key) {
  return (result, current) => {
    current[key].forEach(value => {
      let item = result.find(i => i.x === value);
      if (!item) {
        item = { x: value, y: 0 };
        result.push(item);
      }
      item.y++;
    });
    return result;
  };
}

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

  // Amend data
  alldata.forEach(year => 
    year.responses.forEach(r =>
      r.utcResponseDay = parseInt(r["Timestamp"].match(/\d\d\d\d-\d\d-(\d\d)T.+/)[1], 10)
    )
  );

  const charts = {};

  ////////////////////////////////////////
  // operatingSystem
  let data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      data: year
        .responses
        .reduce(singleAnswerReducer("OS"), [])
        .filter(i => i.y > 20) // TODO: Don"t just filter the rest out!
    }))
  };
  
  charts["operatingSystem"] = new Chart(getById("operatingSystem").getContext("2d"), {
    type: "bar",
    data,
    options: {
      aspectRatio: 1.3,
      plugins: {
        ...chartTitle("Operating System"),
        ...datalabelsYFormatter(),
      },
      scales: {
        y: scaleWithText("Number of responses"),
      },
    },
  });

  ////////////////////////////////////////
  // participationReason
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      data: year
        .responses
        .reduce(multiAnswerReducer("Reason_for_participating"), [])
        .filter(i => i.y > 20) // TODO: Don"t just filter the rest out!
    }))
  };
  
  data.datasets.forEach(ds => ds.data.sort((a, b) => b.y - a.y));

  charts["participationReason"] = new Chart(getById("participationReason").getContext("2d"), {
    type: "bar",
    data,
    options: {
      aspectRatio: 1.3,
      plugins: {
        ...chartTitle("Reason for participating"),
        ...datalabelsYFormatter(),
      },
    },
  });

  ////////////////////////////////////////
  // language
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      data: year
        .responses
        .reduce(multiAnswerReducer("Languages"), [])
        .filter(i => i.y > 40) // TODO: Don"t just filter the rest out!
    }))
  };
  
  data.datasets.forEach(ds => ds.data.sort((a, b) => b.y - a.y));

  charts["language"] = new Chart(getById("language").getContext("2d"), {
    type: "bar",
    data,
    options: {
      aspectRatio: 1.3,
      plugins: {
        ...chartTitle("Language"),
        ...datalabelsYFormatter(),
      },
    },
  });

  ////////////////////////////////////////
  // ide
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      data: year
        .responses
        .reduce(multiAnswerReducer("IDEs"), [])
        .filter(i => i.y > 40) // TODO: Don"t just filter the rest out!
    }))
  };
  
  data.datasets.forEach(ds => ds.data.sort((a, b) => b.y - a.y));

  charts["ide"] = new Chart(getById("ide").getContext("2d"), {
    type: "bar",
    data,
    options: {
      aspectRatio: 1.3,
      plugins: {
        ...chartTitle("IDE"),
        ...datalabelsYFormatter(),
      },
    },
  });

  ////////////////////////////////////////
  // leaderboardsGlobal
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      data: year
        .responses
        .reduce(singleAnswerReducer("Global_Leaderboard_Participation"), [])
        .filter(i => i.y > 40) // TODO: Don"t just filter the rest out!
    }))
  };
  
  data.datasets.forEach(ds => ds.data.sort((a, b) => b.y - a.y));

  charts["leaderboardsGlobal"] = new Chart(getById("leaderboardsGlobal").getContext("2d"), {
    type: "bar",
    data,
    options: {
      aspectRatio: 1.3,
      plugins: {
        ...chartTitle("Global Leaderboard Participation"),
        ...datalabelsYFormatter(),
      },
    },
  });

  ////////////////////////////////////////
  // leaderboardsPrivate
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      data: year
        .responses
        .reduce(singleAnswerReducer("Private_Leaderboard_Count"), [])
        .filter(i => i.y > 40) // TODO: Don"t just filter the rest out!
    }))
  };
  
  data.datasets.forEach(ds => ds.data.sort((a, b) => a.x.localeCompare(b.x)));

  charts["leaderboardsPrivate"] = new Chart(getById("leaderboardsPrivate").getContext("2d"), {
    type: "bar",
    data,
    options: {
      aspectRatio: 1.3,
      plugins: {
        ...chartTitle("Nr. of Private Leaderboards"),
        ...datalabelsYFormatter(),
      },
    },
  });

  ////////////////////////////////////////
  // responsesPerDay
  const defaultDataPoints = () => [...Array(25).keys()].map(day => ({ x: day + 1, y: 0 }));
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      showLine: true,
      data: year
        .responses
        .reduce(singleAnswerReducer("utcResponseDay"), defaultDataPoints())
    }))
  };
  
  data.datasets.forEach(ds => {
    ds.data.sort((a, b) => a.x - b.x);
    for (let i = 1; i < 25; i++) {
      ds.data[i].y += ds.data[i-1].y;
    }
  });

  charts["responsesPerDay"] = new Chart(getById("responsesPerDay").getContext("2d"), {
    type: "scatter",
    data,
    options: {
      aspectRatio: 1.3,
      plugins: {
        ...chartTitle("Survey response per (UTC) day in December"),
        datalabels: {
          display: false,
        },
      },
      scales: {
        x: {
          min: 1,
          max: 25,
          ticks: {
            stepSize: 1,
          },
        }
      },
    },
  });

});