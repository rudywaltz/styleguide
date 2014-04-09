;(function($) {
	'use strict';

	/**
	 * Represent the tabs
	 * @constructor
	 * @param {jQuery} $tabs - tabs jQuery object
	 * @param {object} options - user defined options
	 */
	$.bfTabs = function($tabs) {

		/**
		 * Init tabs
		 */
		this.init = function() {
			this.$tabs = $tabs;
			this.setTabs();
		};

		/**
		 * Set tabs functions
		 */
		this.setTabs = function() {
			var $tabItems = this.$tabs.children('li'),
				$inputs = $tabItems.children('input'),
				$labels = $tabItems.children('label');

			if (this.isIE8()) {
				$inputs.filter(':checked')
					.prop('checked', false)
					.parent()
						.addClass('checked');

				$labels.on('click', function() {
					var $tab = $(this).parent();
					$tabItems.removeClass('checked');
					$tab.addClass('checked');
				});
			}
		};

		/**
		* Check ie8 browser
		* @returns {boolean}
		*/
		this.isIE8 = function() {
			return $('html').is('.lte-ie8');
		};

		this.init();
	};

	/**
	 * jQuery function
	 * @returns {jQuery}
	 */
	$.fn.bfTabs = function() {
		return this.each(function() {
			return (new $.bfTabs($(this)));
		});
	};

}(jQuery));