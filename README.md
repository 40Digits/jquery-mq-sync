# Media Query Sync

This lightweight script offers a way to do various checks against CSS media queries in JavaScript and offers the ability to replace images based on the result.


## Setup

There are two different ways to use MQ Sync.

### 1. Install With NPM
```bash
npm install mq-sync
```
Then require the module inside of one of your modules.
```javascript
require('mq-sync');
```

### 2. The Traditional Way

#### 1. Include jQuery

```html
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
```

#### 2. Include the Media Query Sync script

```html
<script type="text/javascript" src="jquery.mq-sync.js"></script>
```


### Set up CSS Media Queries
Media Query Sync looks at the `font-family` property of the `head` element.

MQ Sync needs to know the order of your breakpoints, so list them on `head:after`.
```css
head:after {
	font-family: 'mq-tiny,mq-small,mq-medium,mq-large,mq-xlarge,mq-xxlarge';
}
```

Using CSS, set up your media queries with appropriate names:
```css
@media (min-width: 480px) {
	head {
		font-family: 'mq-small';
	}
}
```


## Usage

### Listen for a media query change event
In the case of the media query changing, a `mediaQueryChange` event is fired on `head`.  The callback for these events will be supplied the event, the name of the new media query, and the name of the previous media query.

```javascript
$('head').on('mediaQueryChange', function (event, newMediaQuery, oldMediaQuery) {
	console.log('Media query switched to ' + newMediaQuery + ' from ' + oldMediaQuery);
});
```

### Test against the current media query
To see if the current media query is larger than a specified query, use `$.mqSync.isAbove()`.  For checking if it's smaller, use `$.mqSync.isBelow()`.
```javascript
if ($.mqSync.isBelow('mq-large'))
	$('#result').append(newMediaQuery + ' is smaller than large<br />');
```

### Swap images at different media queries
Media Query Sync comes with a responsive image source swapper which changes the source of an image depending on the media query.  This is useful to send only the proper resolution to optimize the users' experience.  To enable it, run this at load time:

```javascript
$.mqSync.responsiveImages();
```

Your images must include `data` attributes that have your different image sources.
```html
`<img class="mqsync-responsive" src="default-image.jpg" data-mq-mini="mini-image-src.jpg" data-mq-large="large-image-src.jpg" />`
```


## Methods

#### ```isBelow( string )```
`string`: the media query to check against.
Returns `true` if the current media query is below a specified media query, and `false` otherwise.

#### ```isAbove( string )```
`string`: the media query to check against.
Returns `true` if the current media query is above a specified media query, and `false` otherwise.

#### ```responsiveImages( string || element )```
`string || element`: jQuery Element. Can pass in a string `.my-custom-class` or jquery element `$('.my-custom-class')` (Default `.mqsync-responsive`)
Replaces images automagically across specified breakpoints for selected elements. Use `data` attributes to provide the image sources.
```html
<img class="mqsync-responsive" src="default-image.jpg" data-mq-mini="mini-image-src.jpg" data-mq-large="large-image-src.jpg" />
```

You can also use this with background images.
```html
<div class="mqsync-responsive" style="background-image: url(default-image.jpg)" data-mq-mini="mini-image-src.jpg" data-mq-large="large-image-src.jpg"></div>
```


## License
jQuery Media Query Sync is copyright (c) 2014 - 2015 [40Digits](http://www.40digits.com) and is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Example images are [CC-by-SA](https://creativecommons.org/licenses/by-sa/2.0/) by [Jyrki Salmi](https://www.flickr.com/photos/salman2000/9321259912/).
