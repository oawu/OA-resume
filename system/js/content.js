/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2014 OA Wu Design
 */
$(function () {
  $('#container').imagesLoaded (function () {
    $('#load').fadeOut (function () {
      $('#container').show (function () {
        $(window).scroll ()
      });
      $(this).remove ();
    }); 
  });

  var panelHeight = 600;
  var topActionRange = 100;
  var containerTop = 50;

  var scroll_timer = null;
  var actionRange = panelHeight / 2;

  actionRange += containerTop;

  $('.imgLiquid').imgLiquid ({verticalAlign: 'top'});
  
  $('.unit').each (function () {
    $(this).data ('top', $(this).css ('top'));
  });

  $('.silder_panel').sliderPreview ();
  
  $(window).scroll (function () {

    clearTimeout (scroll_timer);
    
    scroll_timer = setTimeout (function () {
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
    }, 10);

  }.bind (this));
});