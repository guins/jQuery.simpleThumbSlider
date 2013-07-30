;(function ($) {
	'use strict';

	// Just change 'pluginName' variable
	// and you are good to go
	// jump into 'Plugin' function and start coding

	var pluginName = 'simpleThumbSlider',
		prefix = 'sts',

		// Defaults options
		defaults = {
			stopOnAnimate: true
		},

		Plugin = function( $el, options ){
			console.log('Init '+pluginName);
			
			var $container = $el,
				$slider = $('.sts-slider').first(),
				sliderWidth = 0,
				sliderHeight = 0,
				isAnimating = false;

			$el.on('update', _update).trigger('update');

			$slider.on('click', '.sts-thumb', function(e){
				var $slider = $(e.target),
					$thumbs = $('.sts-thumb.selected'),
					$thumb = $(e.currentTarget);

				e.preventDefault();

				if( !$thumb.hasClass('selected') ){
					$thumbs.removeClass('selected');
					$thumb.addClass('selected');
					_slideToThumb($thumb);
				}
			});

			function _update(){
				sliderWidth = sliderHeight = 0;

				$('.sts-thumb', $el).each(function(){
					var $thumb = $(this),
						thumbHeight = $thumb.outerHeight();
					sliderWidth += $thumb.outerWidth();
					sliderHeight = thumbHeight>sliderHeight ? thumbHeight : sliderHeight;
				});

				_resizeSlider();
			}

			function _resizeSlider(){
				$slider.css({
					width : sliderWidth,
					height : sliderHeight
				});
			}

			function _slideToThumb($thumb){
				if(isAnimating) return true;
				isAnimating = true;
				$.when(
					$slider.stop(true,false).animate({ marginLeft:-$thumb.position().left }, 500)
				).done(_slided)
			}

			function _slided(){
				isAnimating = false;
			}
		};

	$.fn[pluginName] = function (options) {
		var o = $.extend(defaults,options);
		return this.each(function(){
			var $this = $(this);
			// Init Plugin once by elemts
			if( !$this.data(pluginName) ){
				$this.data(pluginName, new Plugin($this,o) );
			}
		});
	};

})(jQuery);