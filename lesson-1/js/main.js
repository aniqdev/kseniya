"use strict"
const cl = console.log

document.addEventListener("DOMContentLoaded", function(event) {

const todo_list = document.getElementById('todo_list')

let todo_items = localStorage.getItem('todo_items')
if (todo_items) {
	todo_items = JSON.parse(todo_items)
	// cl(todo_items)
	todo_items.reverse()
	todo_items.forEach(function(item) {
		// cl(item)
		add_todo_item(todo_list, item)
	})
}


// fetch('https://jsonplaceholder.typicode.com/todos')
//   .then(response => response.json())
//   .then(json => {
// 	json.forEach(function(item) {
// 		add_todo_item(todo_list, item.title)
// 	})
//   })

const todo_form = document.getElementById('todo_form')

todo_form.addEventListener('submit', function(e) {
	e.preventDefault()
	const todo_inp = document.getElementById('todo_inp')
	if(!todo_inp.value.trim()) return false
	// console.log(todo_inp.value)
	add_todo_item(todo_list, todo_inp.value)
	todo_inp.value = ''

	save_todo()
})


todo_list.addEventListener('click', function(event) {
	if (event.target.tagName !== 'I') return false
	// cl(event.target.parentNode)
	const list_item = event.target.parentNode
	if (confirm('Удалить елемент?')) {
		list_item.remove()
	}
	
	save_todo()
})



}); // DOMContentLoaded




function add_todo_item(todo_list, item) {
	const li = document.createElement("li");
	li.className = 'list-group-item'
	li.innerHTML = item + '<i class="bi bi-trash del-item"></i>'
	todo_list.prepend(li)
}


function save_todo() {
	let items_arr = []
	const items = todo_list.querySelectorAll('.list-group-item')
	items.forEach(function(el) {
		items_arr.push(el.innerText)
		// cl(el.innerText)
	})
	// cl(items_arr)
	items_arr = JSON.stringify(items_arr)
	// cl(items_arr)
	localStorage.setItem('todo_items', items_arr);
}