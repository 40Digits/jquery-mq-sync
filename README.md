# jQuery Media Query Sync

This leightweight script offers a way to do various checks against CSS media queries in JavaScript.

Simply include the `jquery.mq-sync.js` and `media-queries.css` files into your page and you're already up and detecting the media queries.  Of course, not a lot happens until you tell it to.

Let's take a look inside the CSS file.  You'll note a few sections that look like:
```css
@media (min-width: 480px) {
	html {
		font-family: 'mq-small';
	}
}
```

These are the media queries we'll match against.  In this case, our media query name for minimum width of 480px will be `mq-small`.  This should be overridden by subsequently larger media queries until you've set all of your names using the `font-family` property.

Now that we have our media queries properly named in CSS, it's time to tell Media Query Sync that we want to do something when it changes.  Fortunately, we can just hook into the `mediaQueryChange` event on the `html` element:

```javascript
$('html').on('mediaQueryChange', function (event, newMediaQuery, oldMediaQuery) {
	console.log('Media query switched to ' + newMediaQuery + ' from ' + oldMediaQuery);
});
```

Here we have it printing out the old media query and the new to the console.  You can do a lot more advanced stuff, though, like make it pull in different image sizes depending on your current media query--check out `index.html` to see some code to do just that!

All images are [CC-by-SA](https://creativecommons.org/licenses/by-sa/2.0/).  All photo credits go to [Jyrki Salmi](https://www.flickr.com/photos/salman2000/9321259912/in/photolist-8AzFse-9cNVnJ-fcFTPN-QpGE-cigLrb-bvFnmV-awLfbF-auM1AF-2AtmWK-yvc5B-4eP2yG-QpGr-mFJ193-8H5Nv-585qnn-6tQ2KE-3uLPK-dX5HFw-heSew-ckFbbs-g45UrJ-newZyv-8ZcSiK-g45UC5-6faMZ9-fxbNsT-8ytZp8-9AfWjq-2ReWd-fKcQ2o-necG2M-9LrHyW-g45UdB-vzAmt-8ow9c2-52SctX-hr4Cpf-KsVwc-fBFrKD-bjkro-bo6mrm-aniwe9-6Gk4gZ-dJ8LNL-bvY5MN-6VATrQ-5rJX77-eKeG2a-v73ru-69VvCX) for his wonderful work.