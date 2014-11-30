/*
This script loads data from a google doc about walkoutss across the country and produces a geojson file. For now it'll just do 2014 dates.

Here's the plan:
* load CSV from gdocs
* make a geojson
* upload the geojson to s3 in two locations:
** one as walkout.geojson
** one as timestamp-walkout.geojson so that we can roll back if we need to.

*/

/*
Download CSV link:
*/

var request = require('request'),
    fs = require('fs'),
    csv2geojson = require('csv2geojson'),
    knox = require('knox');

var config = {
            "csvLink" : "https://docs.google.com/spreadsheet/ccc?key=1UWW8ShcE6prusMjRMFWmGhT9X7VtsD1UbvsiqzoI8yE&output=csv",
            "filename" : "walkout",
            "accessKeyID" : process.env.ACCESS_KEY,
            "secretKey" : process.env.SECRET_KEY,
            "bucket" : process.env.BUCKET,
            "remoteDirectory" : process.env.REMOTE_DIRECTORY,
            "latField" : "Latitude",
            "lonField" : "Longitude"
          }

var client = knox.createClient({
    key: config.accessKeyID
  , secret: config.secretKey
  , bucket: config.bucket
});

function writeToS3 (geoJSON, filename, callback) {
  var req = client.put(filename, {
      'Content-Length': geoJSON.length,
    'Content-Type': 'application/json',
    'x-amz-acl': 'public-read'
  });
  req.on('response', function(res){
    if (200 == res.statusCode) {
      console.log('saved to %s', req.url);
    }
  });
  req.end(geoJSON);

}

request(config.csvLink, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body) // Print the CSV
    console.log('Downloaded CSV of google doc successfully');

    var geoJson = csv2geojson.csv2geojson(body, {
      latfield: config.latField,
      lonfield: config.lonField,
      delimiter: ','
    },
    function(err, data) {
        jsonString = JSON.stringify(data);
        var timestamp = Date.now();
        writeToS3(jsonString, config.remoteDirectory + timestamp + '-' + config.filename + '.geojson', function () {
            // console.log('Successfully wrote data to S3.);
          });
        writeToS3(jsonString, config.remoteDirectory + config.filename + '.geojson', function () {
            // console.log('Successfully wrote data to S3.);
          });

    });

  }
})
