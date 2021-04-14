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

	<div class="container">
		<div class="row">
			<div class="col-sm-4">
				<div class="scores-wrapper">
					<span id="scores">0</span>
					scores
				</div>
				<div class="frog-wrapper" id="frog_wrapper">
					<img src="images/frog-sm.png" alt="" class="frog" id="frog">
					<div id="click_layer"></div>
				</div>
			</div>
			<div class="col-sm-4"></div>
			<div class="col-sm-4">
				<h3>meal (<span id="meal_name">fly:1</span>)</h3>
				<div id="meal_btns">
					<button disabled data-price="5" name="2" value="worm" class="btn btn-secondary meal">buy worm</button>
					<button disabled data-price="10" name="3" value="caterpillar" class="btn btn-secondary meal">buy caterpillar</button>
					<button disabled data-price="15" name="4" value="butterfly" class="btn btn-secondary meal">buy butterfly</button>
				</div>
			</div>
		</div>
	</div>

</body>
</html>