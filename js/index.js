/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2014 OA Wu Design
 */

$(function () {
  $container = $('#container').empty ();
  $('#navbar').OAnavbar ();

  $('.item').click (function () {
    $(this).addClass ('active').siblings ().removeClass ('active');
    window.location.assign ('#r' + $(this).index ());
  });

  var $active = $('.item').filter ('.active');
  $active.length ? $active.click () : $('.item').eq (!location.hash ? 0 : location.hash.slice (location.hash.indexOf ('r') + 1)).click ();

  var now_index = 0,
      index = -1,
      range = 100,
      timer = null,
      scrollTo = function (to, duration) {
          var start = $(window).scrollTop (),
              change = to - start,
              currentTime = 0,
              increment = 20,
              animateScroll = function () {
                currentTime += increment;
                $(window).scrollTop (easeInOutQuad (currentTime, start, change, duration));
                if(currentTime < duration) timer = setTimeout (animateScroll, increment);
              };

          clearTimeout (timer);
          animateScroll ();
      },
      easeInOutQuad = function (t, b, c, d) { return (t /= d / 2) < 1 ? (c / 2 * t * t + b) : (-c / 2 * (--t * (t - 2) - 1) + b); },
      scroll_timer = setTimeout (function () {
        clearTimeout (scroll_timer);
        $(window).scroll (function () {
          console.error (123);
          $container.children ('.r').children ('.page').removeClass ('now').each (function () {
            if (($(this).offset ().top - $(window).scrollTop ()) < ($(window).height () / 2) && !$(this).hasClass ('now')) {
              now_index = $(this).index ();
            }
          });
          var $now = $container.children ('.r').children ('.page').eq (now_index).addClass ('now');
          if (index != now_index) {
            index = now_index;
            scrollTo ($now.offset ().top -  range, 100)
          }
        });
      }, 100);

  $('.item').each (function (i) {
    Path.map ("#r" + i).to (function () {
      if ($('#_r' + i).length) {
        $container.append ($('<div />').addClass ('r').append (_.template ($('#_r' + i).html (), {}) ({})));
        scrollTo (1, 100)
      }
    }).enter (function () {
      $container.children ('.r').addClass ('r-hide').bind ('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () { $(this).remove (); });
    });
  });

  Path.listen();

});