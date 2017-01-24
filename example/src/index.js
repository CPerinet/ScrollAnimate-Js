import './scss/app.scss'
import ScrollAnimate from '../../lib/scrollAnimate'

let wrapper = document.getElementById('wrapper')
let timeline1 = document.getElementById('timeline1')
let timeline2 = document.getElementById('timeline2')
let timeline3 = document.getElementById('timeline3')

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

let animation3 = scrollAnimate.create(timeline3, 150, 1000, (progress) => {
	timeline3.style.width = progress * 100 + '%'
})
