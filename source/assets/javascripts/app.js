// Initialise Foundation
$(document).foundation();
// -----------------------------------------------------------------------------

/* ---------- helper functions ---------- */
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function numberWithPoints(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* ---------- vars ---------- */

var geolocationAvailable = false;
var quakeTimerRunning = false;

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

// on document load
$(document).ready(function() {

  // Variables for SVG animations
  heroMap = $('#hero-map');
  heroMap[0].addEventListener('load', function() {
    svgDoc = heroMap.contents();
    svgItemForward = svgDoc.find("#NAplate-slide-forward");
    svgItemBackward = svgDoc.find("#NAplate-slide-backward");
  });

  // get fixed header and subduction labels to control their position
  $fixedHeader = $('.fixed-header');
  $subductionLabels = $('.js-animate-subduction-labels');

  // Hiding and re-triggering animation of the elements
  $(window).scroll(function () {

    var topOfWindow = $(window).scrollTop();
    // console.log(topOfWindow);

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
      if ( ! $('.js-animate-subduction').hasClass('slideInUp')) {
        $('.js-animate-subduction').removeClass('fadeOut').addClass('animated slideInUp');
      }
    }

    else {
      if ($('.js-animate-subduction').hasClass('slideInUp')) {
        $('.js-animate-subduction').removeClass('slideInUp').addClass('fadeOut');
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

    /* ---------- > 1200px: Run quake timer ---------- */
    if (topOfWindow > 1200) {
      if ( ! quakeTimerRunning) {
        quakeTimer();
      }
    }

    /* ---------- 501px: ANIMATE SVGs ---------- */

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
  var quakeTimer = function() {
    quakeTimerRunning = true;
    var minutes = 0;
    var seconds = 0;
    var ticks = 0;
    var targetTime = 4;
    var $counter = $('.js-quake-counter');
    var $energy = $('.js-quake-energy');
    var $people = $('.js-quake-people');
    var $miles = $('.js-quake-miles');
    var $meter = $('.custom-meter');

    var timerInterval = setInterval(function() {

      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes < 4) {
        var counterVal = minutes + ':' + pad(seconds, 2);
        $counter.text(counterVal);
      }

      if (minutes === 4) {
        clearInterval(timerInterval);
        $counter.text('4:00');
      }

      $energy.text( Math.round (ticks / 240 * 30)  + ' x');
      $people.text( numberWithPoints(Math.round (ticks / 240 * 7000000)));
      $miles.text( numberWithPoints(Math.round (ticks / 240 * 14000)));

      $meter.css('width', ticks / 240 * 100 + "%");

      seconds++;
      ticks++;

    }, 25);
  };

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