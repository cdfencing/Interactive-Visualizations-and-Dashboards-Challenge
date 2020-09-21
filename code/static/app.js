function buildMetadata(sample) {

  // get the metadata for a sample
  const metadataURL = "/metadata/" + sample;
  d3.json(metadataURL).then(function(data) {

    // Use d3 to select the panel with id of `#sample-metadata`
    metadataPanel = d3.select("#sample-metadata");
      
    // clear any existing metadata
    metadataPanel.html("");
    
    Object.entries(data).forEach(([key, value]) => {
          var cell = metadataPanel.append("p");
          cell.text(key + ": " + value);
    });
  });
}

function buildCharts(sample) {

  const sampleDataURL = "/samples/" + sample;
  d3.json(sampleDataURL).then(function(data) {

    // Build a horizontal bar chart

    result = [];
    for (var i = 0; i < data.otu_ids.length; i++) {
      result.push({"otu_ids": data.otu_ids[i], "otu_labels": data.otu_labels[i], "sample_values": data.sample_values[i]});
    };
    result.sort((a, b) => b.sample_values - a.sample_values);
    result = result.slice(0, 10);
    console.log(result);

    var trace1 = {
      values: result.map(row => row.sample_values),
      labels: result.map(row => row.otu_ids),
      hovertext: result.map(row => row.otu_labels),
      type: "bar",
      orientation: "h"
    };
    var barChart = [trace1];
    Plotly.newPlot("bar", barChart);

  
    // Bubble Chart 
    var trace2 = {
      x: data.otu_ids,
      y: data.sample_values,
      type: "scatter",
      mode: "markers",
      marker: {
        size: data.sample_values,
        color: data.otu_ids
      },
      text: data.otu_labels
    };
    var bubbleChart = [trace2];
    Plotly.newPlot("bubble", bubbleChart);

    // Optional BONUS: Build Gauge Chart
    const washDataURL = "/wfreq/" + sample;
    d3.json(washDataURL).then(function(data){
      buildGauge(data.WFREQ);
    });

  });
}

function init() {
  
  var selector = d3.select("#selDataset");

  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // grab the new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();