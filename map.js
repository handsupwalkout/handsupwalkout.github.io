function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?

  if (feature.properties && feature.properties['Event Name'] && feature.properties['Location']) {
    var popupString = '<strong>' + feature.properties['Event Name'] + '</strong>'
    if (feature.properties['Facebook event']) {
      popupString += '<br /> (<a href="' + feature.properties['Facebook event'] +'">';
      popupString += 'facebook event)</a>';

    }
    if (feature.properties['Time']) {
      popupString += '<br /><strong>Time:</strong> ';
      popupString += feature.properties['Time'];
    }

    popupString += '<br /> <strong>Location:</strong> ' + feature.properties['Location'];
    if (feature.properties['More info']) {
      popupString += '<br /> <strong>More info:</strong> ';
      popupString += feature.properties['More info'];
    }
    layer.bindPopup(popupString);
  }
}

$.getJSON( "https://s3-us-west-2.amazonaws.com/lets-see/walkout/walkout.geojson", function( data ) {
  console.log(data);
  window.what = data;
  L.mapbox.accessToken = 'pk.eyJ1IjoiY29kZWZvcmFtZXJpY2EiLCJhIjoiSTZlTTZTcyJ9.3aSlHLNzvsTwK-CYfZsG_Q';
  var map =   L.mapbox.map('map', 'codeforamerica.kc52poi6', { zoomControl: false })
  .setView([37.8, -106], 4);
  var myLayer = L.geoJson(data,{
    onEachFeature: onEachFeature
  }).addTo(map);
  myLayer.addData(data);
  new L.Control.Zoom({ position: 'topright' }).addTo(map);

});
// Provide your access token
// Create a map in the div #map
