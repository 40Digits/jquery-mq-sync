(function ($) {

	$.mqSync = {
		currentMediaQuery: '', // The current media query
		mqOrderNamed: {}, // The order of the named media queries
		mqOrderNumbered: [], // The order of the media queries

		/**
		 * Set up the media query plugin
		 * @param options The options to pass at run time
		 */
		init: function (options) {
			// Initialize the media query
			currentMediaQuery = this.fetchMediaQuery();
			$('body').data('media-query', currentMediaQuery);

			// On window resize, set media query var
			$(window).resize(this.onResize);
		},

		/**
		 * Return the current media query
		 */
		getMediaQuery: function () {
			return currentMediaQuery;
		},


		/**
		 * Alias to get the current media query
		 */
		mq: this.getMediaQuery,


		/**
		 * Check if the media query name is a match
		 * @param which The media query to check against
		 */
		matches: function (which) {
			// See if the current media query matches the requested one
			return (currentMediaQuery == requestedQueryName);
		},


		/**
		 * Check if the media query is greater than the specified
		 * @param which The media query to check against
		 */
		isAbove: function (which) {
			if (this.mqOrder[currentMediaQuery] > this.mqOrder[which])
				return true;

			return false;
		},


		/**
		 * Check if the media query is less than the specified
		 * @param which The media query to check against
		 */
		isBelow: function (which) {
			if (this.mqOrder[currentMediaQuery] < this.mqOrder[which])
				return true;

			return false;
		},


		/**
		 * When the browser is resized, update the media query
		 */
		onResize: function () {
			var lastQuery = currentMediaQuery;

			// Set the global current media query
			currentMediaQuery = $.mqSync.fetchMediaQuery();

			// The media query does not match the old
			if (currentMediaQuery != lastQuery) {
				// Fire an event noting that the media query has changed
				$('html').trigger('mediaQueryChange', [currentMediaQuery, lastQuery]);
				$('body').data('media-query', currentMediaQuery);
			}

		},


		/**
		 * Read in the media query
		 */
		fetchMediaQuery: function () {
			// We read in the media query name from the html element's font family
			var mq = $('html').css('font-family');

			// Strip out quotes and commas
			mq = mq.replace(/['",]/g, '');

			return mq;
		},


		/**
		 * Set the order of media queries
		 * @param orderedArray An array of the media queries in order from smallest to largest
		 */
		setOrder: function (orderedArray) {
			var self = this;

			this.mqOrderNumbered = orderedArray;

			$.each(orderedArray, function(index, value) {
				self.mqOrderNamed[value] = index;
			});
		},

		/**
		 * This module resizes responsive images automatically
		*/
		responsiveImages: {

			/**
			 * Initialize events
			 */
			init: function() {
				var self = this;

				// Every time the media query changes, do these things
				function onMediaQueryChange (event, newMediaQuery, oldMediaQuery) {
					self.update(newMediaQuery);
				}

				$('html').on('mediaQueryChange', onMediaQueryChange);

				// Loop through each and store its original source
				$('img.responsive').each(function () {
					$(this).data('original-src', $(this).attr('src'));
				});

				// Update the current responsive image size
				this.update();
			},

			/**
			 * Run through each responsive image and see if an image exists at that media query
			 * @param newMediaQuery [current] The new media query to load
			 */
			update: function (newMediaQuery) {
				// Default to the current media query - just run an update
				if (newMediaQuery == null)
					newMediaQuery = $.mqSync.getMediaQuery();

				// Loop over each responsive image and update its source
				$('img.responsive').each(function () {
					var mqOrderNumbered = $.mqSync.mqOrderNumbered,
						$img = $(this),
						mqMax = 0,
						current,
						currentSource = null;

					mqMax = $.mqSync.mqOrderNamed[newMediaQuery];

					// If there is an ordered list of media queries
					if ($.mqSync.mqOrderNumbered.length > 0) {
						// Loop backwards and find the nearest match
						for (var ii = mqMax; ii >= 0; ii--) {
							current = $.mqSync.mqOrderNumbered[ii];
							currentSource = $img.data(current + '-src');

							if (currentSource != null) {
								break;
							}
						}
					} else {
						// No ordered list of media queries, so just check the current
						currentSource = $img.data(newMediaQuery + '-src');
					}

					if (currentSource) {
						// There is an image supplied for this media query
 						$img.attr('src', currentSource);
					} else {
						// Default to the original image
						$img.attr('src', $img.data('original-src'));
					}
				});
			}

		} // End responsive images module

	};


	// Do this stuff when the page is ready
	$(document).ready(function () {
		$.mqSync.init();
	});

}(jQuery));
