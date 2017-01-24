/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _hamsterjs = __webpack_require__(2);

	var _hamsterjs2 = _interopRequireDefault(_hamsterjs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ScrollAnimate = function () {
		function ScrollAnimate(wrapper, isAnimatingUpdate) {
			_classCallCheck(this, ScrollAnimate);

			this.wrapper = wrapper;
			this.isAnimatingUpdate = isAnimatingUpdate;

			this.scrollAnimates = [];

			this.addEventListeners();
		}

		_createClass(ScrollAnimate, [{
			key: 'addEventListeners',
			value: function addEventListeners() {
				this.wrapper.onscroll = this.onScroll.bind(this);
				this.wrapper.ontouchstart = this.onTouchStart.bind(this);
				this.wrapper.ontouchmove = this.onTouchMove.bind(this);
				(0, _hamsterjs2.default)(this.wrapper).wheel(this.onWheel.bind(this));
			}
		}, {
			key: 'updateIsAnimating',
			value: function updateIsAnimating() {
				if (typeof this.isAnimatingUpdate === 'function') this.isAnimatingUpdate(this.isAnimating());
			}
		}, {
			key: 'isAnimating',
			value: function isAnimating() {
				for (var i = 0; i < this.scrollAnimates.length; i++) {
					if (this.scrollAnimates[i].isAnimating) return true;
				}
				return false;
			}
		}, {
			key: 'onScroll',
			value: function onScroll(ev) {
				this.scrollAnimates.forEach(function (item) {
					item.scroll(ev);
				});
			}
		}, {
			key: 'onWheel',
			value: function onWheel(ev, delta, deltaX, deltaY) {
				this.scrollAnimates.forEach(function (item) {
					item.wheel(ev, delta, deltaX, deltaY);
				});
			}
		}, {
			key: 'onTouchStart',
			value: function onTouchStart(ev) {
				this.scrollAnimates.forEach(function (item) {
					item.touchStart(ev);
				});
			}
		}, {
			key: 'onTouchMove',
			value: function onTouchMove(ev) {
				this.scrollAnimates.forEach(function (item) {
					item.touchMove(ev);
				});
			}
		}, {
			key: 'create',
			value: function create(element, triggerOffsetTop, scrollForComplete, onProgressUpdate) {
				this.scrollAnimates.push(new ScrollAnimateItem(this.wrapper, element, triggerOffsetTop, scrollForComplete, onProgressUpdate, this.updateIsAnimating.bind(this)));
			}
		}]);

		return ScrollAnimate;
	}();

	exports.default = ScrollAnimate;

	var ScrollAnimateItem = function () {
		function ScrollAnimateItem(wrapper, element, triggerOffsetTop) {
			var scrollForComplete = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
			var onProgressUpdate = arguments[4];
			var updateIsAnimating = arguments[5];

			_classCallCheck(this, ScrollAnimateItem);

			this.wrapper = wrapper;
			this.element = element;
			this.triggerOffsetTop = triggerOffsetTop;
			this.scrollForComplete = scrollForComplete;
			this.onProgressUpdate = onProgressUpdate;
			this.updateIsAnimating = updateIsAnimating;

			this.animated = false;
			this.isAnimating = false;
			this.animationScroll = 0;
			this.animationAmount = 0;
			this.firstTouchScroll = 0;
		}

		_createClass(ScrollAnimateItem, [{
			key: 'getOffsetTop',
			value: function getOffsetTop(elem) {
				var offsetTop = 0;
				do {
					if (!isNaN(elem.offsetTop)) {
						offsetTop += elem.offsetTop;
					}
				} while (elem = elem.offsetParent);
				return offsetTop;
			}
		}, {
			key: 'checkTrigger',
			value: function checkTrigger() {
				if (!this.animated && !this.isAnimating) {
					var scrollTop = this.wrapper.scrollTop;
					var offsetTop = this.getOffsetTop(this.element);
					var trigger = offsetTop - this.triggerOffsetTop < scrollTop;

					if (trigger) this.isAnimating = true;
				}
			}
		}, {
			key: 'scroll',
			value: function scroll() {
				this.checkTrigger();
			}
		}, {
			key: 'wheel',
			value: function wheel(ev, delta, deltaX, deltaY) {
				if (this.isAnimating) this.updateAnimationAmount(deltaY);
			}
		}, {
			key: 'touchStart',
			value: function touchStart(ev) {
				this.checkTrigger();

				var touch = ev.touches[0] || ev.changedTouches[0];
				var touchY = touch.pageY;

				this.lastTouchScroll = touchY;
			}
		}, {
			key: 'touchMove',
			value: function touchMove(ev) {
				this.checkTrigger();

				var touch = ev.touches[0] || ev.changedTouches[0];
				var touchY = touch.pageY;

				if (this.isAnimating) {
					ev.preventDefault();
					var scroll = touchY - this.lastTouchScroll;
					this.updateAnimationAmount(scroll, touchY);
				} else if (!this.animated) this.lastTouchScroll = touchY;
			}
		}, {
			key: 'updateAnimationAmount',
			value: function updateAnimationAmount(scroll, lastTouchScroll) {
				var animationScroll = this.animationScroll - scroll;
				var animationAmount = animationScroll / this.scrollForComplete;

				if (animationAmount < 0) {
					this.isAnimating = false;
					this.animationScroll = 0;
					animationAmount = 0;
				} else if (animationAmount > 1) {
					this.isAnimating = false;
					this.animated = true;
					animationAmount = 1;
				} else {
					this.animationScroll = animationScroll;
					this.lastTouchScroll = lastTouchScroll || this.lastTouchScroll;
				}

				this.updateIsAnimating();
				if (typeof this.onProgressUpdate === 'function') this.onProgressUpdate(animationAmount);
			}
		}]);

		return ScrollAnimateItem;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Hamster.js v1.1.2
	 * (c) 2013 Monospaced http://monospaced.com
	 * License: MIT
	 */

	(function(window, document){
	'use strict';

	/**
	 * Hamster
	 * use this to create instances
	 * @returns {Hamster.Instance}
	 * @constructor
	 */
	var Hamster = function(element) {
	  return new Hamster.Instance(element);
	};

	// default event name
	Hamster.SUPPORT = 'wheel';

	// default DOM methods
	Hamster.ADD_EVENT = 'addEventListener';
	Hamster.REMOVE_EVENT = 'removeEventListener';
	Hamster.PREFIX = '';

	// until browser inconsistencies have been fixed...
	Hamster.READY = false;

	Hamster.Instance = function(element){
	  if (!Hamster.READY) {
	    // fix browser inconsistencies
	    Hamster.normalise.browser();

	    // Hamster is ready...!
	    Hamster.READY = true;
	  }

	  this.element = element;

	  // store attached event handlers
	  this.handlers = [];

	  // return instance
	  return this;
	};

	/**
	 * create new hamster instance
	 * all methods should return the instance itself, so it is chainable.
	 * @param   {HTMLElement}       element
	 * @returns {Hamster.Instance}
	 * @constructor
	 */
	Hamster.Instance.prototype = {
	  /**
	   * bind events to the instance
	   * @param   {Function}    handler
	   * @param   {Boolean}     useCapture
	   * @returns {Hamster.Instance}
	   */
	  wheel: function onEvent(handler, useCapture){
	    Hamster.event.add(this, Hamster.SUPPORT, handler, useCapture);

	    // handle MozMousePixelScroll in older Firefox
	    if (Hamster.SUPPORT === 'DOMMouseScroll') {
	      Hamster.event.add(this, 'MozMousePixelScroll', handler, useCapture);
	    }

	    return this;
	  },

	  /**
	   * unbind events to the instance
	   * @param   {Function}    handler
	   * @param   {Boolean}     useCapture
	   * @returns {Hamster.Instance}
	   */
	  unwheel: function offEvent(handler, useCapture){
	    // if no handler argument,
	    // unbind the last bound handler (if exists)
	    if (handler === undefined && (handler = this.handlers.slice(-1)[0])) {
	      handler = handler.original;
	    }

	    Hamster.event.remove(this, Hamster.SUPPORT, handler, useCapture);

	    // handle MozMousePixelScroll in older Firefox
	    if (Hamster.SUPPORT === 'DOMMouseScroll') {
	      Hamster.event.remove(this, 'MozMousePixelScroll', handler, useCapture);
	    }

	    return this;
	  }
	};

	Hamster.event = {
	  /**
	   * cross-browser 'addWheelListener'
	   * @param   {Instance}    hamster
	   * @param   {String}      eventName
	   * @param   {Function}    handler
	   * @param   {Boolean}     useCapture
	   */
	  add: function add(hamster, eventName, handler, useCapture){
	    // store the original handler
	    var originalHandler = handler;

	    // redefine the handler
	    handler = function(originalEvent){

	      if (!originalEvent) {
	        originalEvent = window.event;
	      }

	      // create a normalised event object,
	      // and normalise "deltas" of the mouse wheel
	      var event = Hamster.normalise.event(originalEvent),
	          delta = Hamster.normalise.delta(originalEvent);

	      // fire the original handler with normalised arguments
	      return originalHandler(event, delta[0], delta[1], delta[2]);

	    };

	    // cross-browser addEventListener
	    hamster.element[Hamster.ADD_EVENT](Hamster.PREFIX + eventName, handler, useCapture || false);

	    // store original and normalised handlers on the instance
	    hamster.handlers.push({
	      original: originalHandler,
	      normalised: handler
	    });
	  },

	  /**
	   * removeWheelListener
	   * @param   {Instance}    hamster
	   * @param   {String}      eventName
	   * @param   {Function}    handler
	   * @param   {Boolean}     useCapture
	   */
	  remove: function remove(hamster, eventName, handler, useCapture){
	    // find the normalised handler on the instance
	    var originalHandler = handler,
	        lookup = {},
	        handlers;
	    for (var i = 0, len = hamster.handlers.length; i < len; ++i) {
	      lookup[hamster.handlers[i].original] = hamster.handlers[i];
	    }
	    handlers = lookup[originalHandler];
	    handler = handlers.normalised;

	    // cross-browser removeEventListener
	    hamster.element[Hamster.REMOVE_EVENT](Hamster.PREFIX + eventName, handler, useCapture || false);

	    // remove original and normalised handlers from the instance
	    for (var h in hamster.handlers) {
	      if (hamster.handlers[h] == handlers) {
	        hamster.handlers.splice(h, 1);
	        break;
	      }
	    }
	  }
	};

	/**
	 * these hold the lowest deltas,
	 * used to normalise the delta values
	 * @type {Number}
	 */
	var lowestDelta,
	    lowestDeltaXY;

	Hamster.normalise = {
	  /**
	   * fix browser inconsistencies
	   */
	  browser: function normaliseBrowser(){
	    // detect deprecated wheel events
	    if (!('onwheel' in document || document.documentMode >= 9)) {
	      Hamster.SUPPORT = document.onmousewheel !== undefined ?
	                        'mousewheel' : // webkit and IE < 9 support at least "mousewheel"
	                        'DOMMouseScroll'; // assume remaining browsers are older Firefox
	    }

	    // detect deprecated event model
	    if (!window.addEventListener) {
	      // assume IE < 9
	      Hamster.ADD_EVENT = 'attachEvent';
	      Hamster.REMOVE_EVENT = 'detachEvent';
	      Hamster.PREFIX = 'on';
	    }

	  },

	  /**
	   * create a normalised event object
	   * @param   {Function}    originalEvent
	   * @returns {Object}      event
	   */
	   event: function normaliseEvent(originalEvent){
	    var event = {
	          // keep a reference to the original event object
	          originalEvent: originalEvent,
	          target: originalEvent.target || originalEvent.srcElement,
	          type: 'wheel',
	          deltaMode: originalEvent.type === 'MozMousePixelScroll' ? 0 : 1,
	          deltaX: 0,
	          delatZ: 0,
	          preventDefault: function(){
	            if (originalEvent.preventDefault) {
	              originalEvent.preventDefault();
	            } else {
	              originalEvent.returnValue = false;
	            }
	          },
	          stopPropagation: function(){
	            if (originalEvent.stopPropagation) {
	              originalEvent.stopPropagation();
	            } else {
	              originalEvent.cancelBubble = false;
	            }
	          }
	        };

	    // calculate deltaY (and deltaX) according to the event

	    // 'mousewheel'
	    if (originalEvent.wheelDelta) {
	      event.deltaY = - 1/40 * originalEvent.wheelDelta;
	    }
	    // webkit
	    if (originalEvent.wheelDeltaX) {
	      event.deltaX = - 1/40 * originalEvent.wheelDeltaX;
	    }

	    // 'DomMouseScroll'
	    if (originalEvent.detail) {
	      event.deltaY = originalEvent.detail;
	    }

	    return event;
	  },

	  /**
	   * normalise 'deltas' of the mouse wheel
	   * @param   {Function}    originalEvent
	   * @returns {Array}       deltas
	   */
	  delta: function normaliseDelta(originalEvent){
	    var delta = 0,
	      deltaX = 0,
	      deltaY = 0,
	      absDelta = 0,
	      absDeltaXY = 0,
	      fn;

	    // normalise deltas according to the event

	    // 'wheel' event
	    if (originalEvent.deltaY) {
	      deltaY = originalEvent.deltaY * -1;
	      delta  = deltaY;
	    }
	    if (originalEvent.deltaX) {
	      deltaX = originalEvent.deltaX;
	      delta  = deltaX * -1;
	    }

	    // 'mousewheel' event
	    if (originalEvent.wheelDelta) {
	      delta = originalEvent.wheelDelta;
	    }
	    // webkit
	    if (originalEvent.wheelDeltaY) {
	      deltaY = originalEvent.wheelDeltaY;
	    }
	    if (originalEvent.wheelDeltaX) {
	      deltaX = originalEvent.wheelDeltaX * -1;
	    }

	    // 'DomMouseScroll' event
	    if (originalEvent.detail) {
	      delta = originalEvent.detail * -1;
	    }

	    // Don't return NaN
	    if (delta === 0) {
	      return [0, 0, 0];
	    }

	    // look for lowest delta to normalize the delta values
	    absDelta = Math.abs(delta);
	    if (!lowestDelta || absDelta < lowestDelta) {
	      lowestDelta = absDelta;
	    }
	    absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
	    if (!lowestDeltaXY || absDeltaXY < lowestDeltaXY) {
	      lowestDeltaXY = absDeltaXY;
	    }

	    // convert deltas to whole numbers
	    fn = delta > 0 ? 'floor' : 'ceil';
	    delta  = Math[fn](delta / lowestDelta);
	    deltaX = Math[fn](deltaX / lowestDeltaXY);
	    deltaY = Math[fn](deltaY / lowestDeltaXY);

	    return [delta, deltaX, deltaY];
	  }
	};

	if (typeof window.define === 'function' && window.define.amd) {
	  // AMD
	  window.define('hamster', [], function(){
	    return Hamster;
	  });
	} else if (true) {
	  // CommonJS
	  module.exports = Hamster;
	} else {
	  // Browser global
	  window.Hamster = Hamster;
	}

	})(window, window.document);


/***/ }
/******/ ]);