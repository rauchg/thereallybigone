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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* ---------- vars ---------- */

var geolocationAvailable = false;
var quakeTimerRunning = false;

// check if geolocation is available
if (Modernizr.geolocation) {
  geolocationAvailable = true;
}

// cities SVGs with animation configuration
var cities = [
  {
    name: 'vancouver',
    animations: [
      {
        id: 'animation1',
        begin: 0
      },
      {
        id: 'animation2',
        begin: 0
      },
      {
        id: 'animation3',
        begin: 0
      },
      {
        id: 'animation4',
        begin: 0
      }
    ]
  },
  {
    name: 'seattle',
    animations: [
      {
        id: 'animation1',
        begin: 0
      },
      {
        id: 'animation2',
        begin: 0
      },
      {
        id: 'animation3',
        begin: 1500
      }
    ]
  },
  {
    name: 'olympia',
    animations: [
      {
        id: 'animation1',
        begin: 0
      },
      {
        id: 'animation2',
        begin: 0
      },
      {
        id: 'animation3',
        begin: 500
      }
    ]
  },
  {
    name: 'portland',
    animations: [
      {
        id: 'animation1',
        begin: 0
      },
      {
        id: 'animation2',
        begin: 0
      },
      {
        id: 'animation3',
        begin: 2500
      },
      {
        id: 'animation4',
        begin: 2900
      }
    ]
  },
  {
    name: 'salem',
    animations: [
      {
        id: 'animation1',
        begin: 0
      },
      {
        id: 'animation2',
        begin: 0
      },
      {
        id: 'animation3',
        begin: 500
      }
    ]
  },
  {
    name: 'eugene',
    animations: [
      {
        id: 'animation1',
        begin: 0
      },
      {
        id: 'animation2',
        begin: 0
      }
    ]
  },
  {
    name: 'grantspass',
    animations: [
      {
        id: 'animation1',
        begin: 0
      },
      {
        id: 'animation2',
        begin: 900
      },
      {
        id: 'animation3',
        begin: 0
      }
    ]
  },
  {
    name: 'redding',
    animations: [
      {
        id: 'animation1',
        begin: 0
      }
    ]
  }
];

// tsunamis SVGs with animation configuration
var tsunamis = [
  {
    name: 'wave-1',
    animations: [
      {
        'id': 'animation1',
        'begin': 0
      },
      {
        'id': 'animation2',
        'begin': 0
      },
      {
        'id': 'animation3',
        'begin': 1500
      },
      {
        'id': 'animation4',
        'begin': 2000
      },
      {
        'id': 'animation5',
        'begin': 2000
      },
      {
        'id': 'animation6',
        'begin': 2000
      },
      {
        'id': 'animation7',
        'begin': 1500
      }
    ]
  },
  {
    name: 'wave-2',
    animations: [
      {
        'id': 'animation1',
        'begin': 0
      },
      {
        'id': 'animation2',
        'begin': 0
      },
      {
        'id': 'animation3',
        'begin': 1500
      },
      {
        'id': 'animation4',
        'begin': 1500
      },
      {
        'id': 'animation5',
        'begin': 1500
      }
    ]
  }
];

// on document load
$(document).ready(function() {

  // don't do any animations on mobile
  if ($(window).width() > 480 && !Modernizr.touch) {

    // go through cities to trigger animations
    cities.forEach(function(city, index) {

      var $city = $('.js-cities-' + city.name + ' object');
      var $trigger = $('.js-cities-trigger-' + city.name);
      var hasTriggered = false;

      $city[0].addEventListener('load', function() {

        // check http://imakewebthings.com/waypoints/ for documentation
        $trigger.waypoint({

          handler: function() {

            console.log("Trigger " + city.name);

            if (hasTriggered) return;
            hasTriggered = true;
            var svgDoc = $city.contents();

            // if animations array is not empty, use these...
            if (city.animations.length) {
              city.animations.forEach(function(animation) {
                var el = svgDoc.find('#' + animation.id);
                setTimeout(function() {
                  el[0].beginElement();
                }, animation.begin);
              });
              return;
            }

            // otherwise, loop over array elements and animate them
            var animations = svgDoc.find('animate');
            animations.each(function(index, animation) {
              animation.beginElement();
            });

          },
          offset: 'bottom-in-view'
        });

      });

    });

    // go through tsunamis to trigger animations
    tsunamis.forEach(function(tsunami, index) {

      var $tsunami = $('.js-tsunamis-' + tsunami.name + ' object');
      var $trigger = $('.js-tsunamis-trigger-' + tsunami.name);
      var hasTriggered = false;

      $tsunami[0].addEventListener('load', function() {

        // check http://imakewebthings.com/waypoints/ for documentation
        $trigger.waypoint({

          handler: function() {

            console.log("Trigger " + tsunami.name);

            if (hasTriggered) return;
            hasTriggered = true;
            var svgDoc = $tsunami.contents();

            // if animations array is not empty, use these...
            if (tsunami.animations.length) {
              tsunami.animations.forEach(function(animation) {
                var el = svgDoc.find('#' + animation.id);
                setTimeout(function() {
                  el[0].beginElement();
                }, animation.begin);
              });
              return;
            }

            // otherwise, loop over array elements and animate them
            var animations = svgDoc.find('animate');
            animations.each(function(index, animation) {
              animation.beginElement();
            });

          },
          offset: 'bottom-in-view'
        });

      });

    });

  }

  /* ---------- QUAKE TIMER ---------- */
  var quakeTimer = function() {
    quakeTimerRunning = true;
    var minutes = 0;
    var seconds = 0;
    var ticks = 0;
    var targetTime = 4;
    var $counter = $('.js-quake-counter');
    var $energy = $('.js-quake-energy');
    var $injured = $('.js-quake-injured');
    var $dead = $('.js-quake-dead');
    var $misplaced = $('.js-quake-misplaced');
    var $nowater = $('.js-quake-nowater');
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
      $injured.text( numberWithPoints(Math.round (ticks / 240 * 27000)));
      $dead.text( numberWithPoints(Math.round (ticks / 240 * 13000)));
      $misplaced.text( numberWithPoints(Math.round (ticks / 240 * 1000000)));
      $nowater.text( numberWithPoints(Math.round (ticks / 240 * 2500000)));

      $meter.css('width', ticks / 240 * 100 + "%");

      seconds++;
      ticks++;

    }, 2);
  };

  if(Modernizr.touch) {
    if ( ! quakeTimerRunning) {
      quakeTimer();
    }
  } else {
    // trigger facts
    $('.js-facts').waypoint({

      handler: function() {

        console.log("Trigger facts");

        if ( ! quakeTimerRunning) {
          quakeTimer();
        }

      },
      offset: 'bottom-in-view'
    });
  }



  /* ---------- RISK BUTTON ---------- */
  // risk button check if user is within affected area
  $('.js-button-risk').on('click', function() {

    if ( ! geolocationAvailable) {
      // message that user's browser doesn't support geolocation
      $('.js-alert-box-failed').show().css('display', 'block');
      return;
    }

    $('.js-loading').show();

    // get coordinates, this will prompt user to give access
    navigator.geolocation.getCurrentPosition(function(position) {

      $('.js-loading').hide();

      // save user's latitude and longitude
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      // north west bounds
      var nwBoundLat = 49.460984;
      var nwBoundLng = -127.96875;


      // south east bounds
      var seBoundLat = 34.795762;
      var seBoundLng = -114.785156;

      // if geolocation is within bounds, show warning
      if ((nwBoundLat > lat) && (lat > seBoundLat) &&
          (nwBoundLng < lng) && (lng < seBoundLng)) {
        $('.js-alert-box-danger').show().css('display', 'inline-block');
      }

      // show information when user is not in area
      else {
        $('.js-alert-box-safe').show().css('display', 'inline-block');
      }

    }, function() {
      // Show geolocation failed message on error
      $('.js-alert-box-failed').show().css('display', 'block');
    });

  });

  var wow;

  // when PACE is done, load the WOW animations
  Pace.on('done', function() {

    if(Modernizr.touch) return $('.wow').css('visibility', 'visible');
    wow = new WOW(
      {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
      }
    );
    wow.init();

  });

  // PIE CHART
  function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
  }

  $$('.pie').forEach(function(pie) {
    var p = pie.textContent;
    pie.style.animationDelay = '-' + parseFloat(p) + 's';
  });

  // BACK-TO-TOP button

  // browser window scroll (in pixels) after which the "back to top" link is shown
  var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.cd-top');

  // hide or show the "back to top" link
  $(window).scroll(function(){
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if( $(this).scrollTop() > offset_opacity ) {
      $back_to_top.addClass('cd-fade-out');
    }
  });

  //smooth scroll to top
  $back_to_top.on('click', function(event){
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0 ,
      },
      scroll_top_duration,
      function() {
        wow.init(); // reinitiliase WOW animations
      }
    );
  });

});
