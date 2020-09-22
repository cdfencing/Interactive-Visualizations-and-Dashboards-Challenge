function buildGauge(wfreq) {
    // input the frequency value of the half moon 0 to 180 
    var level = parseFloat(wfreq) * 20;

    // Trigonometry to calculate each point of the meter

    var degrees = 180 - level;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);


    // Now let make a better triangle 
    var mainPath = "M -.0 -0.05 L .0 0.05 L";
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
            text: ["8-9", "7-8", ""],
            textinfo: "text",
            textposition: "inside",
            markers: {
                colors: [
                    "rgba(0,105,11,.5)",

                ]
            },
            labels: ["8-9", "7-8", ""],
            hoverinfo: "label",
            hole: 0.5,
            type: "pie",
            showlegend: false
        }
    ];

    //var layoutG

    var Gauge = document.getElementById("gauge");
    Plotly.newPlot(Gauge, data);

}