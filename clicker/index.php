<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="icon" type="image/png" sizes="32x32" href="images/favicon.png">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
	<link rel="stylesheet" href="css/style.css">
	<script src="js/main.js"></script>
</head>
<body>

	<div class="screensaver">
		<h1>Frog clicker</h1>
		<button id="start_game_btn">Start game</button>
	</div>

	<div class="container">
		<div class="row">
			<div class="col-sm-4">
				<div class="scores-wrapper">
					<span id="scores"></span>
					scores
				</div>
				<div class="frog-wrapper" id="frog_wrapper" cursor="fly">
					<img src="images/frog-sm.png" alt="" class="frog" id="frog">
					<div id="click_layer"></div>
				</div>
			</div>
			<div class="col-sm-4 text-center">
				<div class="btn-group my-3" role="group" aria-label="Basic mixed styles example">
				  <button type="button" class="btn btn-danger" id="reset_btn">Reset game</button>
				  <!-- <button type="button" class="btn btn-warning">Middle</button> -->
				  <button type="button" class="btn btn-success" id="toggle_sound">Sound Off</button>
				</div>
				<div class="text-start">
					<label for="volume_inp" class="form-label">Volume</label>
					<input type="range" class="form-range" id="volume_inp">
				</div>
				<br>
				<textarea class="form-control" readonly name="sample" id="game_console" cols="30" rows="10"></textarea>
			</div>
			<div class="col-sm-4">
				<h3>meal (<span id="meal_title">fly:1</span>)</h3>
				<div id="meal_btns">

				</div>
				<hr>
				<h3>speed (<span id="speed_title">fly:1</span>)</h3>
				<div id="speed_btns">

				</div>
			</div>
		</div>
	</div>

</body>
</html>