console.log('this is app.js')

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function DrawBargraph(sampleId)
{
    console.log('DrawBargraph(${sampleId})');

    d3.json(url).then(data => {
        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        console.log(`yticks = ${yticks}`);

        //create a trace object
        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks, 
            type: 'bar',
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 'h'
        

        };
        
        //put the trace object into the array
        let barArray = [barData];
        //layout object
        let barLayout = {
            title: "Top 10 Bacterial Cultures Found",
            margin: {t: 30, l: 150}

        }

        //plotly function
        Plotly.newPlot("bar", barArray, barLayout);


    });

}

function DrawBubblechart(sampleId)
{
    console.log('DrawBubblechart(${sampleId})');
    d3.json(url).then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        //create a trace
        let bubbleData = {
            x: otu_ids, 
            y: sample_values, 
            text: otu_labels, 
            mode: "markers",
            marker: {
                size: sample_values, 
                color: otu_ids,
                //colorscale: "Earth"
            }
        }
        //put the trace into an array 
        let bubbleArray = [bubbleData];

        //create a layout object
        let bubbleLayout = { 
            title: "Bacteria Culture Per Sample",
            margin:  {t: 30},
            hovermode: "closest", 
            xaxis: { title: "OTU ID"}

        }

        //call plotly

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout)

    });

}


function ShowMetaData(sampleId)
{
    let MetaPanel = d3.select("#sample-metadata");
    MetaPanel.html("");

    console.log('ShowMetaData(${sampleId})');
    d3.json(url).then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let DemographicInfo = data.metadata.filter(object =>object.id.toString() == sampleId)[0];
        console.log(DemographicInfo);
        
        Object.entries(DemographicInfo).forEach(([key, value]) => {
            MetaPanel.append("h6").text(`${key}: ${value}`)
            
        })
        
    
    });

}

function DrawGauge(sampleId)
{
    console.log('DrawGauge(${sampleId})');

}


function optionChanged(sampleId)
{
    console.log(`optionChanged: ${sampleId}`);
    DrawBargraph(sampleId);
    DrawBubblechart(sampleId);
    ShowMetaData(sampleId);
    DrawGauge(sampleId);
}

function InitDashboard() 
{ 
    console.log('InitDashboard()');

    let selector = d3.select("#selDataset");

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

    d3.json(url).then(data => {
        console.log("here is the data:", data);

        let sampleNames = data.names;
        console.log("Here are the sample names:", sampleNames);

        //populate dropdown 
        for (let i = 0; i < sampleNames.length; i++) {
            let sampleId = sampleNames[i];
            //console.log(`sampleId = ${sampleId}`);
            selector.append("option").text(sampleId).property("value", sampleId);

        }

        //read the current value from dropdown
        let initialid = selector.property("value");
        console.log(`initialid = $(initialid)`);

        //draw bargraph for the selected sample id 
        DrawBargraph(initialid);

        //draw bubblechart for the selected sample id
        DrawBubblechart(initialid);

        //show the metadata for the selected sample id
        ShowMetaData(initialid);

        //show the gauge
    });
}

InitDashboard();

