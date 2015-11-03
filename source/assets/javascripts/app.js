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
  },
  {
    name: 'wave-3',
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
        'begin': 2000
      },
      {
        'id': 'animation4',
        'begin': 2000
      },
      {
        'id': 'animation5',
        'begin': 2500
      },
      {
        'id': 'animation6',
        'begin': 2500
      },
      {
        'id': 'animation7',
        'begin': 1500
      },
      {
        'id': 'animation8',
        'begin': 1500
      },
      {
        'id': 'animation9',
        'begin': 1500
      }
    ]
  },
  {
    name: 'wave-4',
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
        'begin': 2500
      },
      {
        'id': 'animation4',
        'begin': 2500
      },
      {
        'id': 'animation5',
        'begin': 1500
      }
    ]
  },
  {
    name: 'wave-5',
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
        'begin': 2000
      },
      {
        'id': 'animation6',
        'begin': 2000
      },
      {
        'id': 'animation7',
        'begin': 2500
      },
      {
        'id': 'animation8',
        'begin': 2500
      },
      {
        'id': 'animation9',
        'begin': 3000
      },
      {
        'id': 'animation10',
        'begin': 3000
      },
      {
        'id': 'animation11',
        'begin': 1500
      }
    ]
  },
  {
    name: 'wave-6',
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
        'begin': 2000
      },
      {
        'id': 'animation4',
        'begin': 2000
      },
      {
        'id': 'animation5',
        'begin': 2500
      },
      {
        'id': 'animation6',
        'begin': 2500
      },
      {
        'id': 'animation7',
        'begin': 1500
      }
    ]
  },
  {
    name: 'wave-7',
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
        'begin': 2000
      },
      {
        'id': 'animation4',
        'begin': 2000
      },
      {
        'id': 'animation5',
        'begin': 1500
      },
      {
        'id': 'animation6',
        'begin': 1500
      },
      {
        'id': 'animation7',
        'begin': 1500
      }
    ]
  }
];

// on document load
$(document).ready(function() {

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

  // scroll position
  $(window).scroll(function () {

    var topOfWindow = $(window).scrollTop();
    // console.log(topOfWindow);

    /* ---------- > 1200px: Run quake timer ---------- */
    // TODO: repurpose for the new timer
    if (topOfWindow > 6560) {
      if ( ! quakeTimerRunning) {
        quakeTimer();
      }
    }

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