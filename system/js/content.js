/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2014 OA Wu Design
 */
$(function () {
  var panelHeight = 600;
  var topActionRange = 100;
  var containerTop = 50;

  var scroll_timer = null;
  var actionRange = panelHeight / 2;

  actionRange += containerTop;

  $('.imgLiquid').imgLiquid ({verticalAlign: 'top'});
  
  // $('.first .unit').addClass ('active');

  $('.unit').each (function () {
    $(this).data ('top', $(this).css ('top'));
  });

  $(window).scroll (function () {
    clearTimeout (scroll_timer);
    
    scroll_timer = setTimeout (function () {
      // console.info ('$(window).scrollTop () : ' + $(window).scrollTop ());
      // console.info ('.first top : ' + ($('.first').offset ().top - actionRange));
      // console.info ('.first bottom : ' + ($('.first').offset ().top + $('.first').height () - actionRange));
// children
      $('.panel').each (function () {
        if (!$(this).data ('active') && ($(window).scrollTop () > $(this).offset ().top - actionRange))
          $(this).data ('active', true).children ('.unit').each (function () {
            $(this).css ({'top': (parseFloat ($(this).data ('top')) - topActionRange) + 'px'}).addClass ('active');
          });

        if (($(this).data ('active') == true) && ($(window).scrollTop () > ($(this).offset ().top + $(this).height () - actionRange)))
          $(this).data ('active', false).children ('.unit').each (function () {
            $(this).css ({'top': (parseFloat ($(this).data ('top')) - topActionRange * 2) + 'px'}).removeClass ('active');
          });

        if (($(this).data ('active') == true) && ($(window).scrollTop () < $(this).offset ().top - actionRange))
          $(this).data ('active', false).children ('.unit').each (function () {
            $(this).css ({'top': (parseFloat ($(this).data ('top'))) + 'px'}).removeClass ('active');
          });
      });
      

      // if (!$('.first').hasClass ('cancel') && ($(window).scrollTop () > 700))
      //   $('.first').addClass ('cancel');

    //   if ($('.user_avatar, .infos, .background').hasClass ('cancel') && ($(window).scrollTop () < 750))
    //     $('.user_avatar, .infos, .background').removeClass ('cancel');


    }, 10);

    // console.info ($(window).scrollTop ());
    // scroll_timer = setTimeout (autoLoadPicturesFromServer, 500);
    
  }.bind (this)).scroll ();
});