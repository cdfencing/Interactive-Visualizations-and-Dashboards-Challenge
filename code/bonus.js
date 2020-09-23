function buildGauge(wfreq) {
    // input the frequency value of the half moon 0 to 180 
    var level = parseFloat(wfreq) * 20;

    // Trigonometry to calculate each point of the meter

    var degrees = 180 - level;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';

    // Now let make a better triangle 
    var mainPath = path1;
    var pathX = String(x);
    var space = " ";
    var pathY = String(y);
    var pathEnd = " Z";
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [
        {
            type: "scatter",
            x: [0],
            y: [0],
            marker: { size: 12, color: "850000"},
            showlegend: false,
            name: "Freq",
            text: level,
            hoverinfo: "text+name"
        },
        {
            values: [50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {colors:['#6F826E','#89B28A','#8BC187','#B7CD8F','#D5E59A','#E5E8B1','#E7E6C8','#F2F0E3','#F8F4EB','#FFFFFF',]},
            labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",
            hole: 0.5,
            type: "pie",
            showlegend: false
        }
    ];

    var layoutG ={
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
              color: '850000'
            }
          }],
        height: 500,
        width: 500,
        title: "Belly Button Washing Frequency: Scrubs per Week",
        margin: {t: 50, l: 150},
        xaxis: {zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]}
      };

    var Gauge = document.getElementById("gauge");
    Plotly.newPlot(Gauge, data, layoutG);

}

// References:

// for gauge chart: https://com2m.de/blog/technology/gauge-charts-with-plotly/