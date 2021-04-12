"use strict"
const cl = console.log

document.addEventListener("DOMContentLoaded", function(event) {

	const audioObj = new Audio('mp3/clickb1.mp3');
	let score_count = 0
	// let meal = 'fly'
	let scores_per_click = 1



	const frog = document.getElementById('frog')
	const frog_wrapper = document.getElementById('frog_wrapper')
	const click_layer = document.getElementById('click_layer')
	const scores_elem = document.getElementById('scores')
	const meal_btns = document.getElementById('meal_btns')
	const meal_elem = document.getElementById('meal_name')
	let meal_btns_arr = meal_btns.querySelectorAll('.meal')


	if(frog) frog.ondragstart = function() { return false } // если картинка

	click_layer.addEventListener('click', function(event) {
		audioObj.play()
		show_score(frog_wrapper, event) 
		check_meal()
	})

	meal_btns.addEventListener('click', function(event) {
		if (event.target.tagName !== 'BUTTON') return false

		const button = event.target

		scores_per_click = +button.name
		meal_elem.innerText = button.value + ':' + button.name

		const price = button.dataset.price
		cl(price)
		button.classList.add('used')
		button.setAttribute('disabled','disabled')
		meal_btns_arr = meal_btns.querySelectorAll('.meal:disabled:not(.used)')

		// meal_btns_arr.forEach(function(meal_btn) {
		// 	const price = meal_btn.dataset.price
		// 	if (score_count >= price) {
		// 		meal_btn.removeAttribute('disabled')
		// 		meal_btns_arr = meal_btns.querySelectorAll('.meal:disabled')
		// 	}
		// })
	})


function check_meal() {
	if(!meal_btns_arr.length) return false
	meal_btns_arr.forEach(function(meal_btn) {
		const price = meal_btn.dataset.price
		if (score_count >= price) {
			meal_btn.removeAttribute('disabled')
			meal_btns_arr = meal_btns.querySelectorAll('.meal:disabled:not(.used)')
		}
	})
}




function show_score(frog_wrapper, event) {
	// cl(event)
	update_scores()
	// cl(event.layerX, event.layerY)
	const score_elem = document.createElement('i');
	score_elem.innerText = '+' + scores_per_click;
	score_elem.className = 'score-el'
	const shift_x = randomInteger(3, 12)
	score_elem.style.left = (event.layerX - shift_x) + 'px'
	score_elem.style.top = (event.layerY - 18) + 'px'
	frog_wrapper.append(score_elem)
	setTimeout(()=>{
		score_elem.remove()
	}, 1500)
}


function update_scores() {
	// cl(score_count)
	scores_elem.innerText = score_count = score_count + scores_per_click
}



function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


}) // DOMContentLoaded