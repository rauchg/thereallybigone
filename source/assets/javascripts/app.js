// Initialise Foundation
$(document).foundation();
// -----------------------------------------------------------------------------

var geolocationAvailable = false;

// Button trigger for the quake duration progress bar
$(".quake-timer").click(function () {
  $(".custom-meter").animate({width:"100%"});
});

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

// Hiding and re-triggering animation of the elements
// Makes animation also work in reverse
$(window).scroll(function () {

  var $fixedHeader = $('.fixed-header');

  $('.animation-test').each(function () {
      var Pos = $(this).offset().top;
      var Height = 600;
      var topOfWindow = $(window).scrollTop();

      // topOfWindow is the current scroll position and can be seen in the console
      console.log(topOfWindow);

      // animation only happens until the threshold, after that is stays where it is
      if (topOfWindow < 2000) {
        // this is how you would achieve parallax for any element (using negative position on fixed elements),
        // replace 2 by any other number to define scroll speed
        $fixedHeader.css('top', -topOfWindow / 2);
      }

      // var bottomOfWindow = $(window).scrollTop() + $(window).height();

      // if (Pos < topOfWindow + Height && Pos + Height > topOfWindow) {
      //   $(this).addClass(" fadeInDown animation-test--visible");
      // } else {
      //   $(this).removeClass("fadeInDown animation-test--visible");
      //   // TODO: testing the 'out' animation
      //   // $(this).stop(true, true).delay(1200).animate({opacity:"0"});
      // }

      // TODOs:
      // 1. We need to be able to pass an animation class into this from HTML
      // --
      // 2. We need the animation class to get re-added again every time you
      // scroll down past the element. Right now it's simply hiding and revealing
      // the element with CSS visibility: visible/hidden.
      // --
      // 3. We need to be able to pass another custom animation class for when
      // you scroll up past the element, so it animates out instead of just
      // getting hidden.
  });
});


// WOW settings (currently in layout.erb)
// var wow = new WOW(
//   {
//     boxClass:     'wow',      // animated element css class (default is wow)
//     animateClass: 'animated', // animation css class (default is animated)
//     offset:       0,          // distance to the element when triggering the animation (default is 0)
//     mobile:       true,       // trigger animations on mobile devices (default is true)
//     live:         true,       // act on asynchronously loaded content (default is true)
//     callback:     function(box) {
//       // the callback is fired every time an animation is started
//       // the argument that is passed in is the DOM node being animated
//     },
//     scrollContainer: null // optional scroll container selector, otherwise use window
//   }
// );
// wow.init();