// Initialise Foundation
$(document).foundation();
// -----------------------------------------------------------------------------

var geolocationAvailable = false;

// check if geolocation is available
if (Modernizr.geolocation) {
  geolocationAvailable = true;
}

var heroMap,
    svgDoc,
    svgItemForward,
    svgItemBackward,
    $fixedHeader,
    $subductionLabels;

$(document).ready(function() {

  // Get the Object by ID
  heroMap = $('#hero-map');
  heroMap[0].addEventListener('load', function() {
    svgDoc = heroMap.contents();
    svgItemForward = svgDoc.find("#NAplate-slide-forward");
    svgItemBackward = svgDoc.find("#NAplate-slide-backward");
  });

  $fixedHeader = $('.fixed-header');
  $subductionLabels = $('.js-animate-subduction-labels');

  // Hiding and re-triggering animation of the elements
  $(window).scroll(function () {

    var topOfWindow = $(window).scrollTop();
    console.log(topOfWindow);

    // subduction plate labels position has to be kept sync to hero bg
    $subductionLabels.css('top', 750 - 333 - ((topOfWindow - 500) / 2));

    /* ---------- > 50px: RISK BUTTON ---------- */
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

    /* ---------- < 500px: HERO is moving at 2/3 of the scroll speed ---------- */
    if (topOfWindow < 500) {
      $fixedHeader.css('top', -topOfWindow * 0.66);
    }

    /* ---------- < 500px: HERO is moving at 1/2 of the scroll speed ---------- */
    if (topOfWindow > 500) {
      // -333 is the current top position at this point
      $fixedHeader.css('top', -333 - ((topOfWindow - 500) * 0.5));
    }

    /* ---------- > 1000px: HERO is moving at 2/3 of the scroll speed, changing direction ---------- */
    if (topOfWindow > 1000 && topOfWindow < 1640) {
      // -583 is the current top position at this point
      $fixedHeader.css('top', -583 + ((topOfWindow - 1000) * 0.66));
    }

    /* ---------- > 1640: HERO is not moving any longer ---------- */
    if (topOfWindow > 1640) {
      $fixedHeader.css('top', -160);
    }

    /* ---------- > 400px: ANIMATE SUBDUCTION DIV ---------- */
    if (topOfWindow > 400) {
      if ( ! $('.js-animate-subduction').hasClass('slideInLeft')) {
        $('.js-animate-subduction').removeClass('slideOutLeft').addClass('animated slideInLeft');
      }
    }

    else {
      if ($('.js-animate-subduction').hasClass('slideInLeft')) {
        $('.js-animate-subduction').removeClass('slideInLeft').addClass('slideOutLeft');
      }
    }

    /* ---------- > 400px: ANIMATE SUBDUCTION PLATES ---------- */
    if (topOfWindow > 400 && topOfWindow < 1000) {

      if ( ! $('.js-animate-subduction-labels').hasClass('fadeInUp')) {
        $('.js-animate-subduction-labels').removeClass('fadeOutDown').addClass('animated fadeInUp');
      }
    }

    else {
      if ($('.js-animate-subduction-labels').hasClass('fadeInUp')) {
        $('.js-animate-subduction-labels').removeClass('fadeInUp').addClass('fadeOutDown');
      }
    }

    /* ---------- 501px: ANIMATE SUBDUCTION DIV ---------- */

    // if (topOfWindow > 2000) {
    //   $fixedHeader.css('top', -666 - ((topOfWindow-1000) / 2));
    // }

    // if (topOfWindow > 100) {
    //   if ( ! heroMap.hasClass('moveForward')) {
    //     heroMap.addClass('moveForward');
    //     svgItemForward[0].beginElement();
    //   }
    // } else {
    //   if ( heroMap.hasClass('moveForward')) {
    //     heroMap.removeClass('moveForward');
    //     svgItemBackward[0].beginElement();
    //   }
    // }

  });


  /* ---------- QUAKE TIMER ---------- */

  // Timer animation
  // TODO: need to make the 'seconds' text animation run 4 times
  // Here's my fiddle: http://jsfiddle.net/v3oepawb/
  $(".quake-timer").click(function() {

    var minutes = 0;
    var seconds = 0;
    var targetTime = 4;
    var $counter = $('.js-counter');

    var timerInterval = setInterval(function() {
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes < 4) {
        var counterVal = minutes + ':' + seconds;
        $counter.text(counterVal);
      }
      seconds++;

    }, 100);
  });

  // Button trigger for the quake duration progress bar
  // $(".quake-timer").click(function () {
  //   $(".custom-meter").animate({width:"100%"});
  // });

  /* ---------- RISK BUTTON ---------- */
  // risk button check if user is within affected area
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


});