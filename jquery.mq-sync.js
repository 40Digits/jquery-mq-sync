(function ($) {
	// The current media query
	var currentMediaQuery = '';

	// Which element holds the media query data?
	var $queriedElement;

	// Apply the media query as a class to this element
	var $applyClassTo;


	// Set up the media query plugin
	$.fn.mqSync = function (options) {

		// Default variables
		var defaults = {
			queriedElement: $(this),
			applyClassTo: $('body')
		};

		// Override defaults with user options
		options = $.extend(defaults, options);

		$queriedElement = options.queriedElement;

		$applyClassTo = options.applyClassTo;

		// Initialize the media query
		currentMediaQuery = fetchMediaQuery();
		$applyClassTo.data('media-query', currentMediaQuery);

		// On window resize, set media query var
		$(window).resize(onResize);
	};


	// Return the current media query
	$.fn.mqSync.getMediaQuery = function () {
		return currentMediaQuery;
	};


	// Check if the media query name is a match
	$.fn.mqSync.matches = function (requestedQueryName) {
		// See if the current media query matches the requested one
		return (currentMediaQuery == requestedQueryName);
	};


	// When the browser is resized, update the media query
	function onResize () {
		var lastQuery = currentMediaQuery;

		// Set the global current media query
		currentMediaQuery = fetchMediaQuery();

		// The media query does not match the old
		if (currentMediaQuery != lastQuery) {
			// Fire an event noting that the media query has changed
			$queriedElement.trigger('mediaQueryChange', currentMediaQuery, lastQuery);
			$applyClassTo.data('media-query', currentMediaQuery);
		}

	}


	// Read in the media query
	function fetchMediaQuery () {
		// We read in the media query name from the html element's font family
		var mq = $queriedElement.css('font-family');

		// Strip out quotes and commas
		mq = mq.replace(/['",]/g, '');

		return mq;
	};

})(jQuery);