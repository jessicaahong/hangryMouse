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
	//only move mouse if mouse and new muni stop are part of the same line
	if (($('#mouse').hasClass('redLine') && $(targetElement).hasClass('redLine')) ||
		($('#mouse').hasClass('orangeLine') && $(targetElement).hasClass('orangeLine')) ||
		($('#mouse').hasClass('yellowLine') && $(targetElement).hasClass('yellowLine')) ||
		($('#mouse').hasClass('greenLine') && $(targetElement).hasClass('greenLine')) ||
		($('#mouse').hasClass('blueLine') && $(targetElement).hasClass('blueLine')) ||
		($('#mouse').hasClass('purpleLine') && $(targetElement).hasClass('purpleLine'))) {
			//set mouse position so that it now appears at the clicked muni station
			$('#mouse').css({'top' : newMouseLatitude, 'right' : newMouseLongitude});
			//create variable that holds all classes from new muni stop, which we will later assign to mouse
			var classList = targetElement.classList.toString();
			//remove all previously set classes from mouse with .removeClass()
			$('#mouse').removeClass();
			//add line classes of new location to mouse with .addClass()
			$('#mouse').addClass(classList);
	//else if they do not belong to the same line, alert that they must go to transfer station
	} else {
		alert('you must visit a transfer stations before switching muni lines!');
	}

}
