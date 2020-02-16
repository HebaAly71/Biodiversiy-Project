function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  })
}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("Ethnicity: " + result.ethnicity);
    PANEL.append("h6").text("Gender: " + result.gender);
    PANEL.append("h6").text("Age: " + result.age);
    PANEL.append("h6").text("Location: " + result.location);
    PANEL.append("h6").text("BBTYPE: " + result.bbtype);
    PANEL.append("h6").text("WFREQ: " + result.wfreq);
  });
}

function buildCharts(sample) {
  d3.json("samples.json").then(function (data) {
    var resultArray = data.samples.filter(sampleObj => sampleObj.id == sample);
    //console.log(resultArray);
    //var result = resultArray[0];
    //console.log(result);
    samp_values = resultArray.sort((a, b) => b.sample_values.localeCompare(a.sample_values));
    //a.val.localeCompare( b.val )
    //console.log(samp_values);
    var toptenSample = samp_values.slice(0, 10);
    console.log(toptenSample);
    otuid = toptenSample.map(otu => otu.otu_ids.slice(0, 10));
    otulabel = toptenSample.map(otulabels => otulabels.otu_labels.slice(0, 10));
    var otuid1 = otuid[0].map(otuid2 => "OTU" + otuid2.toString());
    samp_val_final = toptenSample.map(sv => sv.sample_values.slice(0, 10));
    console.log(otuid);
    console.log(samp_val_final);
    var trace = {
      x: samp_val_final[0],
      y: otuid1,
      text: otulabel[0],
      type: 'bar',
      orientation: "h",
      transforms: [{
        type: 'sort',
        target: 'y',
        order: 'descending'
      }]
    };
    console.log("trace:\n");
    console.log(trace);
    var dataplot = [trace];
    console.log("dataplot:\n");
    console.log(dataplot);
    
    var trace2 = {
      x: otuid[0],
      y: samp_val_final[0],
      text: otulabel[0],
      mode: 'markers',
      marker: {
        size: samp_val_final[0],
        color: otuid[0].map(String)
      }
      
    };
    var dataplot2 = [trace2]
    //var layout = {
     // yaxis: dict(autorange="reversed")
    //title: "Top 10 Bacterial Species",
    //xaxis: { title: "City" },
    //yaxis: { title: "Population Growth, 2016-2017"}
    //};
    //data = d3.select("#bar");
    console.log("data:\n");
    console.log(data);
    Plotly.newPlot('bar', dataplot);
    Plotly.newPlot('bubble', dataplot2);
    
  });

}