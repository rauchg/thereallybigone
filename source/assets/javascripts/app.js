// Initialise Foundation
$(document).foundation();
// -----------------------------------------------------------------------------

var geolocationAvailable = false;

// check if geolocation is available
if (Modernizr.geolocation) {
  geolocationAvailable = true;
}

// check if user is within affected area
$('.js-button-risk').on('click', function() {

  if ( ! geolocationAvailable) {
    // message that user's browser doesn't support geolocation
    return;
  }

  $('.js-button-risk .js-loading').show();

  // get coordinates, this will prompt user to give access
  navigator.geolocation.getCurrentPosition(function(position) {

    $('.js-button-risk .js-loading').hide();

    // save user's latitude and longitude
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    // north west bounds
    var nwBoundLat = 48.392738;
    var nwBoundLng = -124.727783;

    // south east bounds
    var seBoundLat = 46.141783;
    var seBoundLng = -122.904053;

    // if geolocation is within bounds, show warning
    if (nwBoundLat > lat > seBoundLat &&
        nwBoundLng < lng < seBoundLng) {
      $('.js-alert-box-danger').show();
    }

    // show information when user is not in area
    else {
      $('.js-alert-box-safe').show();
    }

  });

});


// Button trigger for the quake duration progress bar
$(".quake-timer").click(function () {
  $(".custom-meter").animate({width:"100%"});
});


// Hiding and re-triggering animation of the elements
// Makes animation also work in reverse
$(window).scroll(function () {

  var $fixedHeader = $('.fixed-header');

  var topOfWindow = $(window).scrollTop();

  // topOfWindow is the current scroll position and can be seen in the console
  console.log(topOfWindow);

  // animation only happens until the threshold, after that is stays where it is
  if (topOfWindow < 2000) {
    // this is how you would achieve parallax for any element (using negative position on fixed elements), replace 2 by any other number to define scroll speed
    $fixedHeader.css('top', -topOfWindow / 2);
  }

  // fade risk button in and out when surpassing treshold of 50px
  // its important to remove the counterpart class of the animation before adding the animation
  // (e.g. remove fadeOutdown before adding fadeInUp), otherwise it'll result in weird behaviour
  if (topOfWindow > 50) {
    // if fade-in class doesn't exist on element, remove fade-out class and add it
    if ( ! $('.js-animate-risk').hasClass('fadeInUp')) {
      $('.js-animate-risk').removeClass('fadeOutDown').addClass('animated fadeInUp');
    }
  } else {
    // if fade-in class exists on element, then remove it and add fade-out class
    if ($('.js-animate-risk').hasClass('fadeInUp')) {
      $('.js-animate-risk').removeClass('fadeInUp').addClass('fadeOutDown');
    }
  }
});


// Timer animation
// TODO: need to make the 'seconds' text animation run 4 times
// Here's my fiddle: http://jsfiddle.net/v3oepawb/
$(".quake-timer").click(function() {
  var targetone = 4;
  var targettwo = 59;
  var numberone = 0;
  var numbertwo = 00;

  var intervalone = setInterval(function() {
    $('#number-one').text(numberone);
    if (numberone >= targetone) clearInterval(interval);
    numberone++;
  }, 1200);

  for (var i = 0; i <= 4; i++) {
    var intervaltwo = setInterval(function() {
      $('#number-two').text(numbertwo);
      if (numbertwo >= targettwo) clearInterval(interval);
      numbertwo++;
      // return false;
    }, 120);
  }
});