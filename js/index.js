/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2014 OA Wu Design
 */

var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var yt_p1_3 = null;
var yt_p1_4 = null;
var is_load = null;

function onYouTubePlayerAPIReady () {
  yt_p1_3 = new YT.Player(
      'yt_p1_3',
      {
          videoId: ['nIYbbFzesec'],
          events: {
        
              'onReady'        : function () {},
              'onStateChange'  : function () {},
              'onError'        : function () {},
          }
      }
  );
  yt_p1_4 = new YT.Player(
      'yt_p1_4',
      {
          videoId: ['nIYbbFzesec'],
          events: {
        
              'onReady'        : function () {},
              'onStateChange'  : function () {},
              'onError'        : function () {},
          }
      }
  );
  is_load = true;

}
var stop = function ($obj) {
  if ($obj.length && $obj.data ('is_enable'))
    eval ($obj.attr ('id') + '.pauseVideo()');  
}
var play = function ($obj) {
  if ($obj.length && $obj.data ('is_enable', true)) {
    eval ($obj.attr ('id') + '.playVideo()');  
    eval ($obj.attr ('id') + '.mute()');  
  }
}

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
          $container.children ('.r').children ('.page').removeClass ('now').removeClass ('ed').each (function () {
            if (($(this).offset ().top - $(window).scrollTop ()) < ($(window).height () / 2) && !$(this).hasClass ('now')) {
              now_index = $(this).index ();
            }
          });
          $container.children ('.r').children ('.page').map (function () {
            stop ($(this).find ('[id^="yt_"]'));
          });
          var $ed = $container.children ('.r').children ('.page:lt(' + (now_index) + ')').addClass ('ed')

          var $now = $container.children ('.r').children ('.page').eq (now_index).addClass ('now');
          play ($now.find ('[id^="yt_"]'));
          
          if (index != now_index && $now.length) {
            index = now_index;
            scrollTo ($now.offset ().top -  range, 100)
          }
        });
      }, 100);

  $('.item').each (function (i) {
    Path.map ("#r" + i).to (function () {
      if ($('#_r' + i).length) {
        $container.append ($('<div />').addClass ('r').append (_.template ($('#_r' + i).html (), {}) ({})));
        is_load && onYouTubePlayerAPIReady ();
      }
    }).enter (function () {
      $container.children ('.r').addClass ('r-hide').bind ('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () { $(this).remove (); });
    });
  });

  Path.listen();
});