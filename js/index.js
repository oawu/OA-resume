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

  $('.item').each (function (i) {
    Path.map ("#r" + i).to (function () {
      if ($('#_r' + i).length) $container.append ($('<div />').addClass ('r').append (_.template ($('#_r' + i).html (), {}) ({})));
    }).enter (function () {
      $container.children ('.r').addClass ('r-hide').bind ('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () { $(this).remove (); });
    });
  });

  Path.listen();

  var scroll_timer = null;

  // var panelHeight = 600;
  // var topActionRange = 100;
  // var containerTop = 50;

  // var scroll_timer = null;
  // var actionRange = panelHeight / 2;

  // actionRange += containerTop;
  var index = 0;
  $(window).scroll (function () {

    clearTimeout (scroll_timer);
// console.clear()

      $container.children ('.r').children ('.page').removeClass ('now').each (function () {
        if ($(this).offset ().top - $(window).scrollTop () < $(window).height () / 2 && !$(this).hasClass ('now')) {
          $(this).addClass ('now').prev ('.page').removeClass ('now');

          if (index == $(this).index ()) {
            console.error (index);
            console.error ($(this).offset ().top);
            // $(window).scrollTop ($(this).offset ().top)
            index = $(this).index ();
          }

        }
      });

    //   $('.panel').each (function () {
    //     if (!$(this).data ('active') && ($(window).scrollTop () > $(this).offset ().top - actionRange))
    //       $(this).data ('active', true).children ('.unit').each (function () {
    //         $(this).css ({'top': (parseFloat ($(this).data ('top')) - topActionRange) + 'px'}).addClass ('active');
    //       });

    //     if (($(this).data ('active') == true) && ($(window).scrollTop () > ($(this).offset ().top + $(this).height () - actionRange)))
    //       $(this).data ('active', false).children ('.unit').each (function () {
    //         $(this).css ({'top': (parseFloat ($(this).data ('top')) - topActionRange * 2) + 'px'}).removeClass ('active');
    //       });

    //     if (($(this).data ('active') == true) && ($(window).scrollTop () < $(this).offset ().top - actionRange))
    //       $(this).data ('active', false).children ('.unit').each (function () {
    //         $(this).css ({'top': (parseFloat ($(this).data ('top'))) + 'px'}).removeClass ('active');
    //       });
    //   });

  }).scroll ();

});