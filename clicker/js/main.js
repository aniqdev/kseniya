"use strict"
const cl = console.log
const actions = {}

document.addEventListener("DOMContentLoaded", function(event) {

	const audioObj = new Audio('mp3/clickb1.mp3');
	const game_json = localStorage.getItem('game')
	let G
	if (game_json) {
		G = JSON.parse(game_json)
	}else{
		G = get_game_defaults()
	}
	
	const frog = document.getElementById('frog')
	const frog_wrapper = document.getElementById('frog_wrapper')
	const click_layer = document.getElementById('click_layer')
	const scores_elem = document.getElementById('scores')
	const meal_btns = document.getElementById('meal_btns')
	const meal_elem = document.getElementById('meal_title')
	const reset_btn = document.getElementById('reset_btn')
	const speed_btns = document.getElementById('speed_btns')
	const speed_title = document.getElementById('speed_title')
	const toggle_sound = document.getElementById('toggle_sound')
	const volume_inp = document.getElementById('volume_inp')
	const start_game_btn = document.getElementById('start_game_btn')

	G.meal_btns_arr.forEach((btn, i) => {
		const btn_el = document.createElement('button')
		btn_el.className = 'btn btn-secondary meal' + ((btn.used) ? ' used' : '')
		if(btn.disabled) btn_el.setAttribute('disabled', 'disabled')
		btn_el.innerText = 'buy ' + btn.meal_name + ' (' + btn.price + ')'
		btn_el.id = btn.meal_name + '_btn'
		btn_el.dataset.index = i
		meal_btns.append(btn_el)
	})
	G.speed_btns_arr.forEach((btn, i) => {
		const btn_el = document.createElement('button')
		btn_el.className = 'btn btn-secondary meal' + ((btn.used) ? ' used' : '')
		if(btn.disabled) btn_el.setAttribute('disabled', 'disabled')
		btn_el.innerText = btn.name + ' (' + btn.price + ')'
		btn_el.id = btn.name + '_btn'
		btn_el.dataset.index = i
		speed_btns.append(btn_el)
	})
	// check_meal()

	cl(G.volume)
	volume_inp.value = G.volume * 100
	audioObj.volume = G.volume

	if(frog) frog.ondragstart = function() { return false } // если картинка

	start_game_btn.addEventListener('click', function(event) { // клик по жабе
		document.querySelector('.screensaver').classList.add('hide')
		setTimeout(function(){
			document.querySelector('.screensaver').style.display = 'none'
		}, 1000)
		start_game()
	})

	click_layer.addEventListener('click', function(event) { // клик по жабе
		if(G.is_sound_on) audioObj.play()
		// show_score(frog_wrapper, event)
		check_meal()
		do_action('frog_click', {frog_wrapper, event})
	})

	meal_btns.addEventListener('click', function(event) { // клик по еде
		buy_meal_click(event)
		check_meal()
		save_game()
	})

	speed_btns.addEventListener('click', function(event) { // клик по еде
		buy_speed_click(event)
		check_meal()
		save_game()
	})

	reset_btn.addEventListener('click', function(event) { // клик по еде
		if(!confirm('Reset game?')) return false
		G = get_game_defaults()

		document.querySelectorAll('.meal').forEach(button => button.classList.remove('used'))
		check_meal()
		save_game()
	})

	toggle_sound.addEventListener('click', function(event) { // клик по еде
		G.is_sound_on = !G.is_sound_on
		if(G.is_sound_on) this.innerText = 'Sound Off'
		else this.innerText = 'Sound On' 
	})

	volume_inp.addEventListener('input', function(event) { // клик по еде
		let new_volume = G.volume = this.value / 100
		audioObj.volume = new_volume
		// new_volume = Math.round(new_volume * 100)
		game_console_log('volume: ' + this.value)
	})


add_action('frog_click', () => {
	G.score_count = G.score_count + G.scores_per_click // оюновление кошелька
	scores_elem.innerText = G.score_count // отображение баллов
})

add_action('frog_click', () => {
	game_console_log(G.score_count)
})

function start_game() {
	setInterval(() => {
		G.score_count = G.score_count + G.scores_per_second // оюновление кошелька
		scores_elem.innerText = G.score_count // отображение баллов
		check_meal()
	}, 1000)

	setInterval(() => {
		save_game()
	}, 10000)
}

function buy_speed_click(event) {
	if (event.target.tagName !== 'BUTTON') return false

	const button = event.target // кнопка
	const index = button.dataset.index
	const btn_obj = G.speed_btns_arr[index] // объект кнопки

	G.scores_per_second = G.scores_per_second + btn_obj.speed_up
	speed_title.innerText = G.scores_per_second

	const price = +btn_obj.price // уплоченая цена
	G.score_count = G.score_count - price // снимаем стоимость кнопки с кошелька
	scores_elem.innerText = G.score_count // обновляем счетчик баллов
}


function buy_meal_click(event){
	if (event.target.tagName !== 'BUTTON') return false

	const button = event.target // кнопка
	const index = button.dataset.index
	const btn_obj = G.meal_btns_arr[index] // объект кнопки

	G.scores_per_click = +btn_obj.click_cost // меняем стоимость клика
	meal_elem.innerText = btn_obj.meal_name + ':' + btn_obj.click_cost // (fly:1)

	const price = +btn_obj.price // уплоченая цена
	G.score_count = G.score_count - price // снимаем стоимость кнопки с кошелька
	scores_elem.innerText = G.score_count // обновляем счетчик баллов
	// button.classList.add('used')
	// btn_obj.used = true
	// button.setAttribute('disabled','disabled')
	// btn_obj.disabled = true

	frog_wrapper.setAttribute('cursor', btn_obj.meal_name)

	G.meal_btns_arr.forEach(function(meal_btn) {
		const btn_price = meal_btn.price
		// cl('btn_price',btn_price)
		const btn_el = document.getElementById(meal_btn.meal_name + '_btn')
		if (btn_price <= price) {
			// cl('btn_price IF',btn_price, price)
			btn_el.classList.add('used')
			meal_btn.used = true
			btn_el.setAttribute('disabled','disabled')
			meal_btn.disabled = true
			// G.meal_btns_arr = meal_btns.querySelectorAll('.meal:not(.used)')
		}
	})
}

function check_meal() {
	if(G.meal_btns_arr.length){
		G.meal_btns_arr.forEach(function(btn_obj) {
			const price = +btn_obj.price
			const btn_el = document.getElementById(btn_obj.meal_name + '_btn')
			if (G.score_count >= price && btn_obj.used === false && btn_obj.disabled === true) {
				// cl('if', btn_obj.meal_name + '_btn')
				btn_el.removeAttribute('disabled')
				btn_obj.disabled = false
				// G.btn_objs_arr = btn_objs.querySelectorAll('.meal:disabled:not(.used)')
			}
			// cl(btn_obj, G.score_count, price)
			if (G.score_count < price && btn_obj.disabled === false) {
				btn_el.setAttribute('disabled','disabled')
				btn_obj.disabled = true
			}

		})
	}
	if (G.speed_btns_arr.length) {
		G.speed_btns_arr.forEach(function(btn_obj) {
			const price = +btn_obj.price
			const btn_el = document.getElementById(btn_obj.name + '_btn')
			if (G.score_count >= price && btn_obj.disabled === true) {
				// cl('if', btn_obj.meal_name + '_btn')
				btn_el.removeAttribute('disabled')
				btn_obj.disabled = false
				// G.btn_objs_arr = btn_objs.querySelectorAll('.meal:disabled:not(.used)')
			}
			// cl(btn_obj, G.score_count, price)
			if (G.score_count < price && btn_obj.disabled === false) {
				btn_el.setAttribute('disabled','disabled')
				btn_obj.disabled = true
			}

		})
	}
}

add_action('frog_click', function({frog_wrapper, event}) { // show scores
	// cl(event)
	// cl(event.layerX, event.layerY)
	const score_elem = document.createElement('i');
	score_elem.innerText = '+' + G.scores_per_click;
	score_elem.className = 'score-el'
	const shift_x = randomInteger(3, 12)
	score_elem.style.left = (event.layerX - shift_x) + 'px'
	score_elem.style.top = (event.layerY - 18) + 'px'
	frog_wrapper.append(score_elem)
	setTimeout(()=>{
		score_elem.remove()
	}, 1500)
})




function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}






function add_action(action, callback) {
	if(!actions[action]) actions[action] = []
	actions[action].push(callback)
}

function do_action(action, data = {}) {
	if(actions[action]){
		actions[action].forEach(callback => {
			callback(data)
		})
	}
}



function save_game() {
	const game = JSON.stringify(G)
	localStorage.setItem('game', game);
	game_console_log('game saved')
}


function get_game_defaults() {
	const G = {}
	G.is_sound_on = true
	G.volume = 1
	G.score_count = 0
	G.scores_per_click = 1
	G.scores_per_second = 1
	G.meal_btns_arr = [
		{
			price: 5,
			click_cost: 2,
			meal_name: 'worm',
			disabled: false,
			used: false,
		},
		{
			price: 10,
			click_cost: 3,
			meal_name: 'caterpillar',
			disabled: false,
			used: false,
		},
		{
			price: 15,
			click_cost: 4,
			meal_name: 'butterfly',
			disabled: false,
			used: false,
		},
		{
			price: 20,
			click_cost: 5,
			meal_name: 'bird',
			disabled: false,
			used: false,
		},
		{
			price: 25,
			click_cost: 6,
			meal_name: 'mouse',
			disabled: false,
			used: false,
		},
		{
			price: 30,
			click_cost: 7,
			meal_name: 'rat',
			disabled: false,
			used: false,
		},
	]
	G.speed_btns_arr = [
		{
			price: 5,
			speed_up: 2,
			name: 'speed +2',
			disabled: false,
			used: false,
		},
		{
			price: 10,
			speed_up: 3,
			name: 'speed +3',
			disabled: false,
			used: false,
		},
		{
			price: 15,
			speed_up: 4,
			name: 'speed +4',
			disabled: false,
			used: false,
		},
	]
	return G
}


function game_console_log(text) {
	const game_console = document.getElementById('game_console')
	let value = game_console.value
	value = text + '\n' + value.substring(0, 500)
	game_console.value = value
}


}) // DOMContentLoaded

