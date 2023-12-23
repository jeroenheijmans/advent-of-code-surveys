const baseUrl = "";
const currentYear = "2023";
const years = [
  { nr: "2018", bgColor: "rgba(208, 203, 60, 0.2)", borderColor: "rgb(208, 203, 60, 0.75)", pointStyle: 'circle' },
  { nr: "2019", bgColor: "rgba(60, 208, 106, 0.2)", borderColor: "rgb(60, 208, 106, 0.75)", pointStyle: 'star' },
  { nr: "2020", bgColor: "rgba(75, 192, 192, 0.2)", borderColor: "rgb(75, 192, 192, 0.75)", pointStyle: 'rect' },
  { nr: "2021", bgColor: "rgba(153, 102, 255, 0.2)", borderColor: "rgb(153, 102, 255, 0.75)", pointStyle: 'triangle' },
  { nr: "2022", bgColor: "rgba(208, 60, 88, 0.2)", borderColor: "rgb(208, 60, 88, 0.75)", pointStyle: 'rectRot' },
  { nr: "2023", bgColor: "rgba(208, 102, 60, 0.2)", borderColor: "rgb(208, 102, 60, 0.75)", pointStyle: 'crossRot' },
];

Chart.register(ChartDataLabels);

Chart.defaults.color = "#E0DEDE";
Chart.defaults.scale.grid.color = "rgba(255, 255, 255, 0.1)";
Chart.defaults.aspectRatio = Math.min(screen.width, window.innerWidth) < 960 ? 1 : 1.75; // TODO: Evaluate this on screen resize
Chart.defaults.plugins.tooltip.callbacks.label = (context) => {
  let label = context.dataset.label || "";
  if (label) label += ": ";
  if (context.parsed.y !== null) label += context.formattedValue;
  if (context.dataset.data[context.dataIndex].isPercentage) label += "%";
  return label;
};

// Helpers
const getById = (id) => document.getElementById(id);
const createElement = (tag, text = "") => { const el = document.createElement(tag); el.innerText = text; return el; }

function datalabelsYFormatter(options = { withLabel: false, alwaysShow: false }) {
  return {
    datalabels: {
      anchor: (context) => context.chart.getVisibleDatasetCount() <= 1 ? "end" : "center",
      align: (context) => context.chart.getVisibleDatasetCount() <= 1 ? "end" : "center",
      display: (context) => options.alwaysShow || context.chart.getVisibleDatasetCount() <= 3,
      color: "rgba(255, 255, 255, 0.8)",
      textAlign: "center",
      rotation: (context) => {
        if (options.alwaysShow) return 0;
        const visibleDataSets = context.chart.getVisibleDatasetCount()
        return visibleDataSets <= 1 ? 0 : visibleDataSets <= 3 ? -90 : 0
      },
      formatter: (value, ctx) => value.y
        ? (value.isPercentage ? value.y.toFixed(1) + "%" : value.y) 
          + (options.withLabel ? `\n(${ctx.dataset.label})` : "")
        : "",
    }
  };
}

function chartTitle(text, subtitle) {
  return {
    title: {
      display: true,
      font: { size: 24, weight: "normal", },
      text,
    },
    subtitle: {
      display: !!subtitle,
      text: subtitle,
    },
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
    radius: 4,
    pointStyle: year.pointStyle,
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

function percentageMapperFor(year) {
  return point => {
    point.absolute = point.y;
    point.isPercentage = true;
    point.y = point.y / year.responses.length * 100;
    return point;
  };
}

function ySorterWithFixedEndItems(endItems = []) {
  return (a, b) => {
    if (a.x === b.x) return 0;
    if (endItems.includes(a.x)) return 1;
    if (endItems.includes(b.x)) return -1;
    const delta = b.y - a.y;
    return delta !== 0 ? delta : a.x.localeCompare(b.x);
  };
}

function ySorter() {
  return ySorterWithFixedEndItems([]);
}

function xSorter() {
  return (a, b) => a.x.localeCompare(b.x);
}

// Apologies for this name, and apologies for such a "mutable" (mutant?) method
// TODO: Wrangle some JavaScript to make this nicer, more functional...
function mutateDataSetsToGroupRestItemsUnderYValue(data, yThreshold) {
  const shownDataPoints = data.datasets.map(ds => ds.data.filter(i => i.y > yThreshold).map(i => i.x)).flat();
  data.datasets.forEach(ds => ds.data = ds.data.reduce((result, current) => {
    if (!shownDataPoints.includes(current.x)) {
      let item = result.find(i => i.x === "Other...");
      if (!item) {
        item = { x: "Other...", y: 0, isPercentage: current.isPercentage };
        result.push(item);
      }
      item.y += current.y;
    } else {
      result.push(current);
    }
    return result;
  }, []));
}

// We sort datasets LTR from lowest year to most recent year. This causes
// bars to appear in the order they are given in the lowest year, but it
// might be hidden by default so we prefer forcing a sort by explicitly
// setting labels from the most recent year.
function mutateDataAddLabelsToForceOrderForMostRecentYear(data) {
  data.labels = data.datasets.at(-1).data.map(point => point.x)
}

// It's nice to have nearly no dependencies, but wow building some html
// without a framework or templating library is cumbersome. Anyways, it
// keeps things simple for now, so...
function wireUpDataTableFor(chartData, title, subject) {
  // Cheap clone setup, because we want our own private copy of this data:
  chartData = JSON.parse(JSON.stringify(chartData));

  const container = getById(`${subject}Dump`);
  const button = container.appendChild(createElement("button", "Toggle data table..."));
  let tableGenerated = false;
  let scrollWrapper = null;
  
  function generateTable() {
    scrollWrapper = container.appendChild(createElement("div"));
    scrollWrapper.classList.add("datatable-scroll-wrapper");
    scrollWrapper.style.display = "none";

    scrollWrapper.style.maxWidth = (container.offsetWidth - 4) + "px";

    const table = scrollWrapper.appendChild(createElement("table"));

    table.classList.add("datatable");
  
    chartData.datasets.forEach(ds => ds.data.sort(ySorter()));
  
    let thead = table.appendChild(createElement("thead"));
    let tbody = table.appendChild(createElement("tbody"));
    let tr = thead.appendChild(createElement("tr"));
    let th = tr.appendChild(createElement("th", title));
  
    years.forEach(year => {
      let thYear = tr.appendChild(createElement("th", year.nr + (year.nr === currentYear ? " ⬇" : "")));
      const responseCount = chartData.datasets.find(ds => ds.label === year.nr)?.responseCount;
      if (responseCount) {
        let responseCountSpan = thYear.appendChild(createElement("p", `N=${responseCount}`))
        responseCountSpan.style.fontSize = "0.7rem";
        responseCountSpan.style.whiteSpace = "nowrap";
        responseCountSpan.style.opacity = 0.6;
        responseCountSpan.style.marginTop = 0;
      }
    });
    
    const rows = {};
  
    chartData.datasets.toSorted((a, b) => b.label.localeCompare(a.label)).forEach(ds => ds.data.forEach(i => {
      if (!rows.hasOwnProperty(i.x)) {
        let row = { tr: tbody.appendChild(createElement("tr")) };
        let rowTh = row.tr.appendChild(createElement("th", i.x));

        // No worry for injection we only set innerText. But as a workaround we
        // do want to sniff out entries with super long "words" (usually hrefs)
        // and let the browser then break it more agressively, so the table will
        // render nicely on small devices.
        if (i.x.match(/\S{16,}/)) rowTh.style.wordBreak = "break-all";

        years.forEach(year => {
          row[year.nr] = row.tr.appendChild(createElement("td")).appendChild(createElement("div"));
          row[year.nr].classList.add("rawdata")
        });
        rows[i.x] = row;
      }
      rows[i.x][ds.label].appendChild(createElement("span", i.absolute));
      rows[i.x][ds.label].appendChild(createElement("span", `${i.y.toFixed(1)}%`));
    }));

    tableGenerated = true;

    const bottomButton = scrollWrapper.appendChild(createElement("button", "Collapse data table..."));
    bottomButton.style.marginTop = "10px";
    bottomButton.addEventListener("click", () => {
      scrollWrapper.style.display = scrollWrapper.style.display === "none" ? "block" : "none";
    });
  }

  button.addEventListener("click", () => {
    if (!tableGenerated) {
      generateTable();
    }
    scrollWrapper.style.display = scrollWrapper.style.display === "none" ? "block" : "none";
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  const alldata = [];

  try {
    // TODO: Parallelize fetches
    await Promise.all(years.map(async year => {
      const response = await fetch(`${baseUrl}/${year.nr}/results-sanitized.json`);
      if (response.status >= 400) {
        throw new Error(`Loading data for ${year.nr} returned with status ${response.status} (${response.statusText})`);
      }
      alldata.push({
        ...year,
        responses: await response.json(),
      })
    }));
  } catch (error) {
    getById("error").style.display = "block";
    getById("charts").style.display = "none";
    return;
  }

  alldata.sort((a, b) => a.nr.localeCompare(b.nr));

  // Amend data
  alldata.forEach(year => 
    year.responses.forEach(r =>
      r.utcResponseDay = parseInt(r["Timestamp"].match(/\d\d\d\d-\d\d-(\d\d)T.+/)[1], 10)
    )
  );

  const charts = {};
  let data = null; // TODO: These variable is a good indication of some missing encapsulation :-)

  ////////////////////////////////////////////////////////////////////////////////
  // language
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      responseCount: year.responses.length,
      data: year
        .responses
        .reduce(multiAnswerReducer("Languages"), [])
        .map(percentageMapperFor(year))
    }))
  };
  
  wireUpDataTableFor(data, "Language", "language");
  mutateDataSetsToGroupRestItemsUnderYValue(data, 2);
  data.datasets.forEach(ds => ds.data.sort(ySorterWithFixedEndItems(["Other..."])));
  mutateDataAddLabelsToForceOrderForMostRecentYear(data);

  charts["language"] = new Chart(getById("language").getContext("2d"), {
    type: "bar",
    data,
    options: {
      plugins: {
        ...chartTitle("Language", "Multi-select: what languages do you use?"),
        ...datalabelsYFormatter(),
      },
      scales: {
        x: { ticks: { autoSkip: false, } }
      },
    },
  });

  ////////////////////////////////////////////////////////////////////////////////
  // ide
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      responseCount: year.responses.length,
      data: year
        .responses
        .reduce(multiAnswerReducer("IDEs"), [])
        .map(percentageMapperFor(year))
    }))
  };
  
  wireUpDataTableFor(data, "IDE", "ide");
  mutateDataSetsToGroupRestItemsUnderYValue(data, 2);
  data.datasets.forEach(ds => ds.data.sort(ySorterWithFixedEndItems(["Other..."])));
  mutateDataAddLabelsToForceOrderForMostRecentYear(data);

  charts["ide"] = new Chart(getById("ide").getContext("2d"), {
    type: "bar",
    data,
    options: {
      plugins: {
        ...chartTitle("IDE", "Multi-select: which IDEs do you use?"),
        ...datalabelsYFormatter(),
      },
      scales: {
        x: { ticks: { autoSkip: false, } }
      },
    },
  });

  ////////////////////////////////////////////////////////////////////////////////
  // operatingSystem
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      responseCount: year.responses.length,
      data: year
        .responses
        .reduce(singleAnswerReducer("OS"), [])
        .map(percentageMapperFor(year))
    }))
  };

  wireUpDataTableFor(data, "Operating System", "operatingSystem");
  mutateDataSetsToGroupRestItemsUnderYValue(data, 0.5);
  data.datasets.forEach(ds => ds.data.sort(ySorterWithFixedEndItems(["Other..."])));
  
  charts["operatingSystem"] = new Chart(getById("operatingSystem").getContext("2d"), {
    type: "bar",
    data,
    options: {
      plugins: {
        ...chartTitle("Operating System", "Single select: primary Operating System."),
        ...datalabelsYFormatter(),
      },
      scales: {
        y: scaleWithText("Number of responses"),
      },
    },
  });

  ////////////////////////////////////////////////////////////////////////////////
  // participationReason
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      responseCount: year.responses.length,
      data: year
        .responses
        .reduce(multiAnswerReducer("Reason_for_participating"), [])
        .map(percentageMapperFor(year))
    }))
  };
  
  wireUpDataTableFor(data, "Reason for participating", "participationReason");
  mutateDataSetsToGroupRestItemsUnderYValue(data, 2);
  data.datasets.forEach(ds => ds.data.sort(ySorterWithFixedEndItems(["Other..."])));
  mutateDataAddLabelsToForceOrderForMostRecentYear(data);

  charts["participationReason"] = new Chart(getById("participationReason").getContext("2d"), {
    type: "bar",
    data,
    options: {
      plugins: {
        ...chartTitle("Reason for participating", "Multi-select: why do you participate?"),
        ...datalabelsYFormatter(),
      },
    },
  });

  ////////////////////////////////////////////////////////////////////////////////
  // leaderboardsGlobal
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      responseCount: year.responses.length,
      data: year
        .responses
        .reduce(singleAnswerReducer("Global_Leaderboard_Participation"), [])
        .map(percentageMapperFor(year))
    }))
  };
  
  wireUpDataTableFor(data, "Global Leaderboard Participation", "leaderboardsGlobal");
  mutateDataSetsToGroupRestItemsUnderYValue(data, 0.5);
  data.datasets.forEach(ds => ds.data.sort(ySorterWithFixedEndItems(["Other..."])));
  mutateDataAddLabelsToForceOrderForMostRecentYear(data);

  charts["leaderboardsGlobal"] = new Chart(getById("leaderboardsGlobal").getContext("2d"), {
    type: "bar",
    data,
    options: {
      plugins: {
        ...chartTitle("Global Leaderboard Participation", "Why you are (not) participating on the global leaderboard."),
        ...datalabelsYFormatter(),
      },
    },
  });

  ////////////////////////////////////////////////////////////////////////////////
  // leaderboardsPrivate
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      responseCount: year.responses.length,
      data: year
        .responses
        .reduce(singleAnswerReducer("Private_Leaderboard_Count"), [])
        .map(percentageMapperFor(year))
        .filter(i => !!i.x)
    }))
  };
  
  wireUpDataTableFor(data, "Number of Private Leaderboards", "leaderboardsPrivate");
  data.datasets.forEach(ds => ds.data.sort(xSorter()));

  charts["leaderboardsPrivate"] = new Chart(getById("leaderboardsPrivate").getContext("2d"), {
    type: "bar",
    data,
    options: {
      plugins: {
        ...chartTitle("Private Leaderboards", "Number of private leaderboards you're active on"),
        ...datalabelsYFormatter(),
      },
    },
  });

  ////////////////////////////////////////////////////////////////////////////////
  // participationTiming
  const participationQuestions = [
    { key: "Participates_in_2015", label: "2015" },
    { key: "Participates_in_2016", label: "2016" },
    { key: "Participates_in_2017", label: "2017" },
    { key: "Participates_in_2018", label: "2018" },
    { key: "Participates_in_2019", label: "2019" },
    { key: "Participates_in_2020", label: "2020" },
    { key: "Participates_in_2021", label: "2021" },
    { key: "Participates_in_2022", label: "2022" },
    { key: "Participates_in_2023", label: "2023" },
  ];

  const participationOptions = [
    { bgColor: "rgba(255, 200,   0, 0.6)", borderColor: "rgba(155, 128,   0, 0.9)", key: "No", },
    { bgColor: "rgba(255,   0,   0, 0.6)", borderColor: "rgba(155,   0,   0, 0.9)", key: "Later", },
    { bgColor: "rgba(  0, 128,   0, 0.6)", borderColor: "rgba(  0, 128,   0, 0.9)", key: "Dec", },
    { bgColor: "rgba(  0, 128, 255, 0.6)", borderColor: "rgba(  0,  64, 155, 0.9)", key: "Involved otherwise", },
  ];

  data = {
    datasets: participationOptions.map(answer => ({
      label: answer.key,
      backgroundColor: answer.bgColor,
      borderColor: answer.borderColor,
      borderWidth: 2,
      data: alldata.find(y => y.nr === currentYear)
        .responses
        .reduce((result, current) => {
          participationQuestions.forEach(question => {
            if (current[question.key] === answer.key) {
              let item = result.find(i => i.x === question.label);
              if (!item) {
                item = { x: question.label, y: 0 };
                result.push(item);
              }
              item.y++;
            }
          })
          return result;
        }, [])
    }))
  };

  data.datasets.forEach(ds => ds.data.sort(xSorter()));

  charts["participationTiming"] = new Chart(getById("participationTiming").getContext("2d"), {
    type: "bar",
    data,
    options: {
      plugins: {
        ...chartTitle("Previous years: did you participate?", ` ⚠ Showing data from ${currentYear} only!`),
        ...datalabelsYFormatter({ withLabel: true, alwaysShow: true }),
      },
      scales: {
        x: { stacked: true, },
        y: { stacked: true, },
      }
    },
  });

  ////////////////////////////////////////////////////////////////////////////////
  // responsesPerDay
  const defaultDataPoints = () => [...Array(25).keys()].map(day => ({ x: day + 1, y: 0 }));
  data = {
    datasets: alldata.map(year => ({
      ...yearDatasetDefaults(year),
      responseCount: year.responses.length,
      hidden: false,
      showLine: true,
      borderWidth: 2,
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
    ds.data.unshift({ x: 0, y: 0 });
  });

  charts["responsesPerDay"] = new Chart(getById("responsesPerDay").getContext("2d"), {
    type: "scatter",
    data,
    options: {
      plugins: {
        ...chartTitle("Survey response per (UTC) day in December"),
        legend: { labels: { usePointStyle: true } },
        datalabels: {
          display: false,
        },
      },
      scales: {
        x: {
          min: 0,
          max: 25,
          ticks: {
            stepSize: 1,
            callback: val => !!val ? val : "",
          },
        }
      },
    },
  });


  ////////////////////////////////////////////////////////////////////////////////
  // 2023 Specific Question
  data = {
    datasets: alldata.filter(year => year.nr === "2023").map(year => ({
      ...yearDatasetDefaults(year),
      responseCount: year.responses.length,
      data: year
        .responses
        .reduce(multiAnswerReducer("Year_specific_2023_AI_and_LLM_thoughts"), [])
        .map(percentageMapperFor(year))
    }))
  };
  
  wireUpDataTableFor(data, "Thoughts about AI and LLM's", "yearSpecificQuestion2023");
  mutateDataSetsToGroupRestItemsUnderYValue(data, 0.1);
  data.datasets.forEach(ds => ds.data.sort(ySorterWithFixedEndItems(["Other..."])));
  mutateDataAddLabelsToForceOrderForMostRecentYear(data);

  charts["yearSpecificQuestion2023"] = new Chart(getById("yearSpecificQuestion2023").getContext("2d"), {
    type: "bar",
    data,
    options: {
      aspectRatio: Math.min(screen.width, window.innerWidth) < 960 ? 1.5 : 3,
      plugins: {
        ...chartTitle("2023-specific question: thoughts about AI and LLM's", "Multi-select: anno 2023 in context of AoC, what are your thoughts on AI and LLM's?"),
        ...datalabelsYFormatter(),
      },
    },
  });

  function toggleYear(year, visible) {
    for (let key in charts) {
      if (key === "responsesPerDay") continue; // Allows for indivindual toggling
      charts[key].data.datasets.forEach((dataset) =>{
        if (dataset.label === year) {
          const idx = charts[key].data.datasets.indexOf(dataset);
          charts[key].setDatasetVisibility(idx, visible);
        }
      });
      charts[key].update();
    }
  }

  document.querySelectorAll("input[name=years]").forEach(input => {
    input.addEventListener("change", () => {
      toggleYear(input.value, input.checked);
    });
  });

});