/*! jQuery Simple Thumb Slider Plugin
*

*
* @version 0.0.1
* @link https://github.com/guins/jQuery.simpleThumbSlider
* @author Stéphane Guigné (http://stephaneguigne.com)
* @license MIT
* @copyright (c) 2013, Stéphane Guigné
*
* Last modification : 2013-07-30
*
*/

;(function ($) {
	'use strict';

	// Just change 'pluginName' variable
	// and you are good to go
	// jump into 'Plugin' function and start coding

	var pluginName = 'simpleThumbSlider',
		prefix = 'sts',

		// Defaults options
		defaults = {
			stopOnAnimate      : true,
			beforeCallback     : null,
			afterCallback      : null,
			waitBeforeCallback : false,
			waitAfterCallback  : true
		},

		Plugin = function( $el, options ){
			console.log('Init '+pluginName);
			
			var $container = $el,
				$slider = $('.sts-slider').first(),
				sliderWidth = 0,
				sliderHeight = 0,
				isAnimating = false,
				$currentThumb = null;

			$el.on('update', _update).trigger('update');

			$slider.on('click', '.sts-thumb', function(e){
				var $slider = $(e.target),
					$thumbs = $('.sts-thumb.selected'),
					$thumb = $(e.currentTarget);

				e.preventDefault();

				if( !$thumb.hasClass('selected') ){
					$thumbs.removeClass('selected');
					$thumb.addClass('selected');
					$currentThumb = $thumb;
					_beforeSlide();
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

			function _beforeSlide(){
				console.log('_beforeSlide');
				var differed = false;

				if(isAnimating && options.stopOnAnimate) return false;
				isAnimating = true;
				
				if(options.beforeCallback && options.waitBeforeCallback){
					differed = true;
				}
				else if(options.beforeCallback){
					options.beforeCallback();
				}

				if( differed ){
					options.beforeCallback().done( _doSlide );
				}
				else {
					_doSlide();
				}
			}

			function _doSlide($thumb){
				console.log('_doSlide');
				$.when(
					$slider.stop(true,false).animate({ marginLeft:-$currentThumb.position().left }, 500)
				).
				done( _afterSlide );
			}

			function _afterSlide(){
				console.log('_afterSlide');
				var differed = false;

				if(options.afterCallback && !options.waitAfterCallback){
					options.afterCallback()
				}
				else if(options.afterCallback){
					differed = true;
				}

				if( differed ){
					options.afterCallback().done( _animationComplete );
				}
				else {
					_animationComplete();
				}
			}

			function _animationComplete(){
				console.log('_animationComplete');
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