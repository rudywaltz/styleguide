;(function($) {
	'use strict';

	/**
	 * Represent the accordion
	 * @constructor
	 * @param {jQuery} $accordion - accordion jQuery object
	 * @param {object} options - user defined options
	 */
	$.bfAccordion = function($accordion, options) {

		/** Default config values */
		this.config = {
			animation: false,
			duration: 400,
			easing: 'swing'
		};

		/**
		 * Init accordion
		 */
		this.init = function() {
			this.$accordion = $accordion;
			this.options = $.extend({}, this.config, options);
			this.setAccordion();
		};

		/**
		 * Set accordion functions
		 */
		this.setAccordion = function() {
			var thisRef = this,
				$tabs = this.$accordion.children('li'),
				$labels = $tabs.children('label'),
				$contents = $tabs.find('.accordion-content'),
				$inputs = $tabs.children('input'),
				inputType = $inputs.eq(0).attr('type');

			if (this.options.animation || this.isIE8()) {
				$inputs
					.filter(':checked')
					.prop('checked', false)
					.parent()
						.addClass('checked');

				$labels.on('click', function(event) {

					event.preventDefault();

					var $accordionTab = $(this).parent(),
						$accordionContent = $accordionTab.find('.accordion-content'),
						animationDuration = (thisRef.options.animation)
											? thisRef.options.duration : 1;

					if (inputType === 'radio') {
						$contents
							.filter(':visible')
							.stop(true)
							.slideUp(animationDuration, thisRef.options.easing, function() {

								if(!$contents.filter(':visible').length) {
									$tabs.removeClass('checked');
								} else {
									$tabs.not($accordionTab).removeClass('checked');
								}
							});
					} else if ($accordionTab.is('.checked')) {
						$accordionContent
							.stop(true)
							.slideUp(animationDuration, thisRef.options.easing, function() {
								$accordionTab.removeClass('checked');
							});
					}

					if (!$accordionTab.hasClass('checked')) {
						$accordionTab.addClass('checked');
						$accordionContent.css({display: 'none'})
							.stop(true)
							.slideDown(animationDuration, thisRef.options.easing);
					}
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
	$.fn.bfAccordion = function(options) {
		return this.each(function() {
			return (new $.bfAccordion($(this), options));
		});
	};

}(jQuery));