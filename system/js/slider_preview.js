/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2014 OA Wu Design
 */
(function (factory) {
    if (typeof define === 'function' && define.amd)
        define(['jquery'], factory);
    else
        factory(jQuery);
}(function ($) {
        
    var _timer = 0,
        _arrowCount = 0,
        d4Options = {
            d4Count: 10
        },
        functions = {
            init: function(options){
                $.extend (d4Options, options);
                initUI.apply (this);
                initEvent.apply (this);
            }
        },
        initEvent = function () {
          var $blocks = $(this).find ('.silders'),
              $block = $blocks.find ('.silder'),
              $firstBlock = $block.first (),
              blockWidth = parseFloat ($firstBlock.css ('width')) + parseFloat ($firstBlock.css ('margin-left')) + parseFloat ($firstBlock.css ('margin-right')),
              $blocks_container = $(this).find ('.silders_container'),
              $arrowLeft = $(this).find ('.arrow-left'),
              $arrowRight = $(this).find ('.arrow-right');

          $arrowLeft.click (function () {
              _arrowCount = Math.ceil($blocks_container.scrollLeft () / blockWidth);
              _arrowCount = --_arrowCount < 0 ? 0 : _arrowCount;
              scrollTo ($blocks_container, blockWidth * _arrowCount, 300);
          });

          $arrowRight.click (function () {
              _arrowCount = Math.floor ($blocks_container.scrollLeft () / blockWidth);
              _arrowCount = ++_arrowCount < 0 ? 0 : _arrowCount;
              scrollTo ($blocks_container, blockWidth * _arrowCount, 300);
          });
        },
        initUI = function () {
          var $blocks = $(this).find ('.silders'),
              $block = $blocks.find ('.silder'),
              $firstBlock = $block.first (),
              blockCount = $block.length > d4Options.d4Count ? d4Options.d4Count : $block.length,
              blockWidth = parseFloat ($firstBlock.css ('width')) + parseFloat ($firstBlock.css ('margin-left')) + parseFloat ($firstBlock.css ('margin-right'));
          _arrowCount = 0;
          $blocks.css ({'width': (blockCount * blockWidth) + 'px' });
        },
        scrollTo = function (element, to, duration) {
            var start = element.scrollLeft (),
                change = to - start,
                currentTime = 0,
                increment = 20;

            clearTimeout(_timer);

            var animateScroll = function(){
                currentTime += increment;
                var val = easeInOutQuad(currentTime, start, change, duration);
                element.scrollLeft (val);
                if(currentTime < duration) {
                    _timer = setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        },
        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

    $.fn.sliderPreview = function (options) {
        var fn = functions.init;
        if (!fn) throw new Error("Unknown function name '"+ action +"' for timeago");
        this.each (function () { fn.call (this, options); });
        return this;
    };
}));