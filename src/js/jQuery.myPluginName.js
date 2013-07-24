;(function ($) {
	'use strict';

	// Just change 'pluginName' variable
	// and you are good to go
	// jump into 'Plugin' function and start coding

	var pluginName = 'myPluginName',

		// Defaults options
		defaults = {
		},

		Plugin = function( $el, options ){
			// console.log('Init '+pluginName);
			// console.log($el);
			// console.log(options);
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