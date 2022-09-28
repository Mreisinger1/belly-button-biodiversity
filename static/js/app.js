console.log('this is app.js')

function DrawBargraph(sampleId)
{
    console.log('DrawBargraph(${sampleId})');

}

function DrawBubblechart(sampleId)
{
    console.log('DrawBubblechart(${sampleId})');

}


function ShowMetaData(sampleId)
{
    console.log('ShowMetaData(${sampleId})');

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

