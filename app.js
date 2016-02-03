function init(){
	//things that you want to happen once page loads
	console.log('working');
	//take next line out eventually, and un comment line after that
		loadClickEventListeners();
	// $('button').on('click', newGame);
	//eventually run functions that add animations to mouse (nose twitch)
}

function newGame() {
	loadClickEventListeners();
	//run function that
		//has mouse fall on to new location
		//has prize appear at new location
}


function loadClickEventListeners() {
	$('.munistop').on('click', function() {
		mouseJump(event.target);
	});
}


function mouseJump(targetElement) {
	//get top coordinate of clicked muni station div
	//shift position 15 pixels to the right so you center the mouse around the node
	var latNum = (parseInt($(targetElement).css('top'))-15);
	var newMouseLatitude = latNum.toString() + "px";
	//get right coordinate of clicked muni station div
	//shift position 8 pixels up so you center the mouse around the node
	var longNum = (parseInt($(targetElement).css('right'))-8);
	var newMouseLongitude = longNum.toString() + "px";
	//set mouse position so that it now appears at the clicked muni station
	$('#mouse').css({'top' : newMouseLatitude, 'right' : newMouseLongitude});
}
