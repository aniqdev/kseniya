<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
	<link rel="stylesheet" href="css/style.css">
	<script src="js/main.js"></script>
</head>
<body>
	<div class="cookie-wrapper">
		<img src="images/perfectCookie.png" alt="" class="cookie">
	</div>
	<div class="container" style="max-width: 500px;">
		<h2 class="text-center mt-3">ToDo List</h2>
		<form class="mt-3" id="todo_form">
			<div class="input-group mb-3">
			  <input id="todo_inp" type="text" class="form-control" placeholder="Type here...">
			  <button class="btn btn-outline-primary" type="submit" id="add_todo_btn">Add</button>
			</div>
		</form>
		<ul class="list-group" id="todo_list"></ul>
	</div>	
</body>
</html>