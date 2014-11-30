walkout map
========

Map of ferguson walkouts across the country festivals. The most up-to-date [geojson file is on S3](https://s3-us-west-2.amazonaws.com/lets-see/walkout.geojson).

Steps:
* get data from a google doc
* make a webpage with the geojson data


## how does this work?
This is a nodejs application that downloads a CSV of a google doc of events from across the country. It produces a geojson file that is then uploaded and hosted as a static file on a CDN. A frontend can then load the geojson file and build a frontend on top of it.


## s3 environment variables
ACCESS_KEY=

SECRET_KEY=

BUCKET=

REMOTE_DIRECTORY=
