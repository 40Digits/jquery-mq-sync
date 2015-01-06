# jQuery Media Query Sync

This lightweight script offers a way to do various checks against CSS media queries in JavaScript.  Can automatically replace images based on the current media query.

## Setup

### 1. Include jQuery

``` html
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
```

### 2. Include the Media Query Sync script

```html
<script type="text/javascript" src="../jquery.mq-sync.js"></script>
```


### 3. Set up CSS Media Queries
Media Query Sync looks at the `font-family` property of the `html` element.  Using CSS, set up your media queries with appropriate names:

```css
@media (min-width: 480px) {
	html {
		font-family: 'mq-small';
	}
}
```


### 4. Listen for a media query change event
In the case of the media query changing, a `mediaQueryChange` event is fired.  The callback for these events will be supplied the event, the name of the new media query, and the name of the previous media query.

```javascript
$('html').on('mediaQueryChange', function (event, newMediaQuery, oldMediaQuery) {
	console.log('Media query switched to ' + newMediaQuery + ' from ' + oldMediaQuery);
});
```


### 5. Set the order of the media queries
In your script, set the order of your named media queries from narrowest to widest.

```javascript
var mqOrder = [
	'mq-small',
	'mq-medium',
	'mq-large',
	'mq-xlarge',
	'mq-xxlarge'
];

// Set the order of media queries we're using
$.mqSync.setOrder(mqOrder);
```


### 6. Swap images at different media queries
Media Query Sync comes with a responsive image source swapper which changes the source of an image depending on the media query.  This is useful to send only the proper resolution to optimize the users' experience.  To enable it, run this at load time:

```javascript
$.mqSync.responsiveImages.init();
```



##License
jQuery Media Query Sync is copyright (c) 2014 - 2015 [40Digits](http://www.40digits.com) and is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Example images are [CC-by-SA](https://creativecommons.org/licenses/by-sa/2.0/).  All photo credits go to [Jyrki Salmi](https://www.flickr.com/photos/salman2000/9321259912/) for his wonderful work.