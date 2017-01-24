# ScrollAnimate [![NPM version][npm-image]][npm-url]

Animate on scroll.

![Preview](preview.gif)

## Use

### If you want to stop the scroll during animations

```css
html,
body {
	overflow: hidden;
}

#wrapper {
	overflow: auto;
}
```

### Import ScrollAnimate.js

```javascript
// In index.js
import ScrollAnimate from '../../lib/scrollAnimate'
```
```javascript
// Or in index.html
<script src="scrollAnimate.js"></script>
```

### Init scrollAnimate

```javascript
var scrollAnimate = new ScrollAnimate(wrapper, onAnimatingUpdate)

// If you want the scroll to stop during animation,
// use onAnimatingUpdate to update the wrapper overflow like so :
function onAnimatingUpdate(isAnimating) {
	document.getElementById('wrapper').style.overflow = (isAnimating ? 'hidden' : 'auto')
}

```

|Name|Type|Description|
|----|----|-----------|
|wrapper|DOM element|Main wrapper, scrollAnimate add event listeners to this wrapper|
|onAnimatingUpdate|function(isAnimating)|Callback triggered when the animating state change|

### Create new animaiton

```javascript
var animation = scrollAnimate.create(element, triggerOffsetTop, scrollForComplete, onProgressUpdate)
```

|Name|Type|Description|
|----|----|-----------|
|element|DOM element|Element animated, required to determine when the animation should trigger|
|triggerOffsetTop|int|Add offset top before animation triggers|
|scrollForComplete|int|	Amount of virtual scroll required to complete the animation, the more the longer|
|onProgressUpdate|function(progress)|Callback when animation progress update. progress is between 0 and 1|

### Example

```javascript
import ScrollAnimate from 'scrollAnimate'

let wrapper = document.getElementById('wrapper')
let timeline1 = document.getElementById('timeline1')
let timeline2 = document.getElementById('timeline2')

let scrollAnimate = new ScrollAnimate(wrapper, onAnimatingUpdate)

function onAnimatingUpdate(isAnimating) {
	wrapper.style.overflow = (isAnimating ? 'hidden' : 'auto')
}

let animation1 = scrollAnimate.create(timeline1, 150, 1000, (progress) => {
	timeline1.style.width = progress * 100 + '%'
})

let animation2 = scrollAnimate.create(timeline2, 150, 1000, (progress) => {
	timeline2.style.width = progress * 100 + '%'
})
```

## Todo
+ Reverse mode
+ Tests


[npm-url]: https://npmjs.org/package/scrollanimate
[npm-image]: http://img.shields.io/npm/v/scrollanimate.svg