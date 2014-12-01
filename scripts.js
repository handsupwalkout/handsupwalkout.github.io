/*
* Globals
*/
var app = app || {};

$(document).ready(function () {
  $('.fa-bars').click(function () {
    $("#container").toggleClass("sidebar-closed");
  });

  app.times = [
    { 'zone': 'EST', 'time': '1pm', 'next': 'CST' },
    { 'zone': 'CST', 'time': '12pm', 'next': 'MST' },
    { 'zone': 'MST', 'time': '11am', 'next': 'PST' },
    { 'zone': 'PST', 'time': '10am', 'next': 'EST' }
  ];

  /* toggle between timezones */
  $('#when').click(function () {
    var zone = $('#when .zone').text();

    // lookup replacement info
    var current = _.find(app.times, { 'zone': zone });
    var next = _.find(app.times, { 'zone': current.next });

    // update page
    $('#when .zone').html(next.zone);
    $('#when .time').html(next.time);

  });
});


$(function() {
  function responsiveView() {
    var wSize = $(window).width();
    if (wSize <= 768) {
      $('#container').addClass('sidebar-closed');
    }

    if (wSize > 768) {
      $('#container').removeClass('sidebar-closed');
    }
  }
  $(window).on('load', responsiveView);
  $(window).on('resize', responsiveView);
});
