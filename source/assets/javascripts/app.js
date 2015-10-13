// Initialise Foundation
$(document).foundation();
// -----------------------------------------------------------------------------


// Button trigger for the quake duration progress bar
$(".quake-timer").click(function () {
  $(".custom-meter").animate({width:"100%"});
  console.log('xxx');
});


// Hiding and re-triggering animation of the elements
// Makes animation also work in reverse
$(window).scroll(function () {
  $('.animation-test').each(function () {
      var Pos = $(this).offset().top;
      var Height = 800;
      var topOfWindow = $(window).scrollTop();
      // var bottomOfWindow = $(window).scrollTop() + $(window).height();

      if (Pos < topOfWindow + Height && Pos + Height > topOfWindow) {
        $(this).addClass(" fadeInDown animation-test--visible");
      } else {
        $(this).removeClass("fadeInDown animation-test--visible");
        // TODO: testing the 'out' animation
        // $(this).stop(true, true).delay(1200).animate({opacity:"0"});
      }

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