function buildMetadata(sample) {

  // get the metadata for a sample
  metadataURL = "./data/samples.json"
  d3.json(metadataURL).then((data) => {

    // Need to filter the data thru the metadata
    var mainData = data.metadata;
    var ListMetadata = mainData.filter(sampleObj => sampleObj.id == sample);
    var finalResult = ListMetadata[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    metadataPanel = d3.select("#sample-metadata");
      
    // clear any existing metadata
    metadataPanel.html("");
    
    Object.entries(finalResult).forEach(([key, value]) => {
          var cell = metadataPanel.append("p");
          cell.text(`${key}: ${value}`);
    });

    buildGauge(finalResult.wfreq);
  });
}

function buildCharts(sample) {

  metadataURL = "./data/samples.json"
  d3.json(metadataURL).then((data) => {

    // Need to filter the data thru the metadata
    var mainSamples = data.samples;
    var ListMetadata = mainSamples.filter(sampleObj => sampleObj.id == sample);
    var finalResult = ListMetadata[0];

    // lets bring each id, labels and values

    var otu_ids = finalResult.otu_ids;
    var otu_labels = finalResult.otu_labels;
    var sample_values = finalResult.sample_values;

    // Build a horizontal bar chart

    var barChart = [
      {
        y: otu_ids.slice(0 ,10).map(otuID => `OTU ${otuID}`).reverse(),
        x: sample_values.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",


      }

    ];

    var layout ={
      title: "Top 10 Bacteria Found",
      margin: {t: 50, l: 150}
    };

    Plotly.newPlot("bar", barChart, layout);

  
    // Bubble Chart 

    var bubbleLayout = {
      title: " Bacteria Per Sample",
      margin: {t:0},
      hovermode: "closest",
      xaxis: {title: "OTU ID"}
    };
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Jet"
      },
      text: otu_labels
    };
    var bubbleChart = [trace2];
    Plotly.newPlot("bubble", bubbleChart, bubbleLayout);

  });
}

function init() {
  
  var selector = d3.select("#selDataset");

  d3.json("./data/samples.json").then((data) => {
    
    var sampleNames = data.names;
    
    
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