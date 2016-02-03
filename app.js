function init(){
	//things that you want to happen once page loads
	//make newgame button clickable so you can start a new game
	$('button').on('click', newGame);
}

function newGame() {
	//make nodes clickable
	loadClickEventListeners();
	//select new gameboard randomly, and generates new gameboard
	selectRandomAdventure();
	setupAdventureOnMap();
}

function selectRandomAdventure() {

}

function setupAdventureOnMap() {
	//edit css to set mouse's new location (top and right css)
	//display mouse at new location
	$('#mouse').css({'display' : 'block', 'position' : 'absolute'});
	//has prize appear at new location
		//tailors adventureDetails text to new adventure
		$('#adventureDetails').html('direct mouse to japantown for some sushi!');
		//makes adventuresDetails text visible
			$('#adventureDetails').css({'display': 'inline-block'});
}


//functions that make mouse mobile
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
			//get rid of wrong move text decorations and exclamation point
			$('#invalidMove').css({'color' : 'black', 'font-size' : '16px'});
			$('#exclamationPointDiv').css({'display' : 'none'});
	//else if they do not belong to the same line, alert that they must go to transfer station
	} else {
		//turn text in instructions red
		$('#invalidMove').css({'color' : '#EA242F', 'font-size' : '16px'});
		//have an exclamation point pop up over the mouse to alert an invalid move
		var currentMouseLatitude = (parseInt($('#mouse').css('top'))-42);
		var exclamationPointLatitude = currentMouseLatitude.toString() + 'px';
		console.log(exclamationPointLatitude);
		var currentMouseLongitude = (parseInt($('#mouse').css('right')) + 2);
		var exclamationPointLongitude = currentMouseLongitude.toString() + 'px';
		console.log(exclamationPointLongitude);
		$('#exclamationPointDiv').css({'display' : 'block', 'top': exclamationPointLatitude, 'right' : exclamationPointLongitude});
	}

}
