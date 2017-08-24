var express = require('express');
var path = require('path');
var http = require('http');
var request = require('request');
var csv = require('csvtojson');
var cors = require('cors')


var port = process.env.PORT || 3000;
var app = express();
app.use(cors());
var server = app.listen(port)
app.use(express.static(path.join(__dirname, 'build')));


// Render json at '/departures' URI via fetchData function.

app.get('/departures', fetchData);

function fetchData(req, res){
  var output = '';

// Get and parse the departure times CSV.

  csv()
    .fromStream(request.get('http://developer.mbta.com/lib/gtrtfs/Departures.csv'))
      .on('end_parsed', (json) => {
          output = json;
      })
      .on('done', (error) => {
          if (error){
            console.log(error);
          }
          else{
            res.json(output);
          }
      });
}
