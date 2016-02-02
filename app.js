function init(){
	//things that you want to happen once page loads
	console.log('working');
	$('button').on('click', newGame);
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
	var latNum = (parseInt($(targetElement).css('top'))-15);
	var newMouseLatitude = latNum.toString() + "px";
	var longNum = (parseInt($(targetElement).css('right'))-12);
	var newMouseLongitude = longNum.toString() + "px";
	$('#mouse').css({'top' : newMouseLatitude, 'right' : newMouseLongitude});
}
