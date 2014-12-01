
$(document).ready(function () {
  $('.fa-bars').click(function () {
    $("#container").toggleClass("sidebar-closed");
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
