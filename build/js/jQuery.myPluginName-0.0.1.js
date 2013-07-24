/*! jQuery myPluginName Plugin
*
Description of my new jQuery plugin
*
* @version 0.0.1
* @link https://github.com/yourUserName/jQuery.myPluginName
* @author FirstName LastName (http://mysiteurl.tld)
* @license MIT
* @copyright (c) 2000-2013, Your copyright mention
*
* Last modification : 2013-07-24
*
*/

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