/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2014 OA Wu Design
 */

$(function () {
  var pictureIndex = 0;
  $('.avatar, .picture').OAimgLiquid ();
  $('.page').each (function () {
    pictureIndex += 1;
    $(this).find ('.picture').each (function () {
       $(this).attr ('data-fancybox-group', 'group_' + pictureIndex).attr ('href', $(this).find ('img').attr ('src'));
    });
  });
  // $('.page .picture').each (function () {
  //    $(this).attr ('data-fancybox-group', 'group_' + pictureIndex).attr ('href', $(this).find ('img').attr ('src'));
  // });

  $('.picture').fancybox ({
    beforeLoad: function() {
      if ($(this.element).attr ('title'))
        this.title = $(this.element).attr ('title');
      else if ($(this.element).attr ('alt'))
        this.title = $(this.element).attr ('alt');
      else if ($(this.element).data ('fancybox_title'))
        this.title = $(this.element).data ('fancybox_title');
    },
    padding : 0,
    helpers : {
      overlay: {
        locked: false
      },
      title : {
        type : 'over'
      },
      thumbs: {
        width: 50,
        height: 50
      }
    }
  });
});