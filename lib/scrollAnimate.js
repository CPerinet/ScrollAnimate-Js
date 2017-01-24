let Hamster = require('hamsterjs')

class ScrollAnimate {
	constructor(wrapper, isAnimatingUpdate) {
		this.wrapper = wrapper
		this.isAnimatingUpdate = isAnimatingUpdate

		if (!wrapper)
			console.error('ScrollAnimate : Please define wrapper')

		this.scrollAnimates = []

		if (wrapper)
			this.addEventListeners()
	}

	addEventListeners() {
		this.wrapper.onscroll = this.onScroll.bind(this)
		this.wrapper.ontouchstart = this.onTouchStart.bind(this)
		this.wrapper.ontouchmove = this.onTouchMove.bind(this)
		Hamster(this.wrapper).wheel(this.onWheel.bind(this))
	}

	updateIsAnimating() {
		if (typeof this.isAnimatingUpdate === 'function')
			this.isAnimatingUpdate(this.isAnimating())
	}

	isAnimating() {
		for (let i = 0; i < this.scrollAnimates.length; i++) {
			if (this.scrollAnimates[i].isAnimating)
				return true
		}
		return false
	}

	onScroll(ev) {
		this.scrollAnimates.forEach((item) => {
			item.scroll(ev)
		})
	}

	onWheel(ev, delta, deltaX, deltaY) {
		this.scrollAnimates.forEach((item) => {
			item.wheel(ev, delta, deltaX, deltaY)
		})
	}

	onTouchStart(ev) {
		this.scrollAnimates.forEach((item) => {
			item.touchStart(ev)
		})
	}

	onTouchMove(ev) {
		this.scrollAnimates.forEach((item) => {
			item.touchMove(ev)
		})
	}

	create(element, triggerOffsetTop, scrollForComplete, onProgressUpdate) {
		if (this.wrapper)
			this.scrollAnimates.push(
				new ScrollAnimateItem(this.wrapper, element, triggerOffsetTop, scrollForComplete, onProgressUpdate, this.updateIsAnimating.bind(this))
			)
		else
			console.error('ScrollAnimate : Cant create animation, please define wrapper')
	}
}

class ScrollAnimateItem {
	constructor(wrapper, element = 0, triggerOffsetTop = 0, scrollForComplete = 1000, onProgressUpdate, updateIsAnimating) {
		this.wrapper = wrapper 
		this.element = element
		this.triggerOffsetTop = triggerOffsetTop
		this.scrollForComplete = scrollForComplete
		this.onProgressUpdate = onProgressUpdate
		this.updateIsAnimating = updateIsAnimating
		
		this.animated = false
		this.isAnimating = false
		this.animationScroll = 0
		this.animationAmount = 0
		this.firstTouchScroll = 0
	}

	getOffsetTop(elem) {
		let offsetTop = 0
		do {
			if (!isNaN(elem.offsetTop)) {
				offsetTop += elem.offsetTop
			}
		} while(elem = elem.offsetParent)
		return offsetTop
	}

	checkTrigger() {
		if (!this.animated && !this.isAnimating) {
			let scrollTop = this.wrapper.scrollTop
			let offsetTop = this.getOffsetTop(this.element)
			let trigger = (offsetTop - this.triggerOffsetTop < scrollTop)

			if (trigger)
				this.isAnimating = true
		}
	}

	scroll() {
		this.checkTrigger()
	}

	wheel(ev, delta, deltaX, deltaY) {
		if (this.isAnimating)
			this.updateAnimationAmount(deltaY)
	}

	touchStart(ev) {
		this.checkTrigger()

		let touch = ev.touches[0] || ev.changedTouches[0]
		let touchY = touch.pageY

		this.lastTouchScroll = touchY
	}

	touchMove(ev) {
		this.checkTrigger()

		let touch = ev.touches[0] || ev.changedTouches[0]
		let touchY = touch.pageY

		if (this.isAnimating) {
			ev.preventDefault()
			let scroll = (touchY - this.lastTouchScroll)
			this.updateAnimationAmount(scroll, touchY)
		} else if (!this.animated)
			this.lastTouchScroll = touchY
	}

	updateAnimationAmount(scroll, lastTouchScroll) {
		let animationScroll = this.animationScroll - scroll
		let animationAmount = animationScroll /  this.scrollForComplete

		if (animationAmount < 0) {
			this.isAnimating = false
			this.animationScroll = 0
			animationAmount = 0
		} else if (animationAmount > 1) {
			this.isAnimating = false
			this.animated = true
			animationAmount = 1
		} else {
			this.animationScroll = animationScroll
			this.lastTouchScroll = lastTouchScroll || this.lastTouchScroll
		}

		this.updateIsAnimating()
		if (typeof this.onProgressUpdate === 'function') this.onProgressUpdate(animationAmount)
	}
}

module.exports = ScrollAnimate